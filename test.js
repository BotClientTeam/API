const fetch = require("node-fetch");

const token = "";

fetch("http://localhost/channels/",{
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