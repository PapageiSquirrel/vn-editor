const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');

const multer  = require('multer');
const ASSET_URL = '../src/assets/';
let storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, ASSET_URL + '/' + req.params.fileType);
	},
	filename: (req, file, cb) => {
		const ext = file.mimetype.split('/')[1];
		cb(null, req.params.fileName + '.' + ext);
	}
});
let upload = multer({ 
	storage: storage,
	limits: { fileSize: 2 * 1024 * 1024 }
});

let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/data'));

app.get('api/file/:collection/:name', (req, res) => {
	let collection = req.params.collection;
	let assetName = req.params.name;
	let fileStream = fs.readFileSync('./assets/' + collection + '/' + name);
});

app.get('/api/:collection', (req, res) => {
	let collection = req.params.collection;
	let id = req.query.id;
	try {
		let result = JSON.parse(fs.readFileSync('./data/' + collection + '.json'));
		if (id) {
			result = result.find(i => i.id === parseInt(id, 10));
		}
		res.json(result);
	} catch(e) {
		res.json({status: 500, error: "Server Error", message: "The server didn't responded correctly, please try again later."});
	}
	
});

app.post('/api/file/:fileType/:fileName', upload.single('asset'), (req, res) => {
	if (!req.file) {
		return res.send({
			success: false
		});
	}
	const ext = req.file.mimetype.split('/')[1];
	return res.send({
		success: true,
		fileName: req.params.fileName + '.' + ext
	});
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
		console.error("Error on: ", collection, operation, data);
		res.json({status: 500, error: "Server Error", message: "The server didn't responded correctly, please try again later."});
	}
});

app.listen(45050);

function applyOperationToJSON(json, operation, data) {
	let jsTable = JSON.parse(json);
	let itemIndex;
	let finalOp = operation;

	if (data && data.id) {
		itemIndex = jsTable.findIndex(i => i.id === data.id);
		finalOp = operation === "save" && (itemIndex === -1 ? "add" : "update") || operation;
	}
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
			case "save":
				jsTable = data;
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