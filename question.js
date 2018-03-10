
var addquestion=document.getElementById("addquestion");
var addoption=document.getElementById("addoption");
var questionType=document.getElementById("questionType");
var SubmitQuestion=document.getElementById("SubmitQuestion");
var Submit2Question=document.getElementById("Submit2Question");
var opt1=document.getElementById("opt1");
var opt2=document.getElementById("opt2");
var opt3=document.getElementById("opt3");
var opt4=document.getElementById("opt4");
var Question=document.getElementById("Question");
var RightAnswer=document.getElementById("RightAnswer");
var coursename=document.getElementById("coursename");
var sectionname=document.getElementById("sectionname");
var questionTable=document.getElementById("questionTable");
var obj,obj1;
getSection();

function getSection()
{
	if (!sessionStorage.sectionId)
	{
	sessionStorage.sectionId =null;	
	sessionStorage.sectionName =null;

	}
	 obj=new Object();
	obj.sectionId=(JSON.parse(sessionStorage.sectionId));
	obj.sectionName=(JSON.parse(sessionStorage.sectionName));
	console.log(obj);
return obj;
}

function getCourse()
{
	if (!sessionStorage.Course)
	{
	sessionStorage.Course =null;
	sessionStorage.courseName =null;
	}
	 obj1=new Object();
	obj1.courseId=(JSON.parse(sessionStorage.Course));
	obj1.courseName=(JSON.parse(sessionStorage.CourseName));

return obj1;
}
sendCourseSection();

function sendCourseSection()
{
	var sendCourseSectionObj= new Object();
	sendCourseSectionObj.courseId=getCourse().courseId;
	sendCourseSectionObj.sectionId=getSection().sectionId;
//console.log(sendCourseSectionObj);
	$.post("/sendCourseSection",sendCourseSectionObj,function(data,text)
	{
		questionsList();
	});

}


initialise();

function tableHeading()
{
		var frow=document.createElement('tr');
		
		var QuestionID=document.createElement('th');
		QuestionID.textContent="QuestionID";
		frow.appendChild(QuestionID);

		var QuestionName=document.createElement('th');
		QuestionName.textContent="QuestionName";
		frow.appendChild(QuestionName);
		
		var Option1=document.createElement('th');
		Option1.textContent="A";
		frow.appendChild(Option1);
		
		var Option2=document.createElement('th');
		Option2.textContent="B";
		frow.appendChild(Option2);
		
		var Option3=document.createElement('th');
		Option3.textContent="C";
		frow.appendChild(Option3);
		
		var Option4=document.createElement('th');
		Option4.textContent="D";
		frow.appendChild(Option4);

		var RightAnswer=document.createElement('th');
		RightAnswer.textContent="RightAnswer";
		frow.appendChild(RightAnswer);
		
		var Edit=document.createElement('th');
		Edit.textContent="Edit";
		frow.appendChild(Edit);
		
		var Delete=document.createElement('th');
		Delete.textContent="Delete";
		frow.appendChild(Delete);

		var preview=document.createElement('th');
		preview.textContent="Preview";
		frow.appendChild(preview);
		
		questionTable.appendChild(frow);
	}	
	

