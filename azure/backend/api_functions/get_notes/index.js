const util = require('../utility_functions.js');
const { TableServiceClient, TableClient, AzureNamedKeyCredential, odata } = require("@azure/data-tables");

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

		let user_name = util.getUserName(req.headers);
		const entities = tableClient.listEntities({
			queryOptions: { filter: odata`PartitionKey eq ${user_name}` }
		});

		const result = [];
		for await (const entity of entities) {
			result.push(entity);
		}
		const data = {"Items": result}

		context.res = {
			statusCode: 200,
			headers: util.getResponseHeaders(),
			body: data
		};
		return context.res;

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