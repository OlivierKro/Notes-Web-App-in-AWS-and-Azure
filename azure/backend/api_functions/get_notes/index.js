const util = require('../utility_functions.js');
const azure = require('azure-storage');
const { TableServiceClient, TableClient, AzureNamedKeyCredential, odata } = require("@azure/data-tables");

const tableName = process.env.NOTES_TABLE;
const account = process.env.AZURE_ACCOUNT;
const accessKey = process.env.AZURE_ACCESS_KEY;
const endpoint = process.env.AZURE_TABLES_ENDPOINT;


module.exports = async function (context, req) {
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

      const jsonResult = {"Items": result}

        context.res = {
        // status: 200, /* Defaults to 200 */
            body: jsonResult
        };
}