const express = require("express");
const app = express();

app.listen(80,()=>{
  console.log(`\x1b[34m Starting API Successed.\x1b[39m`);
});


process.on("uncaughtException",async(error)=>{
  console.error(`\x1b[31m ${error.stack}\x1b[39m`);
});

process.on("unhandledRejection",async(error)=>{
  console.error(`\x1b[31m ${error.stack}\x1b[39m`);
});