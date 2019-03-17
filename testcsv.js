const http = require('http');
const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require("mysql");
const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const session = require('express-session');
const md5 = require('md5');
const multer = require('multer');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const assert = require('assert');
const csv=require('csvtojson');
const PDFDocument = require('pdfkit');
const fs = require('fs');

//functions
const mail = require('./functions/mail.js');
const con = require('./configuration/databaseConnection.js');
const pdfObj = require('./functions/pdf.js');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

//setting the template engine
app.set('view engine','ejs');

app.get('/',(req,res)=>{

	var filename = "student.csv"
	var event = "Treasure Hunt"
	var club = "Domain"
	const csvFilePath='./uploads/csv/'+club+'/'+event+'/'+filename;

	csv()
	.fromFile(csvFilePath)
	.then((jsonObj)=>{
	    console.log(jsonObj);
	    var event = "Treasure Hunt";
	    var club = "Domain";
	    for (var i = 0; i < jsonObj.length; i++) {
	    
	    	pdfObj.pdf(event,jsonObj[i].fname,jsonObj[i].lname,club);

	    }
	})



	res.render("home");
});


var event =  "Treasure Hunt" //from web UI
var club = "Domain"

const storage = multer.diskStorage({
	destination : function(req,file,cb){
		cb(null, './uploads/csv/'+club+'/'+event)
	},
	filename : function(req,file,cb){
		let temp = file.originalname;
		cb(null , temp)
	}
});


var upload = multer({ storage: storage })

app.post('/upload',upload.single('Image'),(req,res)=>{
	//event = "Swat the bug"
	club= "STC"
  
	console.log(req.file);
});


app.listen(8080);