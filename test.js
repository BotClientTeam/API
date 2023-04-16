const fetch = require("node-fetch");

const token = "";

fetch("http://localhost/guilds/949862128528027729/members?limit=10",{
    "method": "POST",
    "headers": {
      "Content-type": "application/json"
    },
    "body": JSON.stringify({
      "token": token,
      "message": {
        "content": "テスト中"
      }
    })
  })
  .then(res=>res.json())
  .then(res=>console.log(res))