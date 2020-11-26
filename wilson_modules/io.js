//
// This runs local only.
// Cannot figure out the cert.
//

Log(4, "Loading io..");
const io = require('socket.io')({
  serveClient: false,
});
const server = require('http').createServer();
Log(4, "io server using http.");
server.listen(3000);
Log(4, "io listening on 3000.");