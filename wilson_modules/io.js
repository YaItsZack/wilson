const fs = require('fs');
const server = require('https').createServer({
  key: fs.readFileSync('./cert/privkey.pem'),
  cert: fs.readFileSync('./cert/cert.pem')
});
const options = { /* ... */ };
const io = require('socket.io')(server, options);

io.on('connection', socket => { console.log(`CONNECTION IO`); });

server.listen(3000);