/**
 * Route: DELETE /note/t/{time}
 */

const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-central-1' });

const util = require('./util.js');

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

        return {
            statusCode: 200,
            headers: util.getResponseHeaders()
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