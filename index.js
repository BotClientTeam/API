const express = require("express");
const app = express();

const RestError = require("./modules/lib/RestError")

app.listen(80,()=>{
  console.log(`\x1b[34m Starting API Successed\x1b[39m`);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

require("./modules/core")(app);

app.get("/",(req,res)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.json(    
    {
      "success": true,
      "data": "This is the BotClientAPI"
    }
  );
  res.end();
});

app.use((req,res)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  RestError.Request(res,404,"Not Found");
});

app.use((err,req,res)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  RestError.Request(res,500,"Internal Server Error");
});

process.on("uncaughtException",async(error)=>{
  console.error(`\x1b[31m ${error.stack}\x1b[39m`);
});

process.on("unhandledRejection",async(error)=>{
  console.error(`\x1b[31m ${error.stack}\x1b[39m`);
});