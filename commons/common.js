function Commons(){
	return {
		mapBook: function(id, title,genre,author,read,relatedBooks){
	   		return {
	      		"id"	: id,
				"title" : title,
		        "genre" : genre,
		        "author": author,
		        "read"  : read,
		        "relatedBooks": relatedBooks
	   		}
	}
}
}
module.exports = Commons;