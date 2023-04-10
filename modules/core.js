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

  app.post("/guilds/:id",async(req,res)=>{
    if(!req.body.token||!req.params.id) return RestError.Request(res,400,"Token or ID is invalid");

    const data = await Rest.get(req.body.token,`/guilds/${req.params.id}`);

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