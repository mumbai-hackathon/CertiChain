var encryptor = require('file-encryptor');
var fs = require('fs');


function enc(inputfile,outputfile,key,options){

	encryptor.encryptFile(inputfile, outputfile, key, options, function(err) {
	  
	  if (err) throw err;
	  var filePath = inputfile; 
	  fs.unlinkSync(filePath);
	  console.log('Successfully Encrypted');
	});

	 

}


module.exports= {enc};
