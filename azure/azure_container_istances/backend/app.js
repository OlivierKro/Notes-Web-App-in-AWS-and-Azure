const util = require('./utility_functions.js');

const express = require('express');
const cors = require('cors');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const { TableServiceClient, TableClient, AzureNamedKeyCredential, odata } = require("@azure/data-tables");

require('dotenv').config()
const app = express();
app.use(express.json());
app.use(cors());

const tableName = process.env.NOTES_TABLE;
const account = process.env.AZURE_ACCOUNT;
const accessKey = process.env.AZURE_ACCESS_KEY;
const endpoint = process.env.AZURE_TABLES_ENDPOINT;

app.get('/notes', async (req, res) => {
	try {
		const credential = new AzureNamedKeyCredential(account, accessKey);
		const tableService = new TableServiceClient(endpoint, credential);
		await tableService.createTable(tableName);
		const tableClient = new TableClient(endpoint, tableName, credential);

		let user_name = util.getUserName(req.headers);
		const entities = tableClient.listEntities({
			queryOptions: { filter: odata`PartitionKey eq ${user_name}` }
		});

		const result = [];
		for await (const entity of entities) {
			result.push(entity);
		}
		const data = {"Items": result}

		response = {
			statusCode: 200,
			headers: util.getResponseHeaders(),
			body: data
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
		const credential = new AzureNamedKeyCredential(account, accessKey);
		const tableService = new TableServiceClient(endpoint, credential);
		await tableService.createTable(tableName);
		const tableClient = new TableClient(endpoint, tableName, credential);

		let item = req.body.Item;
		item.user_name = util.getUserName(req.headers);
		item.note_id = item.user_name + ':' + uuidv4();
		item.time = moment().unix();
		item.expires = moment().add(100, 'days').unix();

		const params = {
			partitionKey: item.user_name,
			rowKey: item.note_id,
			time: item.time,
			expires: item.expires,
			title: item.title,
			category: item.category,
			description: item.description
		};
		let result = await tableClient.createEntity(params);
		
		const response = {
			statusCode: 200,
			headers: util.getResponseHeaders(),
			body: JSON.stringify(item)
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

app.delete('/note/n/:note_id', async (req, res) => {
	try {
		const credential = new AzureNamedKeyCredential(account, accessKey);
		const tableService = new TableServiceClient(endpoint, credential);
		await tableService.createTable(tableName);
		const tableClient = new TableClient(endpoint, tableName, credential);


		let user_name = util.getUserName(req.headers);
		let note_id = req.params.note_id;

		let data = await tableClient.deleteEntity(user_name, note_id);
		const response = {
			statusCode: (!data.Items || data.Items.length === 0) ? 404 : 200,
			headers: util.getResponseHeaders()
		};
		if (response.statusCode === 200) {
			response.body = JSON.stringify(data.Items[0]);
		}
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