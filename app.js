// GET  Request in API


const express =require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
const port =5000;

// send index.html form
app.get("/", function(req, res){


  res.sendFile(__dirname+"/index.html");
});

// receive the post city name from form and parsed by body-parser [installed] module

app.post("/",function(req,res){
  console.log("Post request received.")
  const query = req.body.cityName;
  const apiKey = '286ae0ceeb0ecf40cf8866783b83c922'
  const units = 'metric'
  const url ='https://api.openweathermap.org/data/2.5/weather?q='+query+'&units='+units+'&appid='+apiKey;
  https.get(url, function(response){
    // console.log(response);
    // console.log(response.statusCode);
    response.on("data", function(data){
      // console.log(data);  //return hexadecimal value (use cryptii)
      const weatherData = JSON.parse(data);
      const temp =weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description
      const icon =weatherData.weather[0].icon;
      // console.log(temp);
      // console.log(weatherDescription); //for list
      res.write("<p>The Temperature in "+query+" is "+temp+" Celsius degree.</p><br>")
      res.write("<h1>Also the weather description is " + weatherDescription+".</h1>")
      res.write("<img src='http://openweathermap.org/img/wn/"+icon+"@2x.png' alt='weather-icon'>")
      res.send();
    });
    });

})


// const object = {
//   name:"Divya",
//   favFood:"EggPuff"
// }
// console.log(JSON.stringify(object));  //




app.listen(port, function(){
  console.log("The server started to run on 5000. port")
})
