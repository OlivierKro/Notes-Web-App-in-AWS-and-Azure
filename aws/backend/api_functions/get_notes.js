/**
 * Route: GET /notes
 */

const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-central-1' });

const util = require('./util.js');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

exports.handler = async (event) => {
    try {
        let query = event.queryStringParameters;
        let limit = query && query.limit ? parseInt(query.limit) : 5;
        let user_name = util.getUserName(event.headers);

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

        return {
            statusCode: 200,
            headers: util.getResponseHeaders(),
            body: JSON.stringify(data)
        };
    } catch (err) {
        console.log("Error", err);
        return {
            statusCode: err.statusCode ? err.statusCode : 500,
            headers: util.getResponseHeaders(),
            body: JSON.stringify({
                error: err.name ? err.name : "Exception",
                message: err.message ? err.message : "Unknown error"
            })
        };
    }
}