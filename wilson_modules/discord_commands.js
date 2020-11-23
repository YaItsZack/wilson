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


        // inside a command, event listener, etc.
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Some title')
            .setURL('https://discord.js.org/')
            .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
            .setDescription('Some description here')
            .setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .addField('Inline field title', 'Some value here', true)
            .setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

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