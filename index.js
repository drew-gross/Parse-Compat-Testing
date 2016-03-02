var express = require('express');
var ParseServer = require('parse-server').ParseServer;

var app = express();

var api = ParseServer({
	databaseURI: 'mongodb://localhost:27017/openParseApp',
	appId: 'appId',
	masterKey: 'masterKey',
	serverURL: 'http://localhost:5051',
});

app.use('/parse', api);

app.listen(5051, () => {});
