const { say } = require('../../client');

const reppedBot = ({ channel, tags, args, command }) => {
  switch (command) {
    case 'lurk':
      say(channel, `@${tags.username}, thanks for joining the lurk squad ✊🏾! Make sure you are LURKING and 💃🏻 TWORKING 🕺🏻`);
      break;
    case 'twork':
      say(channel, `@${tags.username}, Oh...so you want err body to know you likes to twork?! Alright, then! Getcho TWORK on den! 💃🏻🕺🏻💃🏻🕺🏻💃🏻🕺🏻💃🏻🕺🏻`);
      break;
  }
};

module.exports = { reppedBot };
