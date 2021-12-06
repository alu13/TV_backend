import { strictEqual } from 'assert';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { findOpportunity } from "./scripts/mongo.js"
import { findOpportunityByID } from "./scripts/mongo.js"
import { insertToDB } from "./scripts/mongo.js"

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/insert', async function (req, res) {
   var err = await insertToDB(req.body.opportunity)
   if (err) {
      res.sendStatus(500)
   }
   res.sendStatus(200)
})
app.post('/search', async function (req, res) {
   var results = await findOpportunity(req.body.query);
   console.log(results);
   res.json(results);
})

app.post('/searchByID', async function (req, res) {
   var results = await findOpportunityByID(req.body.query);
   console.log(results);;
   res.json(results);
})
console.log("got here");
var server = app.listen(process.env.PORT || 8080, function () {
   console.log("port is " + server.address().port);
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})