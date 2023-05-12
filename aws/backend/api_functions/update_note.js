const moment = require('moment');
const util = require('./utility_functions.js');

const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-central-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

exports.handler = async (event) => {
    try {
        let item = JSON.parse(event.body).Item;
        item.user_name = util.getUserName(event.headers);
        item.expires = moment().add(100, 'days').unix();

        let data = await dynamodb.put({
            TableName: tableName,
            Item: item,
            ConditionExpression: '#t = :t',
            ExpressionAttributeNames: {
                '#t': 'time'
            },
            ExpressionAttributeValues: {
                ':t': item.time
            }
        }).promise();

        const response = {
            statusCode: 200,
            headers: util.getResponseHeaders(),
            body: JSON.stringify(item)
        };
        return response;

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
}