const fs = require('fs');
const server = require('https').createServer({
  key: fs.readFileSync('S:\\zeparadox\\discord\\certs\\privkey.pem'),
  cert: fs.readFileSync('S:\\zeparadox\\discord\\certs\\cert.pem')
});
const options = { 
    cors: {
      origin: "https://zeparadox.com",
      methods: ["GET", "POST"]
    } 
};
global.io = require('socket.io')(server, options);

io.on('connection', (socket) => { 
  Log(4, `Socket connected: ${socket.id}`);
});


async function Send_Data(){
  var report = await Report();
  io.emit("report", report);
  //Log(4, "Sending report to web..");
}
setInterval(Send_Data, 5000);
Log(4, "Repeating task // Send_Data // Started.");
server.listen(3000);
Log(4, "IO Server started on 3000.");