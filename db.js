var express = require('express');
var app = express();
app.get('/', function (req, res) {  
   
const client = new DBSQLClient();

client.connect(
  options = {
    token: token,
    host:  serverHostname,
    path:  httpPath,
  }).then(
    async client => {
      const session = await client.openSession();

      const queryOperation = await session.executeStatement(
        statement = 'select * from hive_metastore.dm_ops_gold.standard_reports_l0904',
        options   = {
          runAsync: true,
          maxRows: 10000 // This option enables the direct results feature.
        }
      );

      const result = await queryOperation.fetchAll({
        progress: false,
        callback: () => {},
      });

      await queryOperation.close();
      res.send(result);
      // console.table(result);

      await session.close();
      await client.close();
}).catch((error) => {
  console.log('Errors:', error);
});
})  
var server = app.listen(8000, function () {  
var host = server.address().address  
  var port = server.address().port  
 console.log("app listening at http://%s:%s--http://127.0.0.1:8000/", host, port)  
})

const { DBSQLClient } = require('@databricks/sql');

var token          = 'dapi96db81436667883d9fcc812e43a0fcba-3';
var serverHostname = 'adb-4016131594712896.16.azuredatabricks.net';
var httpPath       = '/sql/1.0/endpoints/d6e48eb7f0cc0d79';

if (!token || !serverHostname || !httpPath) {
  throw new Error("Cannot find Server Hostname, HTTP Path, or personal access token. " +
                  "Check the environment variables DATABRICKS_TOKEN, " +
                  "DATABRICKS_SERVER_HOSTNAME, and DATABRICKS_HTTP_PATH.");
}