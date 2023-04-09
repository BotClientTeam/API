const fetch = require("node-fetch");

const token = "";

fetch("http://localhost/guilds",{
    "method": "POST",
    "headers": {
      "Content-type": "application/json"
    },
    "body": JSON.stringify({
      "token": token
    })
  })
  .then(res=>res.json())
  .then(res=>console.log(res))