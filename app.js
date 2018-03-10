var express=require('express');
const exphbs=require("express-handlebars");
var app=express();
var nodemailer=require('nodemailer');

var bodyParser=require('body-parser');

var querystring=require('querystring');
var request = require('request');

var path=require("path");
var course,section;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

var MongoClient = require('mongodb').MongoClient;

var mongourl = 'mongodb://gaurav:gaurav@ds111568.mlab.com:11568/gaurav';

app.use(express.static(path.join(__dirname)));

app.use(express.static(path.join(__dirname,"public")));

app.get("/",function(request,response)	
{

response.status(200).sendFile(__dirname+"/index.html");
});


app.get("/sectionpage",function(request,response)	
{
response.status(200).sendFile(path.join(__dirname,"public","addsection.html"));
});

app.get("/changepass",function(request,response)
{
	response.status(200).sendFile(path.join(__dirname,"public","forgotpassword.html"));

})

app.get("/questionpage",function(request,response)	
{
response.status(200).sendFile(path.join(__dirname,"public","question.html"));
});


app.get("/coursepage",function(request,response)	
{
response.status(200).sendFile(path.join(__dirname,"public","addcourse.html"));
});


app.get("/admindashboard",function(request,response)
{
	console.log("dashboard");
	
response.status(200).sendFile(path.join(__dirname, "public", "dashboard.html"));
});


app.get("/userdashboard",function(request,response)
{
	console.log("dashboard");
	
response.status(200).sendFile(path.join(__dirname, "public", "userdashboard.html"));
});


app.get("/CodingQuestion",function(request,response)
{
	response.status(200).sendFile(path.join(__dirname,"public","codingquestion.html"));

});


app.get("/getsections",function(request,response)
{

MongoClient.connect(mongourl,function(err,db)
{
	if(err) throw err;
	else
	{
var query={courseid:course};
			
		db.db('gaurav').collection('Sections').find(query).toArray(function(err,result)
		{
			if(err) throw err;

			response.status(200).json(result);
		})
	}
})
});


app.get("/users",function(request,response)
{

MongoClient.connect(mongourl,function(err,db)
{
	if(err) throw err;
	else
	{
			
		db.db('gaurav').collection('users').find().toArray(function(err,result)
		{
			if(err) throw err;

			response.status(200).json(result);
		})
	}
})
});




app.get("/getCourses",function(request,response)
{

MongoClient.connect(mongourl,function(err,db)
{
	if(err) throw err;
	else
	{
		db.db('gaurav').collection('Courses').find().toArray(function(err,result)
		{
			if(err) throw err;

			response.status(200).json(result);
		})
	}
})
});


app.get("/user",function(request,response)
{
	MongoClient.connect(mongourl,function(err,db)
	{
		if(err)
			 throw err;
		else
		{
			db.db('gaurav').collection('users').find({}).toArray(function(err,result)
			{
				
					if(err) throw err;
					else
					{
						response.status(200).json(result);
					}
			});
		}
	});


});

app.get("/UsersList",function(request,response)
{
	response.status(200).sendFile(path.join(__dirname,"public","usersList.html"))
});

app.get("/getusers",function(request,response)
{
	MongoClient.connect(mongourl,function(err,db)
	{
		if(err)throw err;
		db.db('gaurav').collection('users').find().toArray(function(err,results)
		{
			if(err)throw err;
			response.status(200).json(results);
			
		})
	})

});

app.get("/questionsList",function(request,response)
{

	MongoClient.connect(mongourl,function(err,db)
{
	if(err) throw err;
	else
	{

			var query={courseId:course,
			sectionId:section
			};
			
		db.db('gaurav').collection('Questions').find(query).toArray(function(err,result)
			{
				if(err) throw err;
			
			response.status(200).json(result);
		})
	}
})
	
})

app.get("/CodingquestionsList",function(request,response)
{
MongoClient.connect(mongourl,function(err,db)
{
	if(err) throw err;
	else
	{

			var query={courseId:course,
			sectionId:section,
			questionType:"Coding"
			};
			//console.log(query);
			
		db.db('gaurav').collection('CodingQuestions').find(query).toArray(function(err,result)
			{
				if(err) throw err;

			//console.log("result "+result);
			response.status(200).json(result);
		})
	}
})

})



