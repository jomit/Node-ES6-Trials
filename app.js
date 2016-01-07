//1)
//console.log("hello world");

//2)
// var http = require('http');
// var port = 8080;
// http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Hello World\n');
// }).listen(port);


//3)
var http = require('http');
var port = 8080;
var express = require("express");
var app = express();

http.createServer(app).listen(port);


//4)
app.get("/",function(request, response){
   response.send("<h1>hello world</h1>"); 
});

// app.get("/api/users", function (req, res) {
//     res.set("Content-Type", "application/json");
//     res.send({ name: "jomit", isValid: true, group: "Admin" });
// })

var ideaController = require("./controllers/ideaController");
ideaController.init(app); 

app.set("view engine","vash");

//5) Add support for static files
//app.use(express.static("/public"));
app.use(express.static(__dirname + "/public"));