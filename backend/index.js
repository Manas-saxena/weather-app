const http = require("http");
const fs = require("fs");
const requests = require("requests");

const homeFile = fs.readFileSync("../frontend/index.html" , "utf-8");

const replaceVal = (tempVal , orgVal) =>{

    let temperature =tempVal.replace("{%tempval%}" , (orgVal.main.temp-273.15).toPrecision(4));
    temperature = temperature.replace("{%min%}" , (orgVal.main.temp_min-273.15).toPrecision(4));
    temperature = temperature.replace("{%max%}" , (orgVal.main.temp_max-273.15).toPrecision(4));
    temperature = temperature.replace("{%location%}" , orgVal.name);
    temperature = temperature.replace("{%country%}" , orgVal.sys.country);
    temperature = temperature.replace("{%tempStatus%}" , orgVal.weather[0].main);

    return temperature;
};
const server = http.createServer((req , res)=>{

    if(req.url == "/"){
        requests(
          "https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=21f62b8bb1f209b7abd5e2932898abcb"
        )
          .on("data", function (chunk) {
              const objData = JSON.parse(chunk);
              const arrData = [objData];
            const realTimeData = arrData
              .map((val) => {
                return replaceVal(homeFile, val);
              })
              .join(" ");
            res.write(realTimeData);
          })
          .on("end", function (err) {
            if (err) return console.log("connection closed due to errors", err);

            res.end();
          });
    }
});
server.listen(8000 , "127.0.0.1");