const fetch = require("node-fetch");

const token = "";

fetch("http://localhost/guilds/949862128528027729/members",{
    "method": "POST",
    "headers": {
      "Content-type": "application/json"
    },
    "body": JSON.stringify({
      "token": token,
      "limit": "10",
      "message": {
        "content": "テスト中"
      }
    })
  })
  .then(res=>res.json())
  .then(res=>console.log(res))