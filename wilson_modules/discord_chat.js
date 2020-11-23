client.on('message', msg => {

    Log(1, `New message: ${msg.author.username}` + `\n> ${msg.cleanContent}`.gray);

    if(msg.author.bot){
        return;
    }

    var username = `**${msg.author.username}**`;

    var a = msg.content;
    var b = a.split(" ");

    if(b.length == 1){
        if(b[0].toLowerCase() == "wilson"){
            msg.channel.send(`Hello, ${username}! If you need help please say \`wilson help\`.`);
        }
    }

    if(b.length >= 1){
        if(b[0].toLowerCase() == "wilson"){
            if(b.length >= 2){
                if(b[1].toLowerCase() == "help"){
                    msg.channel.send(`Sorry, ${username} there is no help at the moment.`);
                }else if(b[1].toLowerCase() == "msg"){
                    if(b.length >= 3){
                        var c = b[2];
                        if(getUserFromMention(c) != null){
                            c = getUserFromMention(c);

                            if(b.length >= 4){
                                var d = b;
                                d = d.slice(3);
                                var d = d.join(' ');
                                c.send(d);
                                msg.channel.send(`I have sent your message ${username}.`);
                            }else{
                                msg.channel.send(`${username}, What would you like me to say to **${c.username}**. \`wilson msg ${c.username} hi how are you?\``);
                            }
                        }else{
                            msg.channel.send(`Sorry, ${username} could not find that user.`);
                        }
                    }else{
                        msg.channel.send(`Sorry, ${username} you must mention a user in the discord.`);
                    }
                }else if(b[1].toLowerCase()=="server"){
                    msg.channel.send(`${username}, I run on a ${GetCpuCount()} core server.`);
                }else{
                    msg.channel.send(`Sorry, ${username} I did not understand that.`);
                }
            }
        }
    }
});

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}