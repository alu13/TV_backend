import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { findOpportunity } from "./scripts/mongo.js"
import { findOpportunityByID } from "./scripts/mongo.js"

var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')

var app = express();
app.use(cors())
app.use(bodyParser.json())

app.post('/search', async function (req, res) {
   var results = await findOpportunity(req.body.query)
   console.log(results)
   res.json(results)
})

app.post('/searchByID', async function (req, res) {
   var results = await findOpportunityByID(req.body.query)
   console.log(results)
   res.json(results)
})

var server = app.listen(3001, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})