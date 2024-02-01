const { say } = require("../../client");

const info = ({ channel, tags, args, command }) => {
  switch (command) {
    case "commands":
      say(
        channel,
        `🗣️ @${tags.username}, here is that list of commands: https://reppedin.tech/cmds`
      );
      break;
    case "tip":
      say(
        channel,
        `🤑 @${tags.username}, thanks for asking! Here are the deets: https://reppedin.tech/tips`
      );
      break;
    case "socials":
      say(
        channel,
        `📱 @${tags.username}, you wanna get more of us...we knew it! Here you are our socials and ☕ links: https://reppedin.tech/socials`
      );
      break;
    case "recipes":
    case "food":
      say(
        channel,
        `😋 @${tags.username}, here are all the Repped-cipes from the CodeSnax Kitchen! https://reppedin.tech/recipes`
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
      say(channel, `Get 💗 or Gift 🎁 Sub here: https://reppedin.tech/sub`);
      break;
    case "music":
      say(
        channel,
        `@${tags.username}, make your own playlist 🎶: https://reppedin.tech/music`
      );
      break;
    case "timesheet":
      say(
        channel,
        `@${tags.username}, grab your timesheet here 🕝: https://reppedin.tech/timesheet`
      );
      break;
    case "discord":
      say(
        channel,
        `@${tags.username}, our discord is for Twitch Subscribers only. Here is how to join: https://www.instagram.com/reel/C0-CcdCuWer/`
      );
    case "community":
      say(
        channel,
        `@${tags.username}, we have community to meet all your needs! `
      );
      break;
    case "codesnax":
      say(
        channel,
        `@${tags.username}, get the deets on CodeSnax: https://reppedbot.reppedin.tech/#codesnax`
      );
      break;
  }
};

module.exports = { info };
