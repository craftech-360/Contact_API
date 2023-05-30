const express = require('express')
const cors = require('cors')

const nodemailer = require("nodemailer")

const app = express()

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(cors())

app.listen(4000, () => console.log('Server started on Port 4000'))

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: false,
    auth: {
        user: "dermaconWordcloud@gmail.com",
        pass: "spnxtjlepmxnbrli"
    },
  })
  
  let mailOptions;
  mailOptions = {
    from: '"Craftech360" <contact.craftech360@gmail.com>', // sender address
    to: "", // list of receivers
    subject: "Here Is Your WordCloud photo", // Subject line
    text:"Thank you for taking part in the DERMACON 2023.",
    attachments: ""
};


app.post('/userEmail', (req,res) => {
    const parsed = req.body.email
    // console.log(parsed)
    mailOptions.to = parsed;
    // const content = {   // encoded string as an attachment
    //   filename: parsed.name,
    //   // content: parsed.image, 
    //   path: `./public/images/${parsed.name}`
    // }
    // mailOptions.attachments = content;
    transporter.sendMail(mailOptions, (err, info) => {
      if(err) {
        return res.send(err) 
      }
    //   res.send("message sent:", info.messageId)
    })
})
