const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const https=require("https");

app.listen(3000,function(){
  console.log("this server is now working on port 3000");
});

app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static(__dirname +'/public'));

/*app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html");
    // console.log(responce.statusCode);
  });*/

app.post("/",function(req,res){

  const query=req.body.cityname;
  const units="metric";
  const appkey="fd563b66f16227fd6d22308566623499";

  const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units="+ units +"&appid="+appkey;

  https.get(url,function(responce){

      responce.on("data",function(data){

      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;

      const newWeather=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const iconurl="http://openweathermap.org/img/wn/" + icon + "@2x.png";
      // app.use('/css',express.static(__dirname +'/public'));
      res.write("<h1>The temp of "+query+" is "+temp+"*C</h1>");

      res.write("<h2>the description weather of "+ query +" is " + newWeather +" </h2>");
      res.write("<img src=" +iconurl+ ">");

      res.send();

    });
  });
});
