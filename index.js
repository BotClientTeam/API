const express = require("express");
const app = express();

app.listen(80,()=>{
  console.log(`\x1b[34m Starting API Successed.\x1b[39m`);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

require("./v1/core")(app);

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
  res.status(404).json(
    {
      "success": false,
      "error": "404 Not Fount"
    }
  );
  res.end();
});

app.use((err,req,res)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.status(500).json(    
    {
      "success": false,
      "error": "500 Internal Server Error"
    }
  );
  res.end();
});

process.on("uncaughtException",async(error)=>{
  console.error(`\x1b[31m ${error.stack}\x1b[39m`);
});

process.on("unhandledRejection",async(error)=>{
  console.error(`\x1b[31m ${error.stack}\x1b[39m`);
});