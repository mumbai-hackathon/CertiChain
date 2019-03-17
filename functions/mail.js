var nodemailer = require('nodemailer');
//var crypto = require('crypto');

function sendMail(id,name,password,email){

  // var password = generator.generate({
  //     length: 10,
  //     numbers: true
  // });

  // var hash = crypto.createHash('sha256').update(password).digest('base64');
  // console.log(hash);
  // console.log(password);


  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nishantnimbalkar98@gmail.com',
      pass: 'nishant@123'
    }
  });

  var mailOptions = {
    from: 'nishantnimbalkar98@gmail.com',
    to: email,
    subject: 'Account created from DBIT',
    text: 'Hey '+name+', Admin here. Your username for CertiChain is '+id+' and password is '+password+'. Thanks and Regards,Admin :)'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  //return hash;
}

module.exports= { sendMail };