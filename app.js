const http = require('http');
const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require("mysql");
//const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const session = require('express-session');
//const bcrypt = require('bcrypt-nodejs');
//const port=process.env.PORT || 8080;
//const passport = require('passport');
//const localStrategy = require('passport-local').Strategy;
//const macfromip = require('macfromip');
const md5 = require('md5');
const multer = require('multer');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const assert = require('assert');
const csv=require('csvtojson');
const PDFDocument = require('pdfkit');
const fs = require('fs');
//var router = express.Router()




let uploadData = multer();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));


//functions
const mail = require('./functions/mail.js');
const con = require('./configuration/databaseConnection.js');
const web3 = require('./configuration/blockchain.js');
const encrypt= require('./functions/encryptFolder.js');
const decrypt= require('./functions/decryptFolder.js');
//const web3 = require('./functions/blockchain.js');






//setting the template engine
app.set('view engine','ejs');

//session maintaining
app.use(session({secret:'noneed', resave: false, saveUninitialized: true}));

// by using locals we can access the session variable anywhere in the templates.
app.use(function(req, res, next){
	res.locals.userId = req.session.userId;
	res.locals.role = req.session.designation;
	res.locals.Event_Name = req.session.Event_Name;
	res.locals.Club_Name = req.session.Club_Name;
	res.locals.status = "400";
	next();
});

// const Storage = multer.diskStorage({
// 	filename : function(req,file,cb){
// 		let temp = Date.now() + file.originalname;
// 		cb(null , temp)
// 		encrypt.enc('./uploads/'+temp,'./uploads/'+file.originalname+'encrypted_output.txt',key,options);
// 	},
// 	destination : function(req,file,cb){
// 		cb(null, 'uploads/')
// 	}
// });


// app.post('/upload',upload.array('Image',10),(req,res)=>{
// 	console.log(req.files);
// });


//AJAX
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//router
const student = require('./routes/student.js');
const faculty = require('./routes/faculty.js');

app.use('/student',student);
app.use('/faculty',faculty);


var event =  "Treasure Hunt" //from web UI
var club = "Domain"

// const storage = multer.diskStorage({
// 	destination : function(req,file,cb){
// 		cb(null, './uploads/csv/'+club+'/'+event)
// 	},
// 	filename : function(req,file,cb){
// 		let temp = file.originalname;
// 		cb(null , temp)
// 	}
// });


// var upload = multer({ storage: storage })

// app.post('/upload',upload.single('Image'),(req,res)=>{
// 	//event = "Swat the bug"
// 	club= "STC"
  
// 	console.log(req.file);
// });



// app.get('/',(req,res)=>{
// 	//mail.sendMail("1234","leeaanair@gmail.com");
// 	const csvFilePath='./student.csv'

// 	csv()
// 	.fromFile(csvFilePath)
// 	.then((jsonObj)=>{
// 	    console.log(jsonObj);
// 	})

// 	res.render("home");
// });


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
});

app.listen(8080);