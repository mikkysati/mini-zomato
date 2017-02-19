// server.js (Express 4.0)
var express        = require('express');
var morgan         = require('morgan');
var app            = express();

app.use(express.static(__dirname)); 	// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 					// log every request to the console

var router = express.Router();

app.use('/', router);



app.listen(8000);
console.log('Open http://localhost:8000 to access the files now'); 			// shoutout to the user
