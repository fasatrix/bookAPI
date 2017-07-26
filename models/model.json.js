var Model = function (){
var model =	{
		"title":"model",
		"type":"object",
		"properties":{    
			"title"         : 	{"type": "string"},
	    	"author"        : 	{"type": "string"},
	   		"genre"         :   {"type": "string"},
	   		"read"          :   {"type": "boolean"},
	   		"relatedBooks"  :   {
	   			"type": "array",
	   			"items":{
	   				"type":"string"
	   			}
   		}
	   	},
	   	"required": ["title","author","genre"],
		"additionalProperties": false
	}
	return model;
}
module.exports = Model;