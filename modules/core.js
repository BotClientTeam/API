const cache = {};

module.exports = async(app)=>{
  const fetch = require("node-fetch");

  const Rest = require("./lib/Rest");
  const RestError = require("./lib/RestError");

  //ステータス
  app.get("/status",(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(    
      {
        "success": true,
        "data": "API is up and running"
      }
    );
    res.end();
  });

  //ログインチェック
  app.post("/check",async(req,res)=>{
    if(!req.body.token) return RestError.Request(res,400,"Token is invalid");

    const data = await fetch("https://discord.com/api/v10/users/@me",{
      "method": "GET",
      "headers": {
        "Content-type": "application/json",
        "user-agent": "DiscordBot (https://node.js.org, v10)",
        "Authorization": `Bot ${req.body.token}`
      }
    }).catch(()=>{})

    res.setHeader("Access-Control-Allow-Origin","*");

    if(data.status === 200){
      res.json(
        {
          "success": true,
          "data": {
            "login": true
          }
        }
      );
    }else{
      res.json(
        {
          "success": true,
          "data": {
            "login": false
          }
        }
      );
    }
    res.end();
  });

  //アカウント取得
  app.post("/account",async(req,res)=>{
    if(!req.body.token) return RestError.Request(res,400,"Token is invalid");

    const data = await Rest.get(req.body.token,"/users/@me");

    if(data.message) return RestError.DiscordAPI(res,data.message);

    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(
      {
        "success": true,
        "data": data
      }
    );
    res.end();
  });

  //ユーザー取得
  app.post("/users/:userId",async(req,res)=>{
    if(!req.body.token||!req.params.userId) return RestError.Request(res,400,"Token or UserID is invalid");

    const data = await Rest.get(req.body.token,`/users/${req.params.userId}`);

    if(data.message) return RestError.DiscordAPI(res,data.message);

    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(
      {
        "success": true,
        "data": data
      }
    );
    res.end();
  });

  //ギルド一覧
  app.post("/guilds",async(req,res)=>{
    if(!req.body.token) return RestError.Request(res,400,"Token is invalid");

    //キャッシュ済み
    if(cache[req.body.token] && Date.now() - cache[req.body.token].time<req.query.cache){
      res.setHeader("Access-Control-Allow-Origin","*");
      res.json(
        {
          "success": true,
          "data": cache[req.body.token].data
        }
      );
      return res.end();
    }

    let guilds = [];
    let guildSize;
    let after;
    do{
      const data = await Rest.get(req.body.token,`/users/@me/guilds?limit=200&with_counts=true${after?`&after=${after}`:""}`);
      if(data.message) return RestError.DiscordAPI(res,data.message);

      guilds = guilds.concat(data);
      after = guilds[guilds.length - 1].id;
      guildSize = data.length;

      await new Promise(resolve=>setTimeout(resolve,50))
    }while(guildSize === 200)

    cache[req.body.token] = {
      data: guilds,
      time: Date.now(),
    };

    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(
      {
        "success": true,
        "data": guilds
      }
    );
    res.end();
  });
  
  //ギルド取得
  app.post("/guilds/:guildId",async(req,res)=>{
    if(!req.body.token||!req.params.guildId) return RestError.Request(res,400,"Token or GuildID is invalid");

    const data = await Rest.get(req.body.token,`/guilds/${req.params.guildId}`);

    if(data.message) return RestError.DiscordAPI(res,data.message);

    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(
      {
        "success": true,
        "data": data
      }
    );
    res.end();
  });

  //ギルドメンバー一覧
  app.post("/guilds/:guildId/members",async(req,res)=>{
    if(!req.body.token||!req.params.guildId) return RestError.Request(res,400,"Token or GuildID is invalid");

    const data = await Rest.get(req.body.token,`/guilds/${req.params.guildId}/members?limit=${req.query.limit||"50"}`);

    if(data.message) return RestError.DiscordAPI(res,data.message);

    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(
      {
        "success": true,
        "data": data
      }
    );
    res.end();
  });

  //ギルドメンバー取得
  app.post("/guilds/:guildId/members/:userId",async(req,res)=>{
    if(!req.body.token||!req.params.guildId||!req.params.userId) return RestError.Request(res,400,"Token, GuildID or UserID is invalid");

    const data = await Rest.get(req.body.token,`/guilds/${req.params.guildId}/members/${req.params.userId}`);

    if(data.message) return RestError.DiscordAPI(res,data.message);

    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(
      {
        "success": true,
        "data": data
      }
    );
    res.end();
  });

  //チャンネル一覧取得
  app.post("/guilds/:guildId/channels",async(req,res)=>{
    if(!req.body.token||!req.params.guildId) return RestError.Request(res,400,"Token or GuildID is invalid");

    const data = await Rest.get(req.body.token,`/guilds/${req.params.guildId}/channels`);

    if(data.message) return RestError.DiscordAPI(res,data.message);

    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(
      {
        "success": true,
        "data": data
      }
    );
    res.end();
  });

  //チャンネル取得
  app.post("/channels/:channelId",async(req,res)=>{
    if(!req.body.token||!req.params.channelId) return RestError.Request(res,400,"Token or ChannelId is invalid");

    const data = await Rest.get(req.body.token,`/channels/${req.params.channelId}`);

    if(data.message) return RestError.DiscordAPI(res,data.message);

    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(
      {
        "success": true,
        "data": data
      }
    );
    res.end();
  });

  //メッセージ一覧
  app.post("/channels/:channelId/messages",async(req,res)=>{
    if(!req.body.token||!req.params.channelId) return RestError.Request(res,400,"Token or ChannelID is invalid");

    const data = await Rest.get(req.body.token,`/channels/${req.params.channelId}/messages`);

    if(data.message) return RestError.DiscordAPI(res,data.message);

    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(
      {
        "success": true,
        "data": data
      }
    );
    res.end();
  });

  //メッセージ取得
  app.post("/channels/:channelId/messages/:messageId",async(req,res)=>{
    if(!req.body.token||!req.params.channelId||!req.params.messageId) return RestError.Request(res,400,"Token, ChannelID or MessageID is invalid");

    const data = await Rest.get(req.body.token,`/channels/${req.params.channelId}/messages/${req.params.messageId}`);

    if(data.message) return RestError.DiscordAPI(res,data.message);

    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(
      {
        "success": true,
        "data": data
      }
    );
    res.end();
  });

  //メッセージ作成
  app.post("/channels/:channelId/message",async(req,res)=>{
    if(!req.body.token||!req.params.channelId||!req.body.message) return RestError.Request(res,400,"Token, ChannelID or Message is invalid");

    const data = await Rest.post(req.body.token,`/channels/${req.params.channelId}/messages`,req.body.message);

    if(data.message) return RestError.DiscordAPI(res,data.message);

    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(
      {
        "success": true,
        "data": data
      }
    );
    res.end();
  });
}
