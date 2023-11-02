const { say } = require('../../client');
const { addToSquad, getSquad, checkIfSquaded, updateSquadMember, deleteFromSquad } = require('./apiCalls');

const reppedBot = ({ channel, tags, args, command }) => {
  switch (command) {
    case 'lurk':
    case 'twork':
      checkIfSquaded(tags.username).then((data) => {
        const squaded = Object.values(data).length;

        if (squaded) {
          const { reppedSquad, firebaseKey } = Object.values(data)[0];
          // if you are on lurksquad already, say so
          if (reppedSquad === `${command}squad`) {
            say(channel, `@${tags.username}, you already repping the ${command} squad. Don't trip! You can't double dip!`);
          } else {
            const payload = { reppedSquad: `${command}squad` };
            updateSquadMember(firebaseKey, payload).then(() => say(channel, `@${tags.username}, You have been switched to the ${command} squad ✊🏾!`));
          }
          // if you are not on lurksquad add to lurk squad and say so
        } else {
          addToSquad(tags.username, `${command}squad`).then(() => say(channel, `@${tags.username}, thanks for joining the ${command} squad ✊🏾!`));
        }
      });
      break;
    case 'unlurk':
    case 'untwork':
      checkIfSquaded(tags.username).then((data) => {
        const squaded = Object.values(data).length;
        const [, splitCmd] = command.split('un');
        if (squaded) {
          const { reppedSquad, firebaseKey } = Object.values(data)[0];
          if (reppedSquad === `${splitCmd}squad`) {
            deleteFromSquad(firebaseKey).then(() => say(channel, `@${tags.username}, you have been removed from the ${splitCmd} squad`));
          } else {
            say(channel, `@${tags.username}, you ain't even on the ${splitCmd} squad...what you tryna do???`);
          }
          // if you are not on lurksquad add to lurk squad and say so
        } else {
          say(channel, `@${tags.username}, you ain't even on the ${splitCmd} squad...what you tryna do???`);
        }
      });
      break;
    case 'lurksquad':
    case 'tworksquad':
      getSquad(`${command}`).then((squadObject) => {
        const squadMembers = Object.values(squadObject).map((item) => `@${item.username}`);
        squadMembers.length ? say(channel, `${command === 'lurksquad' ? '🫣 LURK SQUAD' : '💃🏻🕺🏻 TWORK SQUAD'}: ${squadMembers.length >= 1 ? squadMembers.join(', ') : squadMembers[0]}`) : say(channel, `No one is ${command === 'lurksquad' ? 'LURKING' : 'TWORKING'}!`);
      });
      break;
  }
};

module.exports = { reppedBot };
