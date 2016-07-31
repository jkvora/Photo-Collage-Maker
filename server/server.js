//Require Modules
var express=require("express");
var path=require("path");

//Init Express App
var app=express();


//Use Static Path
app.use(express.static(path.join(__dirname,'../public')));


//Config Port no and Listen Server
var port=process.env.PORT || 3000;
app.listen(port,function(){
	console.log("Application is running at port no:"+ port);
});
