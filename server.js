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

client.on('message', (channel, tags, message, self) => {
	if(self) return;

	if(message.toLowerCase() === '!hello') {
		// "@alca, heya!"
		client.say(channel, `@${tags.username}, wut up fool??!`);
	}
});
