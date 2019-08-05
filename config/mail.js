'use strict'


const nodeMailer = require('nodemailer')

async function main(usermail, password){
    const transporter = nodeMailer.createTransport({
        host:'smtp.gmail.com',
        port: 465,
        auth:{
            user:'eric95maina@gmail.com',
            pass:'Godwithus777'
        }
    });
    const mailOptions = {
        from:"eric95maina@gmail.com",
        to:usermail,
        subject:'Hello',
        text:'Hello World',
        html:'<p>Your Account Email is ' + usermail + ' and password '+ password +'</p>'
    };

    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.error(error)
            
        }else{
            console.log("success")
        }
    });
    
}

module.exports =  main;