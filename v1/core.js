module.exports = async(app)=>{

  //Status
  app.get("/v1/status",(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(    
      {
        "success": true,
        "data": "API v1 is up and running"
      }
    );
    res.end();
  });
}