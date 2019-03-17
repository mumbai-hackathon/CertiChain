var express = require('express')
var router = express.Router()
const http = require('http');
const app = express();
const bodyParser = require('body-parser');
const mysql = require("mysql");
const Web3 = require('web3');
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

const database = require("../functions/studentQuery.js");
const blockchain = require("../functions/blockchainAPI.js");

//Student Registeration
router.post('/register',(req,res)=>{

	var username = req.body.username;
	var firstName = req.body.fname;
	var lastName = req.body.lname;
	var password = req.body.password;
	var email = req.body.email;
	var contactNumber = req.body.contactNo;
	var branch = req.body.branch;
	var year = req.body.year;
	var date = new Date()
	var regDate = date.toISOString();
	var hash = md5(password);
	console.log(password);
	console.log(hash);
	
	database.studentRegistration(username,firstName,lastName,hash,email,contactNumber,branch,year,regDate,function(err,result){
		if (err){ throw err;
	    res.sendStatus(400);
	    }
	    console.log("1 record inserted");
	    res.sendStatus(200);

	});
});


//Student Login 
router.post('/login',(req,res)=>{

	console.log("sad");
	var username = req.body.username;
	var password = req.body.password;
	var hash = md5(password);

	database.studentLogin(username,hash,function(err,result){

		if(err) throw err;
			if(result.length==1)
			{	
				console.log(hash);
				var temp = JSON.stringify(result[0].password);
				var temp2 = temp.replace(/\"/g, "");
				if(hash == temp2){
					console.log("Correct password");
					res.sendStatus(200);
				}
				else{
					console.log("Incorrect password");
					res.sendStatus(400);
				}
			}
			else{
				console.log("username not found");	
			}
	});

	});


//Certificate List Rendering 
router.post('/getCertificates',(req,res)=>{

	console.log("sad");
	var username = req.body.username;
	var club = req.body.club;
	console.log(username);
	console.log(club);
	var username = username.replace(/\"/g, "");
	var club = club.replace(/\"/g, "");

	database.getEventDetails(club,username,function(err,result){


		database.getCertificateId(club,username,function(err,result1){

		if(err) {
			throw err;
			res.sendStatus(400);
		}
		else{
			// temp = JSON.stringify(result)
			// temp1 = JSON.stringify(result1)
			// console.log(temp);
			// console.log(temp1);
			if(result.length == 0){
				res.sendStatus(400);
			}
			else{
			console.log(result);
			console.log(result[0].eId);
			console.log(result[0].name);
			console.log(result1[0].certificateId);

			for (var i = 0; i < result.length ; i++) {
				result[i]["certificateId"] = result1[i].certificateId;
			}

			console.log("After appending "+JSON.stringify(result));
			res.send(result);
		}
	}


		})


	});

});






//Certificate Rendering 
router.post('/viewCertificates',(req,res)=>{

	console.log("sad");
	var certificateId = req.body.cid;
	var temp = certificateId
	var certificateId = certificateId.replace(/\"/g, "");
	console.log(certificateId);

	//hash from DB
	database.getHashOfCertificateId(certificateId,function(err,result){
		if(err) throw err;

		var hash = result[0].hashId;
		console.log(hash)
		var value = blockchain.getCertificateLocation(temp,hash)
		console.log("it worked "+value);
		var value = value.toString()
		var without = value.split(",");
		console.log(without);
		console.log(without[0]);
		res.send({curl : without[0]})
	})
});
	

//Get Profile Details
router.post('/viewProfile',(req,res)=>{

	console.log("sad");
	var username = req.body.username;
	console.log(username);
	database.myProfile(username,function(err,result){
		if(err) throw err;
		console.log(result)
	})

});


//Student Registeration

//has to be appended with login
router.post('/getNotification',(req,res)=>{

	var username = req.body.username;

	database.getNumberOfRequest(username,function(err,result){
		if (err){ throw err;
	    res.sendStatus(400);
	    }
	    console.log(result);
	    res.sendStatus(200);

	});
});


router.post('/getNotificationDetails',(req,res)=>{

	var username = req.body.username;
	
	database.getRecruiterNotification(username,function(err,result){
		if(err) throw err
		database.getEventNotification(username,function(err,result1){
			if(err) throw err
			console.log("it worked");
			console.log(result);//rec name company
			console.log(result1)//event club
			for (var i = 0; i < result.length ; i++) {
				result[i]["eventname"] = result1[i].name;
				result[i]["club"] = result1[i].club;
			}
			console.log(result);
			console.log("After appending "+JSON.stringify(result));
			res.send(result);
		})
	});


});

module.exports = router;