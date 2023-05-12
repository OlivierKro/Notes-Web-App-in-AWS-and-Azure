const _ = require('underscore');
const util = require('./utility_functions.js');

const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-central-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

exports.handler = async (event) => {
    try {
        let note_id = decodeURIComponent(event.pathParameters.note_id);

        let params = {
            TableName: tableName,
            IndexName: "Index-note_id",
            KeyConditionExpression: "note_id = :note_id",
            ExpressionAttributeValues: {
                ":note_id": note_id
            },
            Limit: 1
        };

        let data = await dynamodb.query(params).promise();

        const response = {
            statusCode: 404,
            headers: util.getResponseHeaders()
          };
          
          if (!_.isEmpty(data.Items)) {
            response.statusCode = 200;
            response.body = JSON.stringify(data.Items[0]);
          }
          
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