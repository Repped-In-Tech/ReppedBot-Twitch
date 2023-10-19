// import apps
const { hustleBot } = require('./apps/hustleList/bot.js');
const { mutherDucker } = require('./apps/mutherDucker/bot.js');
const { client } = require('./client.js');
const { appCmdLists } = require('./utils/appCmdLists.js');

client.connect();
client.on('message', (channel, tags, message, self) => {
  if (self || !message.startsWith('!')) return;

  // This command handler example will split a message like this example chat message: !Echo Chat message here into the command "echo" with the arguments [ "Chat", "message", "here" ].
  const args = message.slice(1).split(' ');
  const command = args.shift().toLowerCase();
  const combinedArgs = { channel, tags, args, command };
  
  // check which list of commands the command belongs to so that we know which app to run
  switch(appCmdLists[command]) {
    //call the app and send it all the args so that the app can run
    case 'hustle':
      hustleBot(combinedArgs);
      break;
    case 'mutherDucker':
      mutherDucker(combinedArgs);
      break;
  }
});
