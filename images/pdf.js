//hash - random

const PDFDocument = require('pdfkit');
const fs = require('fs');
const crypto = require('crypto');
const md5 = require('md5');
const mysql = require("mysql");
//const database = require("./database.js");
var certificateId = 9763070990;
//const con = require('./databaseConnection.js');
//var center = require('center-align');
const codes = require('rescode');


function pdf(eventname,fname,lname,club, rank){
   // Create a document
   const doc = new PDFDocument;

   if (!fs.existsSync('./uploads/certificates/'+club)){
   fs.mkdirSync('./uploads/certificates/'+club);
   }
   if (!fs.existsSync('./uploads/certificates/'+club+'/'+eventname)){
   fs.mkdirSync('./uploads/certificates/'+club+'/'+eventname);
   }
   if(rank =="")
   {
      var appr = "Participation";
      var ach = "participated"
   }
   else
   {
      var appr = "Appreciation";
      var ach = "achieved rank "+rank;
   } 
   //Fetching the username and eventId from DB 

         // var sql = "select username from student where fname='"+fname+"'and lname='"+lname+"';";
         // con.query(sql,function(err,result,fields){
         // if(err) throw err;
         // else
         // {
         //    if(result.length==1)
         //    {  
         //      var username = result[0].username;
         //       console.log(username);
         //    }
         // }
         // });
         // database.getEventid(eventname, function(eId){

         //    database.getUserid(fname, lname, function(username){

         //       database.createStudevent(randomHash, certificateId, username, eId, function(){

         //          console.log("kaam kar raha hai");
         //       })
         //    })
         // })

    
         // var sql2 = "select eId from events where name='"+eventname+"';";
         //    con.query(sql2,function(err,result1,fields){
         //     if(err) throw err;
         //     else{
         //       if(result1.length==1)
         //       {
         //          //console.log(JSON.stringify(result1));
         //          //console.log(JSON.stringify(result1));
         //         var eventId = result1[0].eId;
         //          console.log(eventId);
         //       }
         //     }  
         // });





   // Pipe its output somewhere, like to a file or HTTP response
   // See below for browser usage
   doc.pipe(fs.createWriteStream('./uploads/certificates/'+club+'/'+eventname+'/'+fname+'.pdf'));
   
   var random = Math.random().toString();
   var randomHash = crypto.createHash('sha1').update(random).digest('hex');
   //var randomHash = randomHash+md5(output);
   //console.log("PDF vala "+randomHash);
   //console.log("before insert"+username);
   //console.log("before insert"+eventId);

   // var sql = "INSERT INTO stud_event VALUES ('"+username+"','"+eventId+"','"+certificateId+"','"+randomHash+"')";
   //   con.query(sql, function (err, result) {
   //     if (err) throw err;
   //     console.log("1 record inserted");
   //   });
   
    doc.image('./images/1.png',535, 0,{
      fit: [100, 90],
      
    });

    doc.image('./images/6.png',190, -7,{
      fit: [250, 250],
      
    });
    
    doc.image('./images/2.png',0, 0,{
      fit: [100, 90],
      
    });

    doc.image('./images/3.png',0, 200,{
      fit: [100, 90],
      
    });

    doc.image('./images/5.png',190, 250,{
      fit: [250, 250],
      
    });
    

    doc.image('./images/4.png',520, 200,{
      fit: [100, 90],
      
    });

   // Embed a font, set the font size, and render some text
   
   doc.fontSize(20).text('DON BOSCO INSTITUTE OF TECHNOLOGY',105, 40);
   (doc.font('Helvetica-Bold').fontSize(20).text('Certificate of '+appr, 205, 90)); 
   doc.fontSize(17).text('       This is to certify that '+fname+' '+lname+' has '+ach+" in "+eventname+" organised by "+club, 30, 130,{
    align : 'center'});
   // Add an image, constrain it to a given size, and center it vertically and horizontally
   // Add another page
   
   /*codes.loadModules(["ean2", "ean5", "ean8", "ean13"]);

   dataEan8 = codes.create('ean8', certificateId)

   doc.image(dataEan8, 450, 300, { height : 30, width : 50 } )
*/
    codes.loadModules(["ean2", "ean5", "ean8", "ean13"]);
   dataEan8 = codes.create('ean8', certificateId)
   doc.image(dataEan8, 450, 300, { height : 30, width : 50 } )

   // Finalize PDF file
   certificateId++;

   doc.end();
}


module.exports = { pdf };