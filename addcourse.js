var newcourse=document.getElementById("newcourse");
var courseText=document.getElementById("courseText");
var table=document.getElementById("table");
var addcourse=document.getElementById("addcourse");

addcourse.addEventListener("click",function(event)
{
	if(courseText=="")
		alert("Enter a course");
	else
	{
				var obj = new Object();
				obj.Courseid=1;
				obj.Coursename=courseText.value;
				console.log(obj);

			$.post('/course', obj ,function(data,text)
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

$.get('/getCourses',function(data)
{
	if(data.length>0)
	{
		for(i=0;i<data.length;i++)
		{
		addCourseTotable(data[i]);
		}
	}
});


function addCourseTotable(objCourse)
{	
	var tr=document.createElement('tr');
	
	var id=document.createElement('td');
	id.textContent=objCourse.Courseid;
	tr.appendChild(id);
	
	var Coursename=document.createElement('td');
	Coursename.textContent=objCourse.Coursename;
	tr.appendChild(Coursename);

	
	var AddSection=document.createElement('td');
	var Addbtn=document.createElement('button');
	Addbtn.textContent="Add Section";
	
	AddSection.appendChild(Addbtn);
	Addbtn.addEventListener('click',function(event)
	{
		var tr=event.target.parentNode.parentNode;
		console.log(tr);
		 var courseid=tr.childNodes[0].textContent;
		 var courseName=tr.childNodes[1].textContent;
		 console.log(courseid);
		storeCourse(courseid,courseName);
	window.location.href="http://127.0.0.1:3000/sectionpage";
	});
	tr.appendChild(AddSection);
	table.appendChild(tr);

}

function storeCourse(id,courseName)
{
	sessionStorage.Course=JSON.stringify(id);
	//alert(JSON.stringify(id));
	sessionStorage.CourseName=JSON.stringify(courseName);
}


