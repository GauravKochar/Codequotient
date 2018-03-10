
var loginbtn=document.getElementById('loginbtn');
var usertext=document.getElementById('username');
var userpass=document.getElementById('password');
var loginas=document.getElementById('loginas');

		
		checklogin();

function checklogin()
{
		
loginbtn.addEventListener("click",function(event)
{
	if(loginas.value=="Admin")
	{
		if(usertext.value=="gaurav123"&&userpass.value=="kochar123")
		{
			
			
			window.location.href="http://127.0.0.1:3000/admindashboard";
			
		}
		else
			alert("Username and password is not matching");
		
	}
	else if(loginas.value=="User")
	{
		$.get("/users",function(data)
		{
			var status=0;
				if(data.length>0)
				{
					for(i=0;i<data.length;i++)
					{
						if(usertext.value==data[i].emailid&&userpass.value==data[i].password)
						{
							alert("login Successfully");
							var sessionUserObj=new Object();
							sessionUserObj.emailid=data[i].emailid;
							sessionUserObj.password=data[i].password;
							sessionUserObj.mobileno=data[i].mobileno;
							sessionUserObj.fname=data[i].fname;

							StoreSession(sessionUserObj);
							window.location.href="http://127.0.0.1:3000/userdashboard";
							status=1;
							break;
						}

					}
				}
				if(status==0)
				{
					alert("Username and password is not matching");
				}
		});
	}
	else{

		alert("Something went wrong");
	}

});

}

function StoreSession(sessionUserObj)
{

	sessionStorage.User=JSON.stringify(sessionUserObj);
}