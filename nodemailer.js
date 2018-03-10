var nodemailer=require('nodemailer');
const express=require("express");
const bodyparser=require("body-parser");
const exphbs=require("express-handlebars");
var app=express();

app.get("/",function(req,res)
{
	res.send("Hello");
});

app.listen(3000,function()
{
	console.log("Server STarted");
})

//var	 xoauth2=require('xoauth2');
/*function SendingMail()
{

		var transporter=nodemailer.createTransport(
		{
			service:'gmail',
			auth:{
				xoauth2:xoauth2.createXOAuthGenerator(
				{
					user:'gauravkochar.gk@gmail.com',
					clientId: '399325255320-brqnfcm5r3lvl95nc3hia7i2o8vd8dql.apps.googleusercontent.com',
					clientSecret: '7NaSYaBQqdR0zfn1VNGS54XC',
					refreshToken: ''
				})
			}
		})

		var mailOptions={
			from:'Gaurav Kochar <gauravkochar.gk@gmail.com>'
			to: 'gk.gauravkochar@gmail.com',
			subject: 'Nodemailer Test',
			text:'Hello world!!'
		}

	transporter.sendMail(mailOptions,function(err,res)
	{
	if(err)
	{
		console.log("Error");
	}
	else
	{
		console.log("Email Sent");
	}
	})
}*/
