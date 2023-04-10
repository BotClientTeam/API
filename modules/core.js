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
    if(!req.body.token) return RestError.Request(res,400,"Token is invalid")

    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(    
      {
        "success": true,
        "data": await Rest.get(req.body.token,"/users/@me/guilds")
      }
    );
    res.end();
  });
}