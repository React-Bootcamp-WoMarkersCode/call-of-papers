var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();


var transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: 'callforpapers@hotmail.com',
        pass: 'Womakerscode'
   }
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  }
});

router.post('/send', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var content = `${message} `
  
    var mail = {
      from: 'Call For Papers <callforpapers@hotmail.com>',
      to: email,  
      subject: 'Resultado da palestra submetida',
      text: `Olá ${name}, tudo bem?`,
      html: content
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })
  
  module.exports = router;