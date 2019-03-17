//hash - random

const PDFDocument = require('pdfkit');
const fs = require('fs');
const crypto = require('crypto');
const md5 = require('md5');
const mysql = require("mysql");
const database = require("./studentQuery.js");
var certificateId = "97630709";
const con = require('../configuration/databaseConnection.js');

const codes = require('rescode')


function pdf(eventname,fname,lname,rank,club){
   // Create a document
   const doc = new PDFDocument;

   console.log(club);
   console.log(eventname);

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

         // database.getEventid(eventname, function(eId){

         //    database.getUserid(fname, lname, function(username){

         //       database.createStudevent(randomHash, certificateId, username, eId, function(){

         //          console.log("kaam kar raha hai");
         //       })
         //    })
         // })

   
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

   doc.image('./images/dbit.png', 70,40 ,{
      //fit: [70, 100],
      //align: 'center',
      //valign: 'center',
      height : 50,
      width : 50 
   });
   

   // Embed a font, set the font size, and render some text
   doc.fontSize(16)
      .text('        DON BOSCO INSTITUTE OF TECHNOLOGY\n                KURLA WEST, MUMBAI - 400 070', 110, 50);
    
   // Add an image, constrain it to a given size, and center it vertically and horizontally

  
  doc.fontSize(25)
      .text('Certificate of '+appr+'',165,120)  

   doc.fontSize(17).text('       This is to certify that '+fname+' '+lname+' has '+ach+" in "+eventname+" organised by "+club, 30, 180,{
    align : 'center'});

   // codes.loadModules(["ean2", "ean5", "ean8", "ean13"]);
   // dataEan8 = codes.create('ean8', certificateId)
   // doc.image(dataEan8, 450, 300, { height : 30, width : 50 } )

   // Add another page
   // doc.addPage()
   //    .fontSize(25)
   //    .text('Here is some vector graphics...', 100, 100);
    
   // Draw a triangle
   // doc.save()
   //    .moveTo(100, 150)
   //    .lineTo(100, 250)
   //    .lineTo(200, 250)
   //    .fill("#FF3300");
    
   // Apply some transforms and render an SVG path with the 'even-odd' fill rule
   // doc.scale(0.6)
   //    .translate(470, -380)
   //    .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
   //    .fill('red', 'even-odd')
   //    .restore();
    
   // Add some text with annotations
   // doc.addPage()
   //    .fillColor("blue")
   //    .text('Here is a link!', 100, 100)
   //    .underline(100, 100, 160, 27, {color: "#0000FF"})
   //    .link(100, 100, 160, 27, 'http://google.com/');
    
   // Finalize PDF file
   certificateId++;

   doc.end();
}


module.exports = { pdf };