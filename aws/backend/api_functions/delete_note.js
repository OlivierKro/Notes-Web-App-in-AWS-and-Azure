const util = require('./utility_functions.js');

const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-central-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

exports.handler = async (event) => {
    try {
        let time = parseInt(event.pathParameters.time);
        let params = {
            TableName: tableName,
            Key: {
                user_name: util.getUserName(event.headers),
                time: time
            }
        };

        await dynamodb.delete(params).promise();

        const response = {
            statusCode: 200,
            headers: util.getResponseHeaders(),
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