app.post("/getCodingData",function(request,response)
{
	var data=request.body;

	MongoClient.connect(mongourl,function(err,db)
	{
		if(err) throw err;
		else
		{
			

var query={
	"courseId":data.courseId,
	"sectionId":data.sectionId,
	"queId":data.QuestionID
};
			//console.log("data"+query);
			db.db('gaurav').collection('CodingQuestions').find(query).toArray(function(err,objs)
			{
				if(err)throw err;
				//console.log("objs"+objs[0].questitle);
					
				response.status(200).json(objs);
						
			});
		}
	})
	
	
	
});

app.post("/sendCourseSection",function(request,response)
{
	var data=request.body;
	//console.log("hud0"+data);
	course=data.courseId;
	section=data.sectionId;
	console.log("course:"+course);
	console.log("section:"+section);
	var a=new Object();
	a.msg="done";
	response.status(200).json(a);
})


app.post("/course",function(request,response)
{
	var data=request.body;
	
	MongoClient.connect(mongourl,function(err,db)
	{
		if(err) throw err;
		else
		{
			db.db('gaurav').collection('Courses').find().toArray(function(err,objs)
			{
				if(err)throw err;
				
					if(objs.length>0)
					{

						data.Courseid=parseInt(parseInt(objs[objs.length-1].Courseid)+1);
					}

								db.db('gaurav').collection('Courses').insert(data,function(err,results)
						{
							var a =new Object();
							
							if(err)
							{ 
								a.msg="SERVER  ERROR";
								throw err;
							}
							else
							{
								a.msg="added";
								a.data=data;
								console.log("data inserted");
							}
							response.json(a);
						})
			});
		}
	})
})

app.post("/course",function(request,response)
{
	var data=request.body;
	
	MongoClient.connect(mongourl,function(err,db)
	{
		if(err) throw err;
		else
		{
			db.db('gaurav').collection('Courses').find().toArray(function(err,objs)
			{
				if(err)throw err;
				
					if(objs.length>0)
					{

						data.Courseid=parseInt(parseInt(objs[objs.length-1].Courseid)+1);
					}

								db.db('gaurav').collection('Courses').insert(data,function(err,results)
						{
							var a =new Object();
							
							if(err)
							{ 
								a.msg="SERVER  ERROR";
								throw err;
							}
							else
							{
								a.msg="added";
								a.data=data;
								console.log("data inserted");
							}
							response.json(a);
						})
			});
		}
	})
})

app.post("/EditQuestion",function(request,response)
{
	var data=request.body;
	//console.log(data);
	var collectTable="";
	if(data.questionType=="Coding")
		collectTable="CodingQuestions";
	else
		collectTable="Questions";



	MongoClient.connect(mongourl,function(err,db)
	{		
		
				 var query={"queId":data.queId
				 	,"sectionId":data.sectionId
				 	,"courseId":data.courseId};
				// console.log(query);

		
								db.db('gaurav').collection(collectTable).update(query,data,function(err,results)
						{
							var a =new Object();
							
							if(err)
							{ 
								a.msg="SERVER  ERROR";
								throw err;
							}
							else
							{
								a.msg="updated";
								a.data=data;
								console.log("data UPdated");
							}
							response.json(a);
						})				
			});
});

	
	app.post("/DeleteQuestion",function(request,response)
{
	var data=request.body;
	var collectTable="";

	if(data.questionType=="Coding")
		collectTable="CodingQuestions";
	else
		collectTable="Questions";

	MongoClient.connect(mongourl,function(err,db)
	{		
		
				 var query={"queId":data.queId
				 	,"courseId":data.courseId
				 ,"sectionId":data.sectionId};

				console.log(query);		
				console.log(collectTable);

								db.db('gaurav').collection(collectTable).deleteOne(query,function(err,results)
						{

							var a =new Object();
							if(err)
							{ 
								a.msg="SERVER  ERROR";
								throw err;
							}
							else
							{
								a.msg="deleted";
								a.data=data;
								console.log("data deleted");
							}
							response.json(a);
						})
					
			});
});
	



app.post("/sendCourseid",function(request,response)
{
	var data=request.body;
	
	course=data.courseid;
	console.log(course+"course");
})

app.post("/addsection",function(request,response)
{
	var data=request.body;
	console.log(data);
	course=data.courseid;
	MongoClient.connect(mongourl,function(err,db)
	{
		if(err) throw err;
		else
		{
			
			db.db('gaurav').collection('Sections').find().toArray(function(err,objs)
			{
				if(err)throw err;
				
					if(objs.length>0)
					{

						data.sectionid=parseInt(parseInt(objs[objs.length-1].sectionid)+1);
					}

								db.db('gaurav').collection('Sections').insert(data,function(err,results)
						{
							var a =new Object();
							
							if(err)
							{ 
								a.msg="SERVER  ERROR";
								throw err;
							}
							else
							{
								a.msg="added";
								a.data=data;
								console.log("data inserted");
							}
							response.json(a);
						})
					
				

				
			});
		}
	})
})



