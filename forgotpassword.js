var oldpassword=document.getElementById("oldpassword");
var newpassword=document.getElementById("newpassword");
var confirmpassword=document.getElementById("confirmpass");
var labelmsg=document.getElementById('msgid');
var changepasswordbtn=document.getElementById("changepasswordbtn");




 function getsessionUser()
{

if(!sessionStorage.User)
{
	sessionStorage.User=null;

}
return(JSON.parse(sessionStorage.User));
}

oldpassword.addEventListener("blur",function(event)
{

	 var obj=getsessionUser();
	
	if(oldpassword.value==obj.password)
	{
		labelmsg.textContent="Old Password is right";
	}
	else
		labelmsg.textContent="Old Password is not matching";

});

changepasswordbtn.addEventListener("click",function(event)
{
	
	if(oldpassword.value==""||newpassword.value==""||confirmpassword.value=="")
		{
			alert("Textfield is Empty");
		}
		else if(newpassword.value !=confirmpassword.value)
		{
			alert("Your password is not matching");
		}
		else if(labelmsg.textContent=="Old Password is not matching")
			alert("Old password is not matching");
		
		else if(labelmsg.textContent=="Old Password is right")
		{
			var obj=getsessionUser();
			obj.password=confirmpassword.value;
			
			$.post('/changepassword', obj ,function (data,txt) {

				if(data.msg=="changed"){
					
						alert(data.msg);
				}
			else
				alert(data.msg);
			});

			
			window.location.reload();

		}

});
