module.exports = async(app)=>{
  const Rest = require("./lib/Rest");
  const RestError = require("./lib/RestError");

  //ステータス
  app.get("/status",(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(    
      {
        "success": true,
        "data": "API v1 is up and running"
      }
    );
    res.end();
  });

  //ギルド一覧
  app.post("/guilds",async(req,res)=>{
    if(!req.body.token) return RestError.Request(res,400,"Token is invalid");

    const data = await Rest.get(req.body.token,"/users/@me/guilds");

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