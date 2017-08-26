var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');
var db = mongoose.connect('mongodb://process.env.DB_USERNAME:process.env.DB_PASSWORD@ds149763.mlab.com:49763/bookapi');
// var db = mongoose.connect('mongodb://localhost/bookAPI');
var Book = require('./models/bookModel');

var app = express();
var port  = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

bookRouter = require('./Routes/bookRoutes.js')(Book);

app.use('/api/books', bookRouter);
// app.use('/api/author', authorRouter);

app.get('/', function (req, res) {
  res.send('welcome to my API!');
});

app.listen(port, function (){
	console.log('Gulp is running on Port: ' + port);
})