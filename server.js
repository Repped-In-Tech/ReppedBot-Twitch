const { hustleBot } = require("./apps/hustleList/bot.js");
const { client } = require("./client.js");

const cmdLists = {
  hustle: ['viewtasks', 'viewtask', 'addtask', 'edittask', 'deletetask', 'donetask', 'viewducks', 'viewduck','rubberduck'],
  ai: ['reppedbot'],
};

client.connect();

client.on("message", (channel, tags, message, self) => {
  if (self || !message.startsWith("!")) return;

  // This command handler example will split a message like this example chat message: !Echo Chat message here into the command "echo" with the arguments [ "Chat", "message", "here" ].
  const args = message.slice(1).split(" ");
  const command = args.shift().toLowerCase();
  const combinedArgs = {channel, tags, args, command};
  // TODO: 1. check which list of commands the command belongs to so that we know which app to run

  // TODO: 2. Call the app and send it all the args so that the app can run
  hustleBot(combinedArgs);
});
