const express = require("express");
const app = express();

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

process.on("uncaughtException",async(error)=>{
  console.error(`\x1b[31m ${error.stack}\x1b[39m`);
});

process.on("unhandledRejection",async(error)=>{
  console.error(`\x1b[31m ${error.stack}\x1b[39m`);
});