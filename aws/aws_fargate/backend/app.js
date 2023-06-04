const util = require('./utility_functions.js');

const express = require('express');
const cors = require('cors');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config()

const AWS = require('aws-sdk');
AWS.config.update({       
	accessKeyId: process.env.ACCESS_KEY_ID,
	secretAccessKey: process.env.SECRET_ACCESS_KEY,
	region: 'eu-central-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = "NotesWebApp-Table";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/notes', async (req, res) => {
	try {
		let query = req.query;
		let limit = query && query.limit ? parseInt(query.limit) : 10;
		let user_name = util.getUserName(req.headers);
		let params = {
			TableName: tableName,
			KeyConditionExpression: "user_name = :uid",
			ExpressionAttributeValues: {
				":uid": user_name
			},
			Limit: limit,
			ScanIndexForward: false
		};
		
		let startTime = query && query.start ? parseInt(query.start) : 0;
		if(startTime > 0) {
			params.ExclusiveStartKey = {
				user_name: user_name,
				time: startTime
			}
		}
		
		let data = await dynamodb.query(params).promise();
		
		const response = {
			statusCode: 200,
			headers: util.getResponseHeaders(),
			body: JSON.stringify(data, null, 4)
		};
		res.send(response.body);

	} catch (err) {
		console.log("Error", err);
		const statusCode = err.statusCode || 500;
		const headers = util.getResponseHeaders();
		const body = JSON.stringify({
			error: err.name || "Exception",
			message: err.message || "Unknown error"
		});
        
		return {
			statusCode,
			headers,
			body
		};
	}
});

app.post('/note', async (req, res) => {
	try {
		let item = req.body.Item;
		item.user_name = util.getUserName(req.headers);
		item.note_id = item.user_name + ':' + uuidv4();
		item.time = moment().unix();
		item.expires = moment().add(100, 'days').unix();

		const params = {
			TableName: tableName,
			Item: item
		};
		const data = await dynamodb.put(params).promise();

		const response = {
			statusCode: 200,
			headers: util.getResponseHeaders(),
			body: JSON.stringify(item, null, 4)
		};
		res.send(response.body);
        
	} catch (err) {
		console.log("Error", err);
		const statusCode = err.statusCode || 500;
		const headers = util.getResponseHeaders();
		const body = JSON.stringify({
			error: err.name || "Exception",
			message: err.message || "Unknown error"
		});

		return {
			statusCode,
			headers,
			body
		};
	}
});

app.delete('/note/t/:time', async (req, res) => {
	try {
		let time = parseInt(req.params.time);
		let params = {
			TableName: tableName,
			Key: {
				user_name: util.getUserName(req.headers),
				time: time
			}
		};

		await dynamodb.delete(params).promise();

		const response = {
			statusCode: 200,
			headers: util.getResponseHeaders(),
		};
		res.send(response.body);

	} catch (err) {
		console.log("Error", err);
		const statusCode = err.statusCode || 500;
		const headers = util.getResponseHeaders();
		const body = JSON.stringify({
			error: err.name || "Exception",
			message: err.message || "Unknown error"
		});
        
		return {
			statusCode,
			headers,
			body
		};
	}
});

app.listen(80, () => {
    console.log('Server started on port 80');
  });