require('dotenv').config();
const tmi = require('tmi.js');

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: process.env.TWITCH_BOT_USERNAME,
		password: process.env.TWITCH_AUTH_TOKEN
	},
	channels: [ 'reppedintech' ]
});
client.connect();


const getUserTasks = async (username) => {
  const taskList = await fetch(`${process.env.FIREBASE_DB_URL}.json?orderBy="username"&equalTo="${username}"`)
  const data = taskList.json();
  return data;
}




client.on('message', (channel, tags, message, self) => {
	if(self || !message.startsWith('!')) return;

  // This command handler example will split a message like this example chat message: !Echo Chat message here into the command "echo" with the arguments [ "Chat", "message", "here" ].
  const args = message.slice(1).split(' ');
	const command = args.shift().toLowerCase();

	if(command === 'viewtasks') {
    getUserTasks(tags.username).then((data) => {
      // filter the tasks for the incomplete ones
      const notComplete = Object.values(data).filter(task => !task.isDone)
      // check if there are any incomplete tasks
      if (notComplete.length) {
        const taskList = notComplete.map((item, index) => `${index +1}: ${item.task}`)
  
        client.say(channel, `@${tags.username}, You have a total of ${taskList.length} incomplete tasks: ${taskList.join(", ")}`);
      } else {
        client.say(channel, `@${tags.username}, You do not have any incomplete tasks! To add a task, enter !addTask YOUR TASK`);
      }
    });
	}
});

