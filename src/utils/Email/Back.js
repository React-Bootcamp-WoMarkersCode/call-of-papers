var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
require('dotenv').config();




var transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: 'sharingtalks@hotmail.com',
    pass: process.env.PASSWORD_EMAIL
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  }
});

router.post('/send', (req, res, next) => {
  var email = req.body.email
  var message = req.body.message
  var content = `${message} `

  var mail = {
    from: 'Sharing Talks <sharingtalks@hotmail.com>',
    to: email,
    subject: 'Resultado da palestra submetida',
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
