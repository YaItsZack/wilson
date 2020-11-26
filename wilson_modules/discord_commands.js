client.on('message', async msg => {
    if(msg.author.bot){
        return;
    }
    var msgChannel = msg.channel.id;
    var wilsonChannel = `759871076296818708`;
    if(msgChannel != wilsonChannel){
        return;
    }
    var command = net.run(msg.content.toLowerCase());
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
        // inside a command, event listener, etc.
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle('Commands Database')
            .setAuthor('Wilson help', 'https://zeparadox.com/images/apps.png', 'https://zeparadox.com')
            .setDescription('All the commands wilson can do.')
            .setThumbnail('https://zeparadox.com/images/apps.png')
            .addFields(
                { name: 'rank', value: 'gets your highest rank.', inline: true},
                { name: 'time', value: 'tells you wilsons time.', inline: true},
                { name: 'status', value: 'what is wilson doing?', inline: true },
                { name: 'help', value: 'shows you this message.', inline: true },
                { name: 'unknown command', value: 'if you give him an unknown command he will just say something.', inline: true },
            )
            .setFooter('Updated: 11/22/2020', 'https://zeparadox.com/images/apps.png');
        msg.reply(exampleEmbed);
    }else if(command == "report"){

        var report = await Report();
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Server Report')
            .setAuthor('Wilson server', 'https://zeparadox.com/images/admin.png', 'https://zeparadox.com')
            .setDescription('The server report sir.')
            .setThumbnail('https://zeparadox.com/images/admin.png')
            .addFields(
                { name: 'Processors', value: `${report.count}`, inline: true},
                { name: 'Usages', value: `${report.usage}%`, inline: true},
            )
            .setFooter('Live', 'https://zeparadox.com/images/admin.png');
        msg.reply(exampleEmbed);

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

