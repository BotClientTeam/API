module.exports = {
  "Request": (res,code,message)=>{
    res.status(code).json(
      {
        "success": false,
        "error": message
      }
    );
    res.end();
  }
}