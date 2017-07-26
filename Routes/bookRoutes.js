var express = require('express');
var model = require('../models/model.json')();
const validate = require('express-json-schema-validation').ValidationMiddleware();
// const validator = require('express-json-schema-validation').Validator;

var routes = function (Book){

		var bookRouter = express.Router();
		var bookController = require ('../controllers/bookController')(Book)
		bookRouter.route('/')
		
			.get(bookController.get)
			.post(validate(model), bookController.post,	
				function handleErrors (errors, req, res, next) {
				  res.status(400).json(errors)
				});

		bookRouter.use('/:bookid', function(req, res, next){
			Book.findById(req.params.bookid, function(err, book){
		      		if(err)				      			
		      			res.status(500).send(err)
		      		else if(book){
		      			req.book = book;
		      			next();
		      		}
		      		else{
		      			res.status(404).send("Not Foud")
		      		}
			});
		});		
		bookRouter.route('/:bookid')
			.get(function(req, res){
				book = {
	      					"id"	: req.book._id,
		      				"title" : req.book.title,
					        "genre" : req.book.genre,
					        "author": req.book.author,
					        "read"  : req.book.read,
					        "relatedBook": req.book.relatedBooks
		      			}
				res.json(book);
			})
			.put(function(req, res){
      			req.book.title = req.body.title;
	      		req.book.author = req.body.author;
	      		req.book.genre = req.body.genre;
	      		req.book.read = req.body.read;
	      		req.book.save(function(err){
	      			if(err)
	      				res.status(500).send(err)
	      			else
		      			res.json(req.book);
	      		});
			})
			.patch(function(req, res){
      			if(req.book._id)
      				delete req.book._id;
      			for(var p in req.body)
      			{
      				req.book[p] = req.body[p]
      			}
	      		req.book.save(function(err){
	      			if(err)
	      				res.status(500).send(err)
	      			else
		      			res.json(req.book);
	      		});
			})
			.delete(function(req, res){
				req.book.remove(function(err){
					if (err)
						res.status(500).send(err)
					else
						res.status(204).send("Removed")

				});	

			})			
		return bookRouter;
};

module.exports = routes;