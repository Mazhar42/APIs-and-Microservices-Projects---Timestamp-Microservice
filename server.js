// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

let result={}
app.get('/api/timestamp/:timestamp',(req,res)=>{
  var timestamp = req.params.timestamp;
  if(timestamp.includes('-')){
    result['unix'] = new Date(timestamp).getTime()
    result['utc'] = new Date(timestamp).toUTCString()
  }else{
    timestamp=parseInt(timestamp)
    result['unix'] = new Date(timestamp).getTime()
    result['utc'] = new Date(timestamp).toUTCString()
  }

  if(!result['unix'] || !result['utc']){
    res.json({error:"Invalid Date"})
  }
  
  res.json(result)
})

app.get('/api/timestamp',(req,res)=>{
 
    result['unix'] = new Date().getTime()
    result['utc'] = new Date().toUTCString()
 
  
  res.json(result)
})