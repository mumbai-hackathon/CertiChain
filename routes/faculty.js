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
const mkdirp = require('mkdirp');
const Json2csvParser = require('json2csv').Parser;

const database = require("../functions/facultyQuery.js");
const blockchain = require("../functions/blockchainAPI.js");
const mail = require('../functions/mail.js');
const pdfObj = require('../functions/pdf.js');


// global.Event_Name;
// global.Club_Name;

const storage = multer.diskStorage({
	destination : function(req,file,cb){
		//cb(null, './uploads/csv/'+club+'/'+event)
		console.log("inside storage");
		//console.log(req)
		// console.log(req.body.ClubName);
		var club = req.body.ClubName;
		var event = req.body.Event_Name;
		// console.log(req.session.Club_Name);
		// console.log(global.Club_Name);
		console.log(event+" and "+club);

		const dir = './uploads/csv/'+club+'/'+event;
		mkdirp(dir, err => cb(null, dir));//+club+'/'+event
	},
	filename : function(req,file,cb){
		let temp = file.originalname;
		cb(null , temp)
	}
});

var upload = multer({ storage: storage })

router.post('/upload',upload.single('CSVFile'),(req,res)=>{
	//event = "Swat the bug"
	//club= "STC"
	// req.session.Event_Name = req.body.Event_Name;
	// req.session.Club_Name = req.body.ClubName;
	// global.Club_Name = req.body.Club_Name;
	console.log("inside upload");
	console.log(req.file);
	console.log(req.body.Event_Name);
	// console.log(global.Club_Name);
	console.log(req.body.ClubName);
	var sId = req.body.StaffId;
	var eId = req.body.EventId;
	console.log(req.file.path)
	console.log("staffid "+sId+" and eventId "+eId);
	var temp = req.file.destination.split('.')
	var temp2 = temp[1]
	console.log("dsa"+temp)
	console.log(temp2) 
	var csv_path = "192.168.43.19/CertiChain"+temp2+'/'+req.file.originalname;
	console.log(csv_path);
	console.log("abhi HOD ke pas ja");

	database.getHodFromFaculty(sId,function(err,result){
		if(err) throw err;
		console.log(result);
		console.log(result[0].branch);
		var branch = result[0].branch;
		var hodId = result[0].sId;
		console.log(result[0].sId);

		database.setHodApproval(sId,eId,branch,hodId,csv_path,function(err,result1){
			if(err) throw err;	
			console.log(result1);
			database.setLocation(eId,req.file.originalname,function(err,result){
				if(err) throw err
				//console.log(res)
			})
		})

	})

	res.redirect("view_event");
  
});



// const fields = ['car', 'price', 'color'];
// const myCars = [
//   {
//     "car": "Audi",
//     "price": 40000,
//     "color": "blue"
//   }, {
//     "car": "BMW",
//     "price": 35000,
//     "color": "black"
//   }, {
//     "car": "Porsche",
//     "price": 60000,
//     "color": "green"
//   }
// ];
 
// const json2csvParser = new Json2csvParser({ fields });
// const csv2 = json2csvParser.parse(myCars);
 
// console.log(csv2);


router.post('/csv2json',(req,res)=>{

	var filename = req.body.csv;//"student.csv"
	var event = req.body.event;//"Treasure Hunt"
	var club = req.body.club;//"Domain"
	var eId = req.body.eId;
	console.log("UI "+filename,event,club)

	const csvFilePath='./uploads/csv/'+club+'/'+event+'/'+filename;

	csv()
	.fromFile(csvFilePath)
	.then((jsonObj)=>{
	    console.log(jsonObj);
	    //var event = "Treasure Hunt";
	    //var club = "Domain";
		
		// var obj = JSON.parse(jsonObj[0]);
		// console.log(obj);
		// var keys = Object.keys(jsonObj[0]);
		// for (var i = 0; i < keys.length; i++) {
		//   console.log(jsonObj[keys[i]]);
		// }

	//var result = [{"key1":"value1","key2":"value2"}];
	var field = [];
	for(var key in jsonObj[0]){ 
		console.log(key);
		field.push(key);
	}

	console.log(field)

	    for (var i = 0; i < jsonObj.length; i++) {
	    
	    	console.log(jsonObj[i].fname,jsonObj[i].lname,jsonObj[i].year,jsonObj[i].branch,jsonObj[i].rank)
	    	//pdfObj.pdf(event,jsonObj[i].fname,jsonObj[i].lname,club);
	    }

	 //var jsonObj1 = JSON.parse(jsonObj);
	//console.log("tghfghkjhfv"+jsonObj1);
	res.render("view_participants",{userId: req.session.designation,eId: req.body.eId, jsonObj: jsonObj});
	});



})

