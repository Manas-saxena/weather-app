const http = require("http");
const fs = require("fs");
const requests = require("requests");

const homeFile = fs.readFileSync("../frontend/index.html" , "utf-8");


const server = http.createServer((req , res)=>{

    if(req.url == "/"){
        requests(
          "https://api.openweathermap.org/data/2.5/weather?q=Bareilly&appid=21f62b8bb1f209b7abd5e2932898abcb"
        )
          .on("data", function (chunk) {
              const objData = JSON.parse(chunk);
              const arrData = [objData];
              var temp = arrData[0].main.temp;
              temp = temp - 273.15;
            console.log(temp);
          })
          .on("end", function (err) {
            if (err) return console.log("connection closed due to errors", err);

            console.log("end");
          });
    }
});
server.listen(8000 , "127.0.0.1");