$(document).ready(function()
{
	var code=$(".codemirror-textarea")[0];
	var editor=CodeMirror.fromTextArea(code,{
		value: "#test{\n\tposition:absolute;\n\twidth:auto;\n\theight:50px;\n}",
		lineNumbers :true ,
		mode : "css",
		tabSize :5 ,
		extraKeys: {"Ctrl-Space" : "autocomplete"}
	});
});