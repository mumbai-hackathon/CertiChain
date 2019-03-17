const con = require('../configuration/databaseConnection.js');
const web3 = require('../configuration/blockchain.js');

function getEventid(eventname, cb)
{
	var sql = "select eId from events where name='"+eventname+"'";
	con.query(sql, function(err, result)
	{
		console.log(result);
		cb(result[0].eId);
	})
}

function getUserid(fname, lname, cb)
{
	var sql = "select username from student where fname='"+fname+"'and lname='"+lname+"';";
	con.query(sql, function(err, result)
	{
		console.log(result);
		cb(result[0].username);
	})
}

function createStudevent(randomHash, certificateId, username, eventId, cb)
{
	var sql = "INSERT INTO stud_event VALUES ('"+username+"','"+eventId+"','"+certificateId+"','"+randomHash+"')";
	con.query(sql, function (err, result) 
	{

       cb(err,result);
     });
}

function studentRegistration(username,firstName,lastName,hash,email,contactNumber,branch,year,regDate,cb){

	  var sql = "INSERT INTO student VALUES ('"+username+"','"+firstName+"','"+lastName+"','"+hash+"','"+email+"','"+contactNumber+"','"+branch+"','"+year+"','"+regDate+"')";
	  con.query(sql, function (err, result) {
	  	cb(err,result);
	    
	  });

}


function getEventDetails(club, username ,cb){

	var sql = "select * from events where club = '"+club+"' and eId in (select eId from stud_event where username = '"+username+"');"; 
		con.query(sql,function(err,result,fields){
		cb(err,result);
		});
}


function getCertificateId(club, username ,cb){

	var sql = "select certificateId from stud_event where eId in (select eId from events where club = '"+club+"' and eId in (select eId from stud_event where username = '"+username+"'));"; 
		con.query(sql,function(err,result,fields){
		cb(err,result);
		});
}


function getHashOfCertificateId(certificateId ,cb){

	var sql = "select hashId from stud_event where certificateId = '"+certificateId+"' "; 
		con.query(sql,function(err,result,fields){
		cb(err,result);
		});
}

function studentLogin(username,hash,cb){

		  	var sql = "select password from student where username='"+username+"';";
			con.query(sql,function(err,result,fields){
			cb(err,result);
			});
}

function myProfile(username,cb){

		  	var sql = "select username,fname,lname,email,contactNo,branch,year,regDate from student where username='"+username+"';";
			con.query(sql,function(err,result,fields){
			cb(err,result);
			});
}


function getNumberOfRequest(username,cb){

			var sql = "select count(rId) from request_list where username ='"+username+"';";
			con.query(sql,function(err,result,fields){
			cb(err,result);
			});
}


function getRecruiterNotification(username,cb){

			var sql = "select company,name from recruiter where rId in (select rId from request_list where username = '"+username+"');";
			con.query(sql,function(err,result,fields){
			cb(err,result);
			});

}

function getEventNotification(username,cb){

			var sql = "select name,club from events where eId in (select eId from request_list where username = '"+username+"');";
			con.query(sql,function(err,result,fields){
			cb(err,result);
			});

}


function getId(email,cb){

		  	var sql = "select username from student where email = '"+email+"' ";
			con.query(sql,function(err,result,fields){
			cb(err,result);
			});

}

module.exports = { getEventid, getUserid, createStudevent , studentRegistration , studentLogin ,getEventDetails, getCertificateId, getHashOfCertificateId, myProfile, getNumberOfRequest, getRecruiterNotification, getEventNotification, getId }