//generate PDF

router.post('/generateCertificate',(req,res)=>{

	var eId = req.body.EventId;
	database.getEvent(eId,function(err,result){

	if(err) throw err;
		console.log(result)
		var filename = result[0].filename//"student.csv"
		var event = result[0].name//"New Event"
		var club = result[0].club//"CSI"
		console.log(filename);
		console.log(event)
		console.log(club)

		const csvFilePath='./uploads/csv/'+club+'/'+event+'/'+filename;

		csv()
		.fromFile(csvFilePath)
		.then((jsonObj)=>{
		    console.log(jsonObj);

		    for (var i = 0; i < jsonObj.length; i++) {
		    
		    	pdfObj.pdf(event,jsonObj[i].fname,jsonObj[i].lname,jsonObj[i].rank,club);

		    }
		    res.redirect("view_event");
		})

	})
	//console.log(req.body.EventId);

	//res.render("home");
});

router.get('/home',(req,res)=>{
	//mail.sendMail("1234","leeaanair@gmail.com");
	console.log("inside");
	if (req.session.designation) {
		console.log(req.session.designation);
		console.log("in session");
		res.render("home", {userId: req.session.designation, roles: req.session.roles});
	}
	else{
		console.log("out session");
		res.render("home");
	}
});



router.get('/login', function(req,res){
	res.render("login");
});

//Staff Login (Web)


