
var codingqueslabel=document.getElementById("codingqueslabel");
var questitlelabel=document.getElementById("questitlelabel");
var questiondiv=document.getElementById("questiondiv");
var inputdiv=document.getElementById("inputdiv");

var outputdiv=document.getElementById("outputdiv");
var sampleOutputdiv=document.getElementById("sampleoutputdiv");
var sampleinputlabel=document.getElementById("sampleinputlabel");
var sampleoutputlabel=document.getElementById("sampleoutputlabel");
var editorTextarea=document.getElementById("editorTextarea")

var sampleInputdiv=document.getElementById("sampleInputdiv");
var outputlabel=document.getElementById("outputlabel");
var inputlabel=document.getElementById("inputlabel");


var midright=document.getElementById("midright");
var questiondiv=document.getElementById("quediv");
var optiondiv=document.getElementById("optiondiv");
var queslabel=document.getElementById("queslabel");
var rightAnslabel=document.getElementById("rightAnslabel");
var codingdiv=document.getElementById("codingdiv");
var execute=document.getElementById("execute");
var x=0;
rightAnslabel.setAttribute("style","display:none");
var editor;

$(document).ready(function()
{
	var code=$(".codemirror-textarea")[0];
	 editor=CodeMirror.fromTextArea(code,{
		value: "#test{\n\tposition:absolute;\n\twidth:auto;\n\theight:50px;\n}",
		lineNumbers :true ,
		mode : "css",
		tabSize :5 ,
		extraKeys: {"Ctrl-Space" : "autocomplete"}
	});
});



if(sessionStorage.status=="Codingdiv")
{
codingQuestion();
}
else
	MCQQuestions();



function codingQuestion()
{
	midright.setAttribute("style","display:none");
	codingdiv.setAttribute("style","display:block");
	var obj=new Object();
	obj.courseId=getCourse().courseId;
	obj.sectionId=getSection().sectionId;
	obj.QuestionID=getQuestion().queId;
	console.log(obj);
	$.post("/getCodingData",obj,function(data,text)
{

	if(data.length>0)	
	{
			alert("Data available");
			viewCodingQuestion(data[0]);
	}

	});
}

function viewCodingQuestion(quesobj)
{
questitlelabel.textContent=quesobj.questitle;
codingqueslabel.textContent=quesobj.question;
inputlabel.innerHTML="<b>Input</b><br><br>"+quesobj.quesInput;
outputlabel.innerHTML="<b>Output</b><br><br>"+quesobj.quesOutput;
sampleinputlabel.innerHTML="<b>Sample Input</b><br><br>"+quesobj.SampleInput;
sampleoutputlabel.innerHTML="<b>Sample Output</b><br><br>"+quesobj.sampleoutput;
codeEditorlabel.textContent="Type your code below";

}

execute.addEventListener("click",function(event)
{
	
var sourcecode=editor.getValue();
console.log("sourcecode"+sourcecode);
 
var submissionData =new Object();
submissionData.sourceCode=sourcecode;
submissionData.compilerId=11;



$.post("/executeprogram",submissionData,function(data,text)
{
	//if(data.length>0)
	{
	/*	console.log(data.status);
		console.log(data,status_code);
		console.log(data.signal);
		console.log(data.time);
		console.log(data.memory);
		console.log(data.runtime_info.stdout);*/
	console.log(data);

		alert("data compiled");
	}

});



});







function MCQQuestions()
{
$.get("/questionsList",function(data)
{

if(data.length>0)	
		viewQuestion(data);

});
}

function viewQuestion(quesOBJ)
{
	
	var quesObj=quesOBJ[x];

		h=1;
			rightAnslabel.textContent=quesObj.RightAnswer;
				console.log(rightAnslabel.textContent);
	queslabel.textContent=quesObj.question;
	var Options=[];
	Options[0]=quesObj.opt1;
	Options[1]=quesObj.opt2;
	Options[2]=quesObj.opt3;
	Options[3]=quesObj.opt4;
	for(var i=0;i<4;i++)
	{

				var OptionA=document.createElement('input');
				OptionA.setAttribute("type","radio");
				OptionA.setAttribute("value",h);
				OptionA.setAttribute("name",quesObj.queId);

				
				optiondiv.appendChild(OptionA);

				var optionlbl=document.createElement('label');
				optionlbl.textContent=Options[i];
				h++;
				optiondiv.appendChild(optionlbl);
				Break();
				
	
				
			
	}	
		 var submit=document.createElement("button");
		submit.setAttribute("style","height:30;width:70");
		submit.setAttribute("value","Submit");

		correctlbl=document.createElement('label');
		correctlbl.setAttribute("style","color:blue;");
		correctlbl.setAttribute("style","display:none;");
		correctlbl.textContent="correct ans is "+quesObj.RightAnswer;

		submit.addEventListener("click",function(event)
		{
			var selected=findvalue(quesObj);
			if(selected)
			{
					if(selected==rightAnslabel.textContent)
						alert("rightans");
					else
						correctlbl.setAttribute("style","display:block");
			}
			else
				alert("Select one option");
					
		});
		optiondiv.appendChild(submit);

		Break();
		 var NextButton=document.createElement("button");
		NextButton.setAttribute("style","height:30;width:70");
		NextButton.setAttribute("value","Next");
		optiondiv.appendChild(NextButton);

		NextButton.addEventListener("click",function(event)
		{
			++x;	
			console.log("x="+x);
			if(quesOBJ[x])
			{
				queslabel.textContent="";
				optiondiv.textContent="";
				viewQuestion(quesOBJ);
			}
			else
				alert("finish");
		});
	
		optiondiv.appendChild(correctlbl);
		Break();
		midright.appendChild(optiondiv);
}


function findvalue(ques)
{		
	var f=document.getElementsByName(ques.queId);

		for(var s=0;s<4;s++)
		{
				if(f[s].checked)
				{	
					return f[s].value;
				}
		}	
}


function Break()
{
	var br=document.createElement('br');
		optiondiv.appendChild(br);
		 br=document.createElement('br');
		optiondiv.appendChild(br);
}

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

function getQuestion()
{
	if (!sessionStorage.queId)
	sessionStorage.queId=null;

	 obj1=new Object();
	obj1.queId=(JSON.parse(sessionStorage.queId));
	
return obj1;
}
/*
$(document).ready(function()
{
	var code=$(".codemirror-textarea")[0];
	var editor=CodeMirror.fromTextArea(code,{
		value: "#test{\n\tposition:absolute;\n\twidth:auto;\n\theight:50px;\n}",
		lineNumbers :true ,
		theme : "neo" ,
		mode : "css",
		tabSize :5 ,
		extraKeys: {"Ctrl-Space" : "autocomplete"}
	});
});*/