const util = require('../../utility_functions.js');
const azure = require('azure-storage');
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
		let note_id = req.params.note_id;

		let data = await tableClient.deleteEntity(user_name, note_id);
		if(!_.isEmpty(data.Items)) {
			return {
				statusCode: 200,
				headers: util.getResponseHeaders(),
				body: JSON.stringify(data.Items[0])
			};
		} else {
			return {
				statusCode: 404,
				headers: util.getResponseHeaders()
			};
		}
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