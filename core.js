//
// Wilson
//

//
// For cert
// https://git.rootprojects.org/root/greenlock-express.js
//

console.log("[Boot] Wilson Starting..");

require('./wilson_modules/wilson_utilities.js');
Log(0, "Utilities loaded.");

require('./wilson_modules/discord_controller.js');
Log(0, "Discord module loaded.");

require('./wilson_modules/discord_chat.js');
Log(0, "Discord chat module loaded.");

require('./wilson_modules/server_info.js');
Log(0, "Server Info module loaded.");

require('./wilson_modules/ai.js');
Log(0, "Mod AI loaded.");

require('./wilson_modules/readline.js');
Log(0, "Read line interface loaded.");

require('./wilson_modules/internal_commands.js');
Log(0, "Internal Commands loaded.");

require('./wilson_modules/io.js');
Log(0, "Socket IO loaded.");