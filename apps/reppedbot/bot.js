const { say } = require('../../client');

const reppedBot = ({ channel, tags, args, command }) => {
  switch (command) {
    case 'lurk':
      say(channel, `@${tags.username}, thanks for joining the lurk squad ✊🏾! Make sure you are LURKING and 💃🏻 TWORKING 🕺🏻`);
      break;
  }
};

module.exports = { reppedBot };
