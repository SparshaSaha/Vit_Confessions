const nodemailer = require('nodemailer');


module.exports=function(email,password){

  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fourthstatelab@gmail.com',
    pass: 'SidSparsha'
  }
});

var mailOptions = {
from: 'fourthstatelab@gmail.com',
to: email,
subject: "Vit Confession password",
text: 'The Password is : '+password
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});


}
