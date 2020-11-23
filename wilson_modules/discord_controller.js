const Discord = require('discord.js');
global.client = new Discord.Client();

const fs = require('fs');
var location = "S:\\zeparadox\\discord\\wilson_key.txt";
fs.readFile(location, 'utf8', function(err, data) {
    if (err) throw err;
    client.login(data);
});

client.on('ready', () => {
  Log(1, `Logged in to discord.` + `\n> Tag: ${client.user.tag}`.rainbow);

  SetPresence("Hacking Pentagon", "dnd");
});

client.on('error', (error) => {
  Log(1, `Had an error.` + `\n> Error: ${error.message}`.rainbow);
});

client.on('guildUnavailable', (guild) => {
  Log(1, `Guild unavailable.` + `\n> ${guild.name} has lost connection, might be a server outage.`.rainbow);
});

client.on('guildUpdate', (oldGuild, newGuild) => {
  Log(1, `Guild update` + `\n> ${oldGuild.name} was changed.`.rainbow);
});

client.on('invalidated', () => {
  Log(1, `Client invalidated.`);
});

client.on('messageDelete', (message) => {
  Log(1, `Message deleted.` + `\n> Message: ${message}`.rainbow);
});

client.on('rateLimit', (info) => {
  Log(1, `Rate limited.` + `\n> timeout: ${info.timeout}`.rainbow);
});

client.on('shardDisconnect', (close, id) => {
  Log(1, `Shard Disconnected`.red);
});

client.on('shardError', (error, number) => {
  Log(1, `Shard Error\n`.red + `> Error: ${error.message}`.red);
});

client.on('shardReady', (id, un) => {
  Log(1, `Shard Ready!`.green);
});

client.on('shardReconnecting', (id) => {
  Log(1, `Shard Reconnecting..`.yellow);
});

client.on('shardResume', (id, repl) => {
  Log(1, `Shard Resumed!`.green);
});

client.on('warn', (info) => {
  Log(1, `Warning\n` + `> ${info}`.rainbow);
});

global.SetPresence = function(n, s){
  client.user.setPresence({
    activity: {
      name: `${n}`,
      type: `PLAYING`
    },
    status: `${s}`,
    afk: false
  })
  .then(()=>{
    Log(1, `Set Presence to: ${n}`);
  })
  .catch((err)=>{
    Log(1, err.message);
  });
}