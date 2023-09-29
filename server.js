require('dotenv').config();
const tmi = require('tmi.js');

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: 'reppedbot',
		password: 'oauth:my_bot_token'
	},
	channels: [ 'reppedintech' ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	// "Alca: Hello, World!"
	console.log(`${tags['display-name']}: ${message}`);
  client.say(channel, `@${tags.username}, ${message}`);
});
