const { say } = require("../../client");

const info = ({ channel, tags, args, command }) => {
  switch (command) {
    case 'reppedbot':
      say(channel, `@${tags.username}, access ReppedBot: https://reppedbot.reppedin.tech/`);
      break;
    case "commands":
      say(
        channel,
        `🗣️ @${tags.username}, here is that list of commands: https://reppedbot.reppedin.tech/#commands`
      );
      break;
    case "tip":
      say(
        channel,
        `🤑 @${tags.username}, thanks for asking! Here are the deets: https://reppedbot.reppedin.tech/#support`
      );
      break;
    case "socials":
      say(
        channel,
        `📱 @${tags.username}, you wanna get more of us...we knew it! Here you are our socials and ☕ links: https://reppedbot.reppedin.tech/#socials`
      );
      break;
    case "recipes":
    case "food":
      say(
        channel,
        `😋 @${tags.username}, here are all the Repped-cipes from the CodeSnax Kitchen! https://reppedbot.reppedin.tech/#codesnax`
      );
      break;
    case "shop":
    case "merch":
      say(
        channel,
        `@${tags.username}, getcho Repped Gear 🛍️! https://merch.reppedin.tech`
      );
      break;
    case "prime":
      say(
        channel,
        `🤩 Support Repped in Tech FREE! Watch this video to see how to sub with prime: https://reppedbot.reppedin.tech/#prime`
      );
      break;
    case "sub":
      say(channel, `Get 💗 or Gift 🎁 Sub here: https://www.twitch.tv/subs/reppedschool`);
      break;
    case "music":
      say(
        channel,
        `@${tags.username}, make your own playlist 🎶: https://reppedbot.reppedin.tech/#music`
      );
      break;
    case "timesheet":
      say(
        channel,
        `@${tags.username}, grab your timesheet here 🕝: https://reppedbot.reppedin.tech/#resources`
      );
      break;
    case "discord":
      say(
        channel,
        `@${tags.username}, join the FAM! https://reppedin.tech/community`
      );
      break;
    case "codesnax":
      say(
        channel,
        `@${tags.username}, get the deets on CodeSnax: https://reppedbot.reppedin.tech/#codesnax`
      );
      break;
    case "welcome":
      say(
        channel,
        `Welcome to the Repped Co-Tworking Stream! All music and work. Chat up the community and be sure to join our NEW discord server! <!discord>`
      );
  }
};

module.exports = { info };
