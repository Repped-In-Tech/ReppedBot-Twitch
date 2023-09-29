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

const calcAge = (yearBorn) => {
  return 2023 - yearBorn;
}

client.on('message', (channel, tags, message, self) => {
	if(self || !message.startsWith('!')) return;

  // This command handler example will split a message like this example chat message: !Echo Chat message here into the command "echo" with the arguments [ "Chat", "message", "here" ].
  const args = message.slice(1).split(' ');
	const command = args.shift().toLowerCase();

	if(command === 'age') {
		client.say(channel, `@${tags.username}, you are ${calcAge(Number(args.join(' ')))} years old! `);
	}
});
