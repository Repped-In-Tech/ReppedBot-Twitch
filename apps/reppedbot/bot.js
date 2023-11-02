const { say } = require('../../client');
const { addToSquad, getSquad, checkIfSquaded, updateSquadMember, deleteFromSquad } = require('./apiCalls');

const reppedBot = ({ channel, tags, args, command }) => {
  switch (command) {
    case 'lurk':
      checkIfSquaded(tags.username).then((data) => {
        const squaded = Object.values(data).length;

        if (squaded) {
          const { reppedSquad, firebaseKey } = Object.values(data)[0];
          // if you are on lurksquad already, say so
          if (reppedSquad === 'lurksquad') {
            say(channel, `@${tags.username}, you already repping the lurk squad. Don't trip! You can't double dip!`);
          } else {
            const payload = { reppedSquad: 'lurksquad' };
            updateSquadMember(firebaseKey, payload).then(() => say(channel, `@${tags.username}, You have been switched to the lurk squad ✊🏾! Make sure you are LURKING and 💃🏻 TWORKING 🕺🏻`));
          }
          // if you are not on lurksquad add to lurk squad and say so
        } else {
          addToSquad(tags.username, 'lurksquad').then(() => say(channel, `@${tags.username}, thanks for joining the lurk squad ✊🏾! Make sure you are LURKING and 💃🏻 TWORKING 🕺🏻`));
        }
      });
      break;
    case 'unlurk':
      checkIfSquaded(tags.username).then((data) => {
        const squaded = Object.values(data).length;

        if (squaded) {
          const { reppedSquad, firebaseKey } = Object.values(data)[0];
          // if you are on lurksquad already, say so
          if (reppedSquad === 'lurksquad') {
            deleteFromSquad(firebaseKey)
              .then(() => say(channel, `@${tags.username}, you have been removed from the lurk squad`))
          } else {
            say(channel, `@${tags.username}, you ain't even on the lurk squad...what you tryna do???`);
          }
          // if you are not on lurksquad add to lurk squad and say so
        } else {
          say(channel, `@${tags.username}, you ain't even on the lurk squad...what you tryna do???`);
        }
      });
      break;
    case 'lurksquad':
      getSquad('lurksquad').then((squadObject) => {
        const squadMembers = Object.values(squadObject).map((item) => `@${item.username}`);
        squadMembers.length ? say(channel, `🫣 LURK SQUAD: ${squadMembers.length >= 1 ? squadMembers.join(', ') : squadMembers[0]}`) : say(channel, `No one is LURKING...we all TWORKING!`);
      });
      break;
    case 'twork':
      say(channel, `@${tags.username}, Oh...so you want err body to know you likes to twork?! Alright, then! Getcho TWORK on den! 💃🏻🕺🏻💃🏻🕺🏻💃🏻🕺🏻💃🏻🕺🏻`);
      break;
  }
};

module.exports = { reppedBot };
