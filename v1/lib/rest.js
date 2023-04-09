const fetch = require("node-fetch");

module.exports = {
    get:async(token,url)=>{
        if(!token||!url) throw new Error("No url or token in argument");

        return await fetch(url,{
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "user-agent": "DiscordBot (https://node.js.org, v10)",
                "Authorization": `Bot ${token}`
            },
        })
        .then(res=>res.json())
        .catch(error=>{
            throw error;
        })
    },
    post:async()=>{

    }
}