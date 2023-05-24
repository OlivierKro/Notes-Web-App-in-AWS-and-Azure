const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const util = require('../utility_functions.js');
const { TableServiceClient, TableClient, AzureNamedKeyCredential} = require("@azure/data-tables");

const tableName = process.env.NOTES_TABLE;
const account = process.env.AZURE_ACCOUNT;
const accessKey = process.env.AZURE_ACCESS_KEY;
const endpoint = process.env.AZURE_TABLES_ENDPOINT;

module.exports = async function (context, req) {
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