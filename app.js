const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");


const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("D:/Webdevelopement/sepm/public"));


app.get("/",function(req,res){
    console.log(res.statusCode);
    res.sendFile(__dirname+"/signup.html");
});
app.get("/index",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.get("/signup.html",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.get("/book",function(req,res){
    res.sendFile(__dirname+"/book.html");
});
app.get("/track",function(req,res){
    res.sendFile(__dirname+"/track.html");
});
app.get("/sucess",function(req,res){
    res.sendFile(__dirname+"/sucess.html");
});
app.get("/location",function(req,res){
    const trackid=req.body.id;
    console.log(trackid)
    res.redirect("https://www.google.com/maps/dir/SRM+Institute+of+Science+and+Technology,+Potheri,+SRM+Nagar,+Kattankulathur,+Tamil+Nadu/Apollo+Hospital+Chennai,+Anna+Salai,+Rathna+Nagar,+Teynampet,+Chennai,+Tamil+Nadu/@12.9036474,80.0353264,11.52z/data=!4m14!4m13!1m5!1m1!1s0x3a52f712b82a78d9:0xfdb944a3aee53831!2m2!1d80.044416!2d12.823033!1m5!1m1!1s0x3a526428e96f20d7:0xaf9c77bca70c83fd!2m2!1d80.2451938!2d13.0337169!3e0")
})


app.listen(3000,function(req,res){
    console.log("Server is listening on port 3000");
})