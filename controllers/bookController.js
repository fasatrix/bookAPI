var bookController = function (Book){

var Common = require('../commons/common');
var commonInst = new Common();

	var post = function(req,res){

		var book = new Book(req.body);
		book.save();
		book = commonInst.mapBook(book._id,book.title,book.genre,book.author, book.read,book.relatedBooks)
		res.status(201).send(book);
	}

	var get = function(req, res){
			  
			  var query = {};	
			  
			  if(req.query.genre){
			  	query.genre = req.query.genre;
			  } 
		      Book.find(query, function(err, books){
		      		if(books.length == 0)
		  				res.status(404).send('Not Fonud')
		      		else
		      		if(err)
		      			res.status(500).send(err)
		      		else
		      			var nbooks = books.map(function(book){
	      							return commonInst.mapBook(book._id,book.title,book.genre,book.author, book.read,book.relatedBooks);

		      			})
		      			res.json(nbooks);
		      });
			}

  return {
  	post: post,
  	get : get
  }

}

module.exports = bookController;
