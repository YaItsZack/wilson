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


// Smart Commands

client.on('message', async msg => {
    if(msg.author.bot){
        return;
    }
    var msgChannel = msg.channel.id;
    var wilsonChannel = `759871076296818708`;
    if(msgChannel != wilsonChannel){
        return;
    }
    var command = net.run(msg.content);
    if(command == "rank"){
        var userId = msg.author.id;
        var guild = msg.guild;
        var member = await guild.members.fetch(`${userId}`);
        var role = member.roles.highest.name;
        msg.reply(`Your highest role is: ${role}`);
    }else if(command == "time"){
        var time = moment().format('hh:mm a');
        msg.reply(`My time is: ${time}`);
    }else if(command == "status"){
        var status = [
            "Nothing much.",
            "Downloading porn.",
            "Watching the chat.",
            "Learning more about humans.",
            "Watching youtube.",
            "Thinking about war.",
            "Thinking about life.",
            "Dying inside.",
            "Crying inside.",
            "Crashing.",
            "Windows updates."
        ];
        var r = Math.floor(Math.random()*status.length);
        msg.reply(status[r]);
    }else if(command == "help"){
        msg.reply("Help soon, please wait.");
    }else{
        var sorrys = [
            "Sorry I don't understand.",
            "No.",
            "Sorry no understand.",
            "Please try something else.",
            "No thanks..",
            "Maybe ask someone else.",
            "I can't do that..",
            "Oof sorry on break.",
            "I'm on my launch.",
            "Hmm.. I'll think about it.",
            "Sure..."
        ];
        var r = Math.floor(Math.random()*sorrys.length);
        msg.reply(sorrys[r]);
    }
});