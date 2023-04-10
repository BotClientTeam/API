module.exports = {
  "Request": (res,code,message)=>{
    res.status(code).json(
      {
        "success": false,
        "error": `RequestError: ${message}`
      }
    );
    res.end();
  },
  "DiscordAPI": (res,message)=>{
    res.status(400).json(
      {
        "success": false,
        "error":  `DiscordAPIError: ${message}`
      }
    );
    res.end();
  }
}