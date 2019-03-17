var decryptor = require('file-encryptor');


function dec(outputfile,inputfile,key,options){

	decryptor.decryptFile(outputfile, inputfile, key, options, function(err) {
	 	if (err) throw err;
	 	console.log('Successfully decrypted');
	 });
}

module.exports= { dec };