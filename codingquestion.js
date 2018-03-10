
var questionTable=document.getElementById("questionTable");
var addtextcases=document.getElementById("addtextcases");
var codingquestiondiv=document.getElementById("codingquestiondiv");
var addcodingquestion=document.getElementById("addcodingquestion");

var questitle=document.getElementById("questitle");
var question=document.getElementById("question");
var quesInput=document.getElementById("quesInput");
var quesOutput=document.getElementById("quesOutput");
var SampleInput=document.getElementById("SampleInput");
var sampleoutput=document.getElementById("sampleoutput");
var editcodingquestion=document.getElementById("editcodingquestion");
/*
$(document).ready(function()
{
	var code=$("#SampleInput")[0];
	 SampleInput=CodeMirror.fromTextArea(code,{
	
	});

	 var code1=$("#sampleoutput")[0];
	 sampleoutput=CodeMirror.fromTextArea(code1,{
		
	
	});


});*/

function fillQuestion()
{
	var obj=new Object();
	obj.courseId=getCourse().courseId;
	obj.sectionId=getSection().sectionId;
	obj.queId="1";
	obj.questionType="Coding";
	obj.questitle=questitle.value;
	obj.question=question.value;
	obj.quesInput=quesInput.value;
	obj.quesOutput=quesOutput.value;
	obj.SampleInput=SampleInput.value;
	
	obj.sampleoutput=sampleoutput.value;

	return obj;
}

CodingquestionsList();

function CodingquestionsList()
{
$.get("/CodingquestionsList",function(data)
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

function tableHeading()
{
	var frow=document.createElement('tr');

	
		
		var QuestionID=document.createElement('th');
		QuestionID.textContent="QuestionID";
		frow.appendChild(QuestionID);

		var QuestionName=document.createElement('th');
		QuestionName.textContent="QuestionName";
		frow.appendChild(QuestionName);
		
		
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
	
	var question1=document.createElement('td');
	question1.textContent=objectarray.questitle;
	tr.appendChild(question1);

	
	
	var tdBtn=document.createElement('td');
	 var Editbtn=document.createElement("button");
	Editbtn.textContent="Edit"
	Editbtn.addEventListener("click",function(event)
	{
		var tr=event.target.parentNode.parentNode;
		var obj=new Object();
		obj.courseId=tr.childNodes[0].textContent;
		obj.sectionId=tr.childNodes[1].textContent;
		obj. QuestionID=tr.childNodes[2].textContent;
		console.log(obj);
		$.post("/getCodingData",obj,function(data,text)
		{
			console.log("daata"+data[0].questitle);

			if(data)
			{
				questitle.value=data[0].questitle;
				 question.value=data[0].question;
				 quesInput.value=data[0].quesInput;
				quesOutput.value=data[0].quesOutput;
				 SampleInput.value=data[0].SampleInput;
				 sampleoutput.value=data[0].sampleoutput;
				  addcodingquestion.setAttribute("style","display:none");
				 editcodingquestion.setAttribute("style","display:block");

			

			}
		})

		
		editcodingquestion.addEventListener("click",function(event)
		{

			var obj1=fillQuestion();
			obj1.queId=obj.QuestionID;

			
			$.post("/EditQuestion",obj1,function(data,text)
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
		var obj=new Object();
		obj.courseId=tr.childNodes[0].textContent;
		obj.sectionId=tr.childNodes[1].textContent;
		obj.queId=tr.childNodes[2].textContent;
		obj.questionType="Coding";


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
		var tr=event.target.parentNode.parentNode;
		sessionStorage.status="Codingdiv";
		sessionStorage.queId=JSON.stringify(tr.childNodes[2].textContent);

		window.location.href="http://127.0.0.1:3000/userdashboard";
		

	});


	tdBtn2.appendChild(previewbtn);
	tr.appendChild(tdBtn2);
	
	questionTable.appendChild(tr);

}

addcodingquestion.addEventListener("click",function(event)
{
	 var obj=fillQuestion();
	$.post("/addquestion",obj,function(data,text)
	{
		alert("Question Submitted");
		window.location.reload();
	})

})

addtextcases.addEventListener("click",function(event)
{
	var div=document.createElement('div');
	var inputtextarea=document.createElement('textarea');
	inputtextarea.setAttribute("placeholder","Sample Input");

div.appendChild(inputtextarea);

	var outputtextarea=document.createElement('textarea');
	outputtextarea.setAttribute("placeholder","Sample Output");
	div.appendChild(outputtextarea);
codingquestiondiv.appendChild(div);

});	

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