router.post('/login',(req,res)=>{

	var username = req.body.uname;
	var password = req.body.pass;
	// var role = req.body.role;
	var hash = md5(password);
	//var con=conObj.connection();
	var optradio = req.body.optradio;

	if(optradio == "faculty" ){
	database.staffLogin(username,hash,function(err,result){

		if(err) throw err;
			if(result.length==1)
			{	
				console.log(hash);
				var temp_pass = JSON.stringify(result[0].password);
				var temp_role = JSON.stringify(result[0].role);
				var temp2_pass= temp_pass.replace(/\"/g, "");
				var temp2_role= temp_role.replace(/\"/g, "");

				if(hash == temp2_pass){
					req.session.userId = req.body.uname;
					req.session.roles = req.body.uname;
					req.session.designation = temp2_role;
					console.log(req.session.userId)
					console.log(req.session.roles);
					console.log(req.session.designation)
					console.log("Correct password"+temp_pass,temp2_role);
					res.redirect("home");

				}
				else{
					console.log("Incorrect password");
					res.render("login");
				}
			}
			else{
				console.log("username not found");
				res.render("login");	
			}
	});
	}
	else if (optradio == "recruiter") {
		console.log("inside rec");
		database.recruiterLogin(username,hash,function(err,result){

		if(err) throw err;
			if(result.length==1)
			{	
				console.log(hash);
				var temp_pass = JSON.stringify(result[0].password);
				//var temp_role = JSON.stringify(result[0].role);
				var temp2_pass= temp_pass.replace(/\"/g, "");
				//var temp2_role= temp_role.replace(/\"/g, "");

				if(hash == temp2_pass){
					req.session.userId = req.body.uname;
					req.session.roles = req.body.uname;
					console.log(optradio);
					req.session.designation = optradio;
					console.log(req.session.userId)
					console.log(req.session.roles);
					console.log(req.session.designation)
					console.log("Correct password"+temp_pass);
					res.redirect("home");

				}
				else{
					console.log("Incorrect password");
					res.render("login");
				}
			}
			else{
				console.log("username not found");
				res.render("login");	
			}
	});
		}

});



//Faculty/staff registeration

router.get('/staff_register', function(req,res){
	console.log(req.session.designation);

	if (req.session.designation == "admin") {
		res.render("staff_register", {userId: req.session.designation});
	}
	else{
		res.render("login");
	}
});

//Staff Registration
router.post('/staff_register',(req,res)=>{

	var firstName = req.body.fname;
	var lastName = req.body.lname;
	var branch = req.body.branch;
	var email = req.body.email;
	var password = req.body.password;
	var contactNumber = req.body.contactNo;
	var role = req.body.role;
	var date = new Date()
	var regDate = date.toISOString();
	var hash = md5(password);
	console.log(password);
	console.log(hash);


	database.staffRegistration(branch,firstName,lastName,hash,email,contactNumber,role,regDate,function(err,result){
		if (err){ throw err;
	    res.sendStatus(400);
	    }
	    console.log("1 record inserted");
	    database.getStaffId(email,function(err,result){
	    	console.log(result);
	    	console.log(result[0]);
	    	console.log(result[0].sId);
	    	console.log("staff id "+result.sId);
	    	var id = result[0].sId;
			mail.sendMail(id,firstName,password,email);
	    	res.redirect("home");
	    })


	});
});



router.get('/principal_register', function(req,res){
	console.log(req.session.designation);

	if (req.session.designation == "admin") {
		res.render("principal_register", {userId: req.session.designation});
	}
	else{
		res.render("login");
	}
});

//principal Registration
router.post('/principal_register',(req,res)=>{

	var firstName = req.body.fname;
	var lastName = req.body.lname;
	var branch = req.body.branch;
	var email = req.body.email;
	var password = req.body.password;
	var contactNumber = req.body.contactNo;
	var role = req.body.role;
	var date = new Date()
	var regDate = date.toISOString();
	var hash = md5(password);
	console.log(password);
	console.log(hash);


	database.staffRegistration(branch,firstName,lastName,hash,email,contactNumber,role,regDate,function(err,result){
		if (err){ throw err;
	    res.sendStatus(400);
	    }
	    console.log("1 record inserted");
	    database.getStaffId(email,function(err,result){
	    	console.log(result);
	    	console.log(result[0]);
	    	console.log(result[0].sId);
	    	console.log("staff id "+result.sId);
	    	var id = result[0].sId;
			mail.sendMail(id,firstName,password,email);
	    	res.redirect("home");
	    })

	});
});



//HOD register
router.get('/hod_register', function(req,res){
	console.log(req.session.designation);

	if (req.session.designation == "admin") {
		res.render("hod_register", {userId: req.session.designation});
	}
	else{
		res.render("login");
	}
});

router.post('/hod_register',(req,res)=>{

	var firstName = req.body.fname;
	var lastName = req.body.lname;
	var branch = req.body.branch;
	var email = req.body.email;
	var password = req.body.password;
	var contactNumber = req.body.contactNo;
	var role = req.body.role;
	var date = new Date()
	var regDate = date.toISOString();
	var hash = md5(password);
	console.log(password);
	console.log(hash);


	database.staffRegistration(branch,firstName,lastName,hash,email,contactNumber,role,regDate,function(err,result){
		if (err){ throw err;
	    res.sendStatus(400);
	    }
	    console.log("1 record inserted");
	    database.getStaffId(email,function(err,result){
	    	console.log(result);
	    	console.log(result[0]);
	    	console.log(result[0].sId);
	    	console.log("staff id "+result.sId);
	    	var id = result[0].sId;
			mail.sendMail(id,firstName,password,email);
	    	res.redirect("home");
	    })

	});
});




//TPO register

router.get('/tpo_register', function(req,res){
	console.log(req.session.designation);

	if (req.session.designation == "admin") {
		res.render("tpo_register", {userId: req.session.designation});
	}
	else{
		res.render("login");
	}
});

router.post('/tpo_register',(req,res)=>{
	var firstName = req.body.fname;
	var lastName = req.body.lname;
	var branch = req.body.branch;
	var email = req.body.email;
	var password = req.body.password;
	var contactNumber = req.body.contactNo;
	var role = req.body.role;
	var date = new Date()
	var regDate = date.toISOString();
	var hash = md5(password);
	console.log(password);
	console.log(hash);


	database.staffRegistration(branch,firstName,lastName,hash,email,contactNumber,role,regDate,function(err,result){
		if (err){ throw err;
	    res.sendStatus(400);
	    }
	    console.log("1 record inserted");
	    database.getStaffId(email,function(err,result){
	    	console.log(result);
	    	console.log(result[0]);
	    	console.log(result[0].sId);
	    	console.log("staff id "+result.sId);
	    	var id = result[0].sId;
			mail.sendMail(id,firstName,password,email);
	    	res.redirect("home");
	    })

	});
});



//Recruiter Registration
router.get("/recruiter_register", function(req,res){
	if (req.session.designation == "tpo") {
		res.render("recruiter_register", {userId: req.session.designation});
	}
	else{
		res.render("login");
	}
});

//Recruiter Registration
router.post('/recruiter_register',(req,res)=>{

	var name = req.body.name;
	var companyName = req.body.company;
	var email = req.body.email;
	var password = req.body.password;
	var contactNumber = req.body.contactNo;
	var date = new Date()
	var regDate = date.toISOString();
	var hash = md5(password);
	console.log(password);
	console.log(hash);

	database.recruiterRegistration(name,companyName,hash,email,contactNumber,regDate,function(err,result){
		if (err){ throw err;
	    res.sendStatus(400);
	    }
	    console.log("1 record inserted");
	    database.getRecruiterId(email,function(err,result){
	    	//console.log(result);
	    	//console.log(result[0]);
	    	//console.log(result[0].rId);
	    	//console.log("staff id "+result.rId);
	    	var id = result[0].rId;
			mail.sendMail(id,name,password,email);
	    	res.redirect("home");
	    })
	});
});


router.get("/staff_view", function(req,res){

	if (req.session.designation == "admin") {

		database.getStaffDetails(function(err,result){
			if (err) throw err;
			res.render("staff_view", {userId: req.session.designation, results: result});	
		})
	}
	else{
		res.render("login");
	}
});

router.post("/edit_staff_profile", function(req,res){
	
	var fname = req.body.edit_fname;
	var lname = req.body.edit_lname;
	var role = req.body.edit_role;
	var email = req.body.edit_email;
	var contactNo = req.body.edit_contactNo;
	var password = req.body.edit_password;
	var sid = req.body.fix_id;
	// console.log(sid);
	// console.log(fname);


	if (req.session.designation == "admin") {

		database.editStaff(fname,lname,email,password,contactNo,role,sid,function(err,result){
			if(err) throw err;
			res.redirect("staff_view");

		});
	}
	else{
		res.render("login");
	}
});

router.get("/view_recruiter", function(req,res){

	if (req.session.designation == "tpo") {

		database.getRecruiterDetails(function(err,result){
			if (err) throw err;
			console.log(result)
			res.render("view_recruiter", {userId: req.session.designation, results: result});
		})
	}
	else{
		res.render("login");
	}
});

router.post("/edit_recruiter_profile", function(req,res){
	var company = req.body.edit_Rcompany;
	var name = req.body.edit_Rname;
	var email = req.body.edit_Remail;
	var contactNo = req.body.edit_RcontactNo;
	var password = req.body.edit_Rpassword;
	var rid = req.body.fix_Rid;
	// console.log(sid);
	// console.log(fname);


	if (req.session.designation == "tpo") {

		database.editRecruiter(company,name,email,password,contactNo,rid,function(err,result){
			if(err) throw err;
			res.redirect('view_recruiter');

		});
	}
	else{
		res.render("login");
	}
});


router.get("/event_register", function(req,res){
	// res.render("event_register");
	if (req.session.designation == "faculty") {
		res.render("event_register", {userId: req.session.designation});
	}
	else{
		res.render("login");
	}
});

router.post("/event_register",(req,res)=>{

	var eventName = req.body.event_name;
	var clubName = req.body.club;
	var year = req.body.year;
	var facultyName = req.body.faculty_name;
	var date = new Date()
	var regDate = date.toISOString();

	if (!fs.existsSync('./uploads/csv/'+clubName)){
    fs.mkdirSync('./uploads/csv/'+clubName);
    }
	if (!fs.existsSync('./uploads/csv/'+clubName+'/'+eventName)){
    fs.mkdirSync('./uploads/csv/'+clubName+'/'+eventName);
    }  


	database.eventRegistration(eventName,clubName,year,facultyName,regDate,function(err,result){
		if (err){ throw err;
	    //res.sendStatus(400);
	    res.redirect("login");

	    }
	    console.log("1 record inserted");
	    res.redirect("home");

	});
});

//
router.get("/view_event", function(req,res){

	if (req.session.designation == "faculty" || req.session.designation == "principal" || req.session.designation == "hod") {

		database.getEventsDetails(function(err,result){

			if (err) throw err;
			res.render("view_event", {userId: req.session.designation, results: result});
		
		});
	}
	else{
		res.render("login");
	}
});

router.post("/edit_event_data", function(req,res){
	
	var eventName = req.body.edit_eventName;
	var faculty = req.body.edit_facultyName;
	var clubName = req.body.edit_clubName;
	var eventDate = req.body.edit_eventDate;
	var eid = req.body.fix_Eid;
	// console.log(sid);
	console.log(eventDate);

	if (req.session.designation == "faculty") {

	database.editEvents(eventName,clubName,eventDate,faculty,eid,function(err,result){
		if (err) throw err;
 		res.redirect('view_event');
	});
	}
	else{
		res.render("login");
	}
});


router.post("/delete_staff", function(req,res){
	var staffId = req.body.staffId;

	if (req.session.designation == "admin") {
	database.deleteStaff(staffId,function(err,result){

 		if (err) throw err;
		res.redirect('staff_view');
	});

	}
	else{
		res.render("login");
	}
});


router.post("/delete_recruiter", function(req,res){

	var recruiterId = req.body.recruiterId;

	if (req.session.designation == "tpo") {

		database.deleteRecruiter(recruiterId,function(err,result){
			if(err) throw err;
			res.redirect('view_recruiter');
		})
	}
	else{
		res.render("login");
	}
});


router.post("/delete_event", function(req,res){

	var eventId = req.body.eventId;

	if (req.session.designation == "faculty") {

		database.deleteEvent(eventId,function(err,result){
			if (err) throw err;
			res.redirect('view_event');

		})
	}
	else{
		res.render("login");
	}
});



//upload
router.post('/upload',upload.single('Image'),(req,res)=>{
	//event = "Swat the bug"
	//club= "STC"
	console.log(req.file);
});


//get Events Participated from username
router.post('/getEvent',(req,res)=>{

	var username = req.body.username;

	database.getEventsParticipated(username,function(err,result){
		if (err){ throw err;
	    res.sendStatus(400);
	    }
	    console.log(result);
	    res.sendStatus(200);

	});

});


//set Request List
router.post('/setRequest',(req,res)=>{

	var username = req.body.username;
	var eId = req.body.eId;
	var rId = req.body.rId;
	
	database.setRequestList(rId,username,eId,function(err,result){
		
		if (err){ throw err;
	    res.sendStatus(400);
	    }
	    console.log(result);
	    res.sendStatus(200);

	});
});





router.get('/logout',function(req,res){    
    req.session.destroy(function(err){  
        if(err){  
            console.log(err);  
        }  
        else  
        {  
            res.redirect('login');  
        }  
    });  

});

module.exports = router;