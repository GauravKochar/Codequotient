var newsection=document.getElementById("newsection");
var sectionText=document.getElementById("sectionText");
var table=document.getElementById("table");
var addsection=document.getElementById("addsection");
var obj;

function getCourse()
{
	
if (!sessionStorage.Course)
{
sessionStorage.Course=null;
}

//console.log(JSON.parse(sessionStorage.Course));
return (JSON.parse(sessionStorage.Course));
}


function storeSection(sectionid,sectionName)
{
	sessionStorage.sectionId=JSON.stringify(sectionid);
	sessionStorage.sectionName=JSON.stringify(sectionName);
	
}



addsection.addEventListener("click",function(event)
{
	if(sectionText=="")
		alert("Enter a section");
	else
	{
				 obj = new Object();
				obj.courseid=getCourse();
				obj.sectionid=1;
				obj.sectionname=sectionText.value;
				console.log(obj);
				
						$.post('/addsection', obj ,function(data,text)
							{
								if(data.msg==="added")
								{								
										alert(data.msg);
								}
								else
								{
									alert(data.msg);
								}
								window.location.reload();
								
							});
				
	}

});
sendCourseid();

function sendCourseid()
{
	var obj=new Object();
	obj.courseid=getCourse();
	console.log(obj);
$.post('/sendCourseid', obj ,function(data,text)
				{
				});
}


$.get('/getsections',function(data)
{
	if(data.length>0)
	{
		for(i=0;i<data.length;i++)
		{
		addSectionTotable(data[i]);
		}
	}
});


function addSectionTotable(objsection)
{	
	var tr=document.createElement('tr');
	
	var id=document.createElement('td');
	id.textContent=objsection.sectionid;
	tr.appendChild(id);
	
	var sectionname=document.createElement('td');
	sectionname.textContent=objsection.sectionname;
	tr.appendChild(sectionname);

	
	var AddQues=document.createElement('td');
	var Addbtn=document.createElement('button');
	Addbtn.textContent="Add Question";
	
	AddQues.appendChild(Addbtn);
	Addbtn.addEventListener('click',function(event)
{
		var tr=event.target.parentNode.parentNode;
		console.log(tr);
		var sectionid=tr.childNodes[0].textContent; 
		var sectionName=tr.childNodes[1].textContent; 
		//alert(sectionid+sectionName);
		storeSection(sectionid,sectionName);
		window.location.href="http://127.0.0.1:3000/questionpage";

});
	tr.appendChild(AddQues);
	table.appendChild(tr);

}
