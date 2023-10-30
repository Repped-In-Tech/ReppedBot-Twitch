const { say } = require('../../client');
const { getUserTasks, getHelpTasks, updateTask, addTask, deleteTask } = require('./apiCalls.js');

const hustleBot = ({ channel, tags, args, command }) => {
  switch (command) {
    case 'viewtasks':
    case 'viewtask':
      getUserTasks(tags.username).then((data) => {
        // filter the tasks for the incomplete ones
        const notComplete = Object.values(data).filter((task) => !task.isDone);
        // check if there are any incomplete tasks
        if (notComplete.length) {
          const taskList = notComplete.map((item, index) => `${index + 1}: ${item.task}`);
          say(channel, `👀 @${tags.username}, You have a total of ${taskList.length} incomplete tasks: ${taskList.join(', ')}`);
        } else {
          say(channel, `❌ @${tags.username}, You do not have any incomplete tasks! To add a task, enter !addTask YOUR TASK`);
        }
      });
      break;
    case 'viewducks':
    case 'viewduck':
      getHelpTasks().then((data) => {
        // filter the tasks for the incomplete ones
        const ducks = Object.values(data);
        // check if there are any incomplete tasks
        if (ducks.length) {
          const taskList = ducks.map((item, index) => `${index + 1} ${item.username} needs help with: ${item.task}`);
          say(channel, `🦆 @${tags.username}, We have a total of ${taskList.length} Rubber Duck tasks: ${taskList.join(', ')}`);
        } else {
          say(channel, `🥳 @${tags.username}, We do not have any Rubber Duck tasks! We are kicking ass as a community!`);
        }
      });
      break;
    case 'addtask':
    case 'rubberduck':
      addTask(tags.username, args.join(' ')).then(() => {
        say(channel, `📥 @${tags.username}, your ${command === 'rubberduck' ? 'Rubber Duck request' : 'task'} was added!`);
      });
      break;
    case 'deletetask':
      getUserTasks(tags.username).then((data) => {
        // filter the tasks for the incomplete ones
        const notComplete = Object.values(data).filter((task) => !task.isDone);
        // check if there are any incomplete tasks
        if (notComplete.length && Number(args.join('')) && Number(args.join('')) <= notComplete.length) {
          deleteTask(notComplete[Number(args.join('')) - 1].firebaseKey).then(() => {
            say(channel, `🗑️ @${tags.username}, Your task has been deleted. You now have a total of ${notComplete.length - 1} incomplete tasks. To view your tasks, use !viewTasks`);
          });
        } else {
          say(channel, `❌ @${tags.username}, You do not have any incomplete tasks to delete OR you entered an incorrect value! To add a task, enter !addTask YOUR TASK`);
        }
      });
      break;
    case 'edittask':
      const taskNum = Number(args.shift());
      getUserTasks(tags.username).then((data) => {
        // filter the tasks for the incomplete ones
        const notComplete = Object.values(data).filter((task) => !task.isDone);
        // check if there are any incomplete tasks
        if (notComplete.length && Number(taskNum) && Number(taskNum) <= notComplete.length && args.length) {
          updateTask(notComplete[Number(taskNum - 1)].firebaseKey, { task: args.join(' ') }).then(() => {
            say(channel, `🔄 @${tags.username}, Your task has been updated. You have a total of ${notComplete.length} incomplete tasks. To view your tasks, use !viewTasks`);
          });
        } else {
          say(channel, `❌ @${tags.username}, You do not have any incomplete tasks to update OR you entered an incorrect value! To edit a task, enter !editTask [tasknum] [updated task]`);
        }
      });
      break;
    case 'donetask':
      getUserTasks(tags.username).then((data) => {
        // filter the tasks for the incomplete ones
        const notComplete = Object.values(data).filter((task) => !task.isDone);
        // check if there are any incomplete tasks
        if (notComplete.length && Number(args.join('')) && Number(args.join('')) <= notComplete.length) {
          updateTask(notComplete[Number(args.join('')) - 1].firebaseKey, { isDone: true, needsHelp: false, completedAt: Date.now() }).then(() => {
            say(channel, `✅ @${tags.username}, Your task has been marked as complete! You now have a total of ${notComplete.length - 1} incomplete tasks. To view your tasks, use !viewTasks`);
          });
        } else {
          say(channel, `❌ @${tags.username}, You do not have any incomplete tasks to mark as done OR you entered an incorrect value! To mark a task as done, enter !doneTask [task num]`);
        }
      });
      break;
  }
};

module.exports = { hustleBot };
