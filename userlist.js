var table=document.getElementById('userTable');
var detailtable=document.getElementById('Userdetailtable');

	function tableheading()
	{
		var frow=document.createElement('tr');

		var name=document.createElement('th');
		name.textContent="UserName";
		frow.appendChild(name);

		var UserId=document.createElement('th');
		UserId.textContent="UserId";
		frow.appendChild(UserId);
		
		
		var MobileNO=document.createElement('th');
		MobileNO.textContent="MobileNO";
		frow.appendChild(MobileNO);
		
		var AssignedCourses=document.createElement('th');
		AssignedCourses.textContent="AssignedCourses";
		frow.appendChild(AssignedCourses);
		
		table.appendChild(frow);
	}


	getUser();	
function getUser()
{
	$.get("/getusers",function(data)
	{
		if(data.length>0)
		{
			for(i=0;i<data.length;i++)
			{
				displaydataintable(data[i]);
			}
		}
	})	;
}
	
	
	

function displaydataintable(objectarray)
{
	
	var tr=document.createElement('tr');
	
	var username=document.createElement('td');
	username.textContent=objectarray.fname;
	tr.appendChild(username);
	
	var userid=document.createElement('td');
	userid.textContent=objectarray.emailid;
	tr.appendChild(userid);

	
	var mobileno=document.createElement('td');
	mobileno.textContent=objectarray.mobileno;
	tr.appendChild(mobileno);

	var tdBtn=document.createElement('td');
	 var assignbtn=document.createElement("button");
	  assignbtn.setAttribute("class","detailbtn");
	assignbtn.textContent="Assigned Courses";

	assignbtn.addEventListener("click",function(event)
	{

	});
	
	tdBtn.appendChild(assignbtn);
	
	
	tr.appendChild(tdBtn);
	

	table.appendChild(tr);
	}



	function displaydetailtable(objectarray)
	{
	
	var tr=document.createElement('tr');
	
	var id=document.createElement('td');
	id.textContent=objectarray.odid;
	tr.appendChild(id);
	
	var orderid=document.createElement('td');
	orderid.textContent=objectarray.orderid;
	tr.appendChild(orderid);

	
	
	
	var productid=document.createElement('td');
	productid.textContent=objectarray.productid;
	tr.appendChild(productid);


	var productname=document.createElement('td');
	productname.textContent=objectarray.productname;
	tr.appendChild(productname);
	
	var productquantity=document.createElement('td');
	productquantity.textContent=objectarray.productquantity;
	tr.appendChild(productquantity);
	
	var productprice=document.createElement('td');
	productprice.textContent=objectarray.productprice;
	tr.appendChild(productprice);
	detailtable.appendChild(tr);
}