function displayDataInTable(objectarray)
{
	
	var tr=document.createElement('tr');

	var CourseId=document.createElement('td');
		CourseId.textContent=objectarray.courseId;
		CourseId.setAttribute("style","display:none");
		tr.appendChild(CourseId);

	var SectionId=document.createElement('td');
		SectionId.textContent=objectarray.sectionId;
		SectionId.setAttribute("style","display:none");
		tr.appendChild(SectionId);
	
	var id=document.createElement('td');
	id.textContent=objectarray.queId;
	tr.appendChild(id);
	
	var question=document.createElement('td');
	question.textContent=objectarray.question;
	tr.appendChild(question);

	
	
	
	
	var opt11=document.createElement('td');
	opt11.textContent=objectarray.opt1;
	tr.appendChild(opt11);


	var opt22=document.createElement('td');
	opt22.textContent=objectarray.opt2;
	tr.appendChild(opt22);

	var opt33=document.createElement('td');
	opt33.textContent=objectarray.opt3;
	tr.appendChild(opt33);

	var opt44=document.createElement('td');
	opt44.textContent=objectarray.opt4;
	tr.appendChild(opt44);


	var rightAnswer=document.createElement('td');
	rightAnswer.textContent=objectarray.RightAnswer;
	tr.appendChild(rightAnswer);
	
	
	
	var tdBtn=document.createElement('td');
	 var Editbtn=document.createElement("button");
	Editbtn.textContent="Edit"
	Editbtn.addEventListener("click",function(event)
	{
		var tr=event.target.parentNode.parentNode;
		var courseId=tr.childNodes[0].textContent;
		var sectionId=tr.childNodes[1].textContent;
		var QuestionID=tr.childNodes[2].textContent;
		addquestion.setAttribute("style","display:block;");
		addoption.setAttribute("style","display:block;");
		Question.value=tr.childNodes[3].textContent;
		opt1.value=tr.childNodes[4].textContent;
		opt2.value=tr.childNodes[5].textContent;
		opt3.value=tr.childNodes[6].textContent;
		opt4.value=tr.childNodes[7].textContent;
		RightAnswer.value=tr.childNodes[8].textContent;
		SubmitQuestion.setAttribute("style","display:none");
		Submit2Question.setAttribute("style","display:block");
		Submit2Question.addEventListener("click",function(event)
		{
			var obj=fillQuestion(QuestionID);
			
			$.post("/EditQuestion",obj,function(data,text)
			{
					if(data.msg=="updated")
						alert(data.msg);
					else
						alert(date.msg);

					window.location.reload();
			})
		});

	});

	tdBtn.appendChild(Editbtn);
	tr.appendChild(tdBtn);
	
	var tdBtn1=document.createElement('td');
	 var Deletebtn=document.createElement("button");
	Deletebtn.textContent="Delete";
	Deletebtn.addEventListener("click",function(event)
	{

		var tr=event.target.parentNode.parentNode;
		var courseId=tr.childNodes[0].textContent;
		var sectionId=tr.childNodes[1].textContent;
		var QuestionID=tr.childNodes[2].textContent;
		var obj=new Object();
		obj.courseId=courseId;
		obj.sectionId=sectionId;
		obj.queId=QuestionID;


		$.post("/DeleteQuestion",obj,function(data,text)
			{
					if(data.msg=="deleted")
						alert(data.msg);
					else
						alert(date.msg);

					window.location.reload();
			})

	});

	

	tdBtn1.appendChild(Deletebtn);
	tr.appendChild(tdBtn1);

	var tdBtn2=document.createElement('td');
	 var previewbtn=document.createElement("button");
	previewbtn.textContent="Preview";

previewbtn.addEventListener("click",function(event)
	{

		window.location.href="http://127.0.0.1:3000/userdashboard";
		/*var tr=event.target.parentNode.parentNode;
		var courseId=tr.childNodes[0].textContent;
		var sectionId=tr.childNodes[1].textContent;
		var QuestionID=tr.childNodes[2].textContent;
		var obj=new Object();
		obj.courseId=courseId;
		obj.sectionId=sectionId;
		obj.queId=QuestionID;


		$.post("/DeleteQuestion",obj,function(data,text)
			{
					if(data.msg=="deleted")
						alert(data.msg);
					else
						alert(date.msg);

					window.location.reload();
			})*/

	});


	tdBtn2.appendChild(previewbtn);
	tr.appendChild(tdBtn2);
	
	questionTable.appendChild(tr);
}



function fillQuestion(QuestionID)
{
		var obj=new Object();
				obj.queId=QuestionID;
				obj.question=Question.value;
				obj.courseId=getCourse().courseId;
				obj.sectionId=getSection().sectionId;
				obj.questionType="MCQ";
				obj.opt1=opt1.value;
				obj.opt2=opt2.value;
				obj.opt3=opt3.value;
				obj.opt4=opt4.value;
				obj.RightAnswer=RightAnswer.value;
				
				return obj;
}

function questionsList()
{
$.get("/questionsList",function(data)
{
	console.log("data:"+data);
if(data.length>0)
{
	tableHeading();
	for(i=0;i<data.length;i++)
	{
		displayDataInTable(data[i]);

	}
}
});
}




function initialise()
{
	
coursename.value=getCourse().courseName;
sectionname.value=getSection().sectionName;
coursename.readOnly=true;
sectionname.readOnly=true;

}

questionType.addEventListener("change",function(event)
{
	if(questionType.value=="MCQ")
	{
		addquestion.setAttribute("style","display:block");
		addoption.setAttribute("style","display:block;");
	}
	else if(questionType.value=="Coding")
	{
		
		window.location.href="http://127.0.0.1:3000/CodingQuestion";
	}
});


SubmitQuestion.addEventListener("click",function(event)
{
	if(opt1.value==""||opt2.value==""||opt3.value==""||opt4.value==""||Question.value==""||RightAnswer.value=="")
	{
		alert("Fill all the TextFields");
	}
	else if(RightAnswer.value=="1"||RightAnswer.value=="2"||RightAnswer.value=="3"||RightAnswer.value=="4")
	{
				var obj=fillQuestion();
				obj.queId=1;
				$.post("/addquestion",obj,function(data,text)
				{
			alert("Question Submitted");
			window.location.reload();
				});
				
				
	}
	else
	{
		alert("NOTE: Type '1' for First Option  and '2' for Second Option as a RIGHT ANSWER");
	}
});


	


	
	

