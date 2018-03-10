		var username=1;
	
		var midright=document.getElementById('midright');
		
		var fname=document.getElementById('fname');
		var confirmpass=document.getElementById('confirmpass');
		var password=document.getElementById('password');
		
		var emailid=document.getElementById('eid');
	
		
		var signinbtn=document.getElementById('signinbtn');
		
		var mobileno=document.getElementById('mno');
		
		
  


usersigninbtn();
function usersigninbtn()
{
	
 var labelmsg=document.getElementById('msgid');
  var labelmsgmobile=document.getElementById('labelmsgmobile');


emailid.addEventListener("blur",function(event)
	{
		var status=1;
		var xmlhttp2=new XMLHttpRequest();
						xmlhttp2.onreadystatechange=function()
					{
						if(xmlhttp2.readyState==4&&xmlhttp2.status==200)
						{
							var responsetxt1=JSON.parse(this.responseText);
							
							for(var i=0;i<responsetxt1.length;i++)
							{
								if(emailid.value==responsetxt1[i].emailid)
								{
									status=0;
									break;	
								}
								
							}
							if(status==0)
								{
									
									labelmsg.setAttribute("style","color:red");
									labelmsg.textContent="This Admin is already Exist";
									
								}
								else	{
									labelmsg.setAttribute("style","color:green");
									labelmsg.textContent="Available";
								}
						}	
					}
				
					xmlhttp2.open("GET",'http://127.0.0.1:3000/user',true);
					
					xmlhttp2.send();
			
	});	
	mobileno.addEventListener("blur",function(event)
	{
		  var phoneno = /^\d{10}$/;  
		  
		  if(mobileno.value.match(phoneno))   
		  {
			  mobileno.setAttribute("style","color:green"); 
			  labelmsgmobile.textContent="";
			    labelmsgmobile.setAttribute("style","display:none");
		  }			  
		  else   
		  {
			  labelmsgmobile.setAttribute("style","display:block");
			 labelmsgmobile.textContent="Not Valid";
			  labelmsgmobile.setAttribute("style","color:red"); 
			 mobileno.setAttribute("style","color:red"); 
		  }
			    
	});
signinbtn.addEventListener("click",function(event)
{
		if(fname.value==""||mobileno.value==""||password.value==""||confirmpass.value==""||emailid.value=="")
		{
			alert("Textfield is Empty");
		}
		else if(password.value !=confirmpass.value)
		{
			alert("Your password is not matching");
		}
		else if(labelmsg.textContent=="This User is already added")
			alert("Enter Another Username");
		else if(labelmsgmobile.textContent=="Not Valid")
			alert("Enter correct Mobile No");
		else if(labelmsg.textContent=="Available")
		{
			var obj=new makeobject(fname.value,emailid.value,password.value,mobileno.value);
			$.post('/adduser', obj ,function (data,txt) {

				if(data.msg=="added"){
					
						alert(data.msg);
				}
			else
				alert(data.msg);
			});

			//hidetextinadminform();
			window.location.reload();

		}
			
});

}

function makeobject(fname,emailid,password,mobile)
{
	this.fname=fname;
	this.mobileno=mobile;
	this.password=password;
	this.emailid=emailid;
	
}



 
function hidetextinadminform()
{
	fname.value="";
confirmpass.value="";
password.value="";
mobileno.value="";
emailid.value="";
}




