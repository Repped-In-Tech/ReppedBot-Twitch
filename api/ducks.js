export const getHelpTasks = async () => {
  const taskList = await fetch(
    `${process.env.FIREBASE_DB_URL}.json?orderBy="needsHelp"&equalTo=true`
  );
  const data = taskList.json();
  return data;
};
