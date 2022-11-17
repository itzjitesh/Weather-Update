const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const config = require("config");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){

var city = req.body.cityName;
var appkey = config.get("appkey");
var unit = "metric";
var url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ appkey +"&units=" + unit;

https.get(url, function(response){
  console.log(response.statusCode);

response.on("data", function(data){
var weatherdata = JSON.parse(data);
var temp = weatherdata.main.temp;
var desc = weatherdata.weather[0].description;
const icon = weatherdata.weather[0].icon;
var imageURL = "http://openweathermap.org/img/wn/"+ icon+ "@2x.png"

// For sending only one line to the client side-

// res.send("<h1>The temp of Delhi is "+ temp + " and the weather is " + desc + ".</h1>");

// When more than one line are needed to be send-
res.write("<p>The weather is " + desc +".</p>");
res.write("<h1>The Temp of "+ city +" is " + temp + ".</h1>");
res.write("<img src =" + imageURL + ">");
res.send();

     });
  });
});


app.listen(3000, function(req, res){
  console.log("The server is up.");
});