app.post("/addquestion",function(request,response)
{
	var data=request.body;
	//console.log(data);
	if(data.questionType=="Coding")
		collectTable="CodingQuestions";
	else
		collectTable="Questions";
	
	MongoClient.connect(mongourl,function(err,db)
	{
		if(err) throw err;
		else
		{
			
			db.db('gaurav').collection(collectTable).find().toArray(function(err,objs)
			{
				if(err)throw err;
				
						if(objs.length>0)
					{

						data.queId=""+parseInt(parseInt(objs[objs.length-1].queId)+1);
					}

								db.db('gaurav').collection(collectTable).insert(data,function(err,results)
						{
							var a =new Object();
							
							if(err)
							{ 
								a.msg="SERVER  ERROR";
								throw err;
							}
							else
							{
								a.msg="added";
								a.data=data;
								console.log("data inserted");
							}
							response.json(a);
						})
					
				

				
			});
		}
	})
})


app.post("/changepassword",function(request,response)
{
	
	
	var query={
		"emailid":request.body.emailid
	}
	var data=request.body;


	
	
		MongoClient.connect(mongourl,function(err,db)
		{
			if(err) throw err;
			else
			{
				db.db('gaurav').collection('users').update(query,data,function(err,results)
				{
					var a =new Object();
					
					if(err)
					{ 
						a.msg="SERVER  ERROR";
						throw err;
					}
					else
					{
						a.msg="changed";
						a.data=data;
						console.log("password changed");
					}
					response.json(a);
				})
			}
		});
});





app.post("/adduser",function(request,response)
{
	
	var data=(request.body);
	//console.log("data"+data);
	
const output=`<p> You have a new contact request</p>
<h3> contact details</h3>
<ul>
<li> Name:${data.fname}</li>

<li> EmailId:${data.emailid}</li>
<li> Password:${data.password}</li>
<li> Mobile No:${data.mobileno}</li>
</ul>
<h3>Message</h3>
<p>Hi ${data.fname},
you are receiving this email,because you have requested for signup</p>

	`;




var transporter=nodemailer.createTransport(
		{
			host:'mail.gmail.com',
			service:'gmail',
			secure:false,
			auth:{
				
				user:'gauravkochar.gk@gmail.com',
				pass:'25271427'

			},
			tls:{
				rejectUnauthorized:false
			}
		})

		var mailOptions={
			from:'Gaurav Kochar <gauravkochar.gk@gmail.com>',
			to: data.emailid,
			subject: 'LogIn Credentials',
			text:'Hello world!!',
			html:output
		};

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




		MongoClient.connect(mongourl,function(err,db)
		{
			if(err) throw err;
			else
			{
				db.db('gaurav').collection('users').insert(data,function(err,results)
				{
					var a =new Object();
					
					if(err)
					{ 
						a.msg="SERVER  ERROR";
						throw err;
					}
					else
					{
						a.msg="added";
						a.data=data;
						console.log("data inserted");
					}
					response.json(a);
				})
			}
		});
});


app.post("/executeprogram",function(req,response)
{

var accessToken = '36e76863afe1e95e1c5646e5c1aef473';
var endpoint = 'a665735d.compilers.sphere-engine.com';

console.log("submissiondata"+req.body);
console.log("submissiondata"+req.body.sourceCode);
console.log("submissiondata"+req.body.compilerId);
//var submissionData =req.body..submissionData;
//console.log("submissiondata"+submissionData);
var submissionId = 2016;
//console.log(submissionsIds.join());
var data=req.body;
request({
    
   url: 'http://' + endpoint + '/api/v3/submissions?ids=' + submissionId + '&access_token=' + accessToken,
    method: 'POST',
    form: data
}, function (error, res, body) {
    
    if (error) {
        console.log('Connection problem');
    }
    
   // response.status(200).send(res); 
 //console.log(res);
    // process response
   
          
    if (res) {
        if (res.statusCode === 201) {
        	 response.status(200).send(res); 
        			  
        } else {
            if (res.statusCode === 401) {
                console.log('Invalid access token');
            }
        }
    }

});


})


app.listen(3000,function(request,response)
{
console.log("Listening  at 3000");
});