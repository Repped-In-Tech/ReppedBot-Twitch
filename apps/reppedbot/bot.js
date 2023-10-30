const { client } = require("../../client.js");
const reppedBot = ({ channel, tags, args, command }) => {
  if (command === 'lurk') {
    client.say(channel, `@${tags.username}, thanks for joining the lurk squad ✊🏾! Make sure you are LURKING and 💃🏻 TWORKING 🕺🏻`);
  }
};

module.exports = { reppedBot };
