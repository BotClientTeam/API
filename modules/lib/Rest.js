const fetch = require("node-fetch");
const BaseURL = "https://discord.com/api/v10"

module.exports = {
  get: async(token,url)=>{
    if(!token||!url) throw new Error("No url or token in argument");

    return await fetch(BaseURL+url,{
      "method": "GET",
      "headers": {
        "Content-type": "application/json",
        "user-agent": "DiscordBot (https://node.js.org, v10)",
        "Authorization": `Bot ${token}`
      }
    })
    .then(res=>res.json())
    .catch(error=>{
        throw error;
    })
  },
  post: async(token,url,body)=>{
    if(!token||!url||!body) throw new Error("No url, token or body in argument");

    return await fetch(BaseURL+url,{
      "method": "POST",
      "headers": {
        "Content-type": "application/json",
        "user-agent": "DiscordBot (https://node.js.org, v10)",
        "Authorization": `Bot ${token}`
      },
      "body": JSON.stringify(body)
    })
    .then(res=>res.json())
    .catch(error=>{
      throw error;
    })
  }
}