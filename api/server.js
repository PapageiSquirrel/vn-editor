const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');

let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/data'));
app.get('/api/:collection', (req, res) => {
	let collection = req.params.collection;
	let params = req.body;
	try {
		let result = JSON.parse(fs.readFileSync('./data/' + collection + '.json'));
		if (params && params.id) {
			result = result.find(i => i.id === params.id);
		}
		res.json(result);
	} catch(e) {
		res.json({status: 500, error: "Server Error", message: "The server didn't responded correctly, please try again later."});
	}
	
});
app.post('/api/:operation/:collection', (req, res) => {
	let collection = req.params.collection;
	let operation = req.params.operation;
	let data = req.body;
	try {
		let json = fs.readFileSync('./data/' + collection + '.json');
		let newJson = applyOperationToJSON(json, operation, data);
		fs.writeFileSync('./data/' + collection + '.json', newJson, 'utf8');
		res.json(JSON.parse(newJson));
	} catch(e) {
		res.json(e);
	}
});

app.listen(45050);

function applyOperationToJSON(json, operation, data) {
	let jsTable = JSON.parse(json);
	let itemIndex = jsTable.findIndex(i => i.id === data.id);
	let finalOp = operation === "save" && (itemIndex === -1 ? "add" : "update") || operation;
	try {
		switch(finalOp) {
			case "add":
				jsTable.push(data);
				break;
			case "update":
				Object.assign(jsTable[itemIndex], data);
				break;
			case "delete":
				jsTable.splice(itemIndex, 1);
				break;
			default:
				console.error("[Data] " + operation + " on " + data.name + " failed.");
				break;
		}
	} catch(e) {
		console.error(e);
	}
	return JSON.stringify(jsTable);
}