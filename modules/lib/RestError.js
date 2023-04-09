module.exports = {
  "InternalServerError": (res)=>{
    res.status(500).json(    
      {
        "success": false,
        "error": "500 Internal Server Error"
      }
    );
    res.end();
  },
  "NotFound": (res)=>{
    res.status(404).json(
      {
        "success": false,
        "error": "404 Not Fount"
      }
    );
    res.end();
  },
  "BadRequest": (res,message)=>{
    res.status(400).json(
      {
        "success": false,
        "error": message
      }
    );
    res.end();
  }
}