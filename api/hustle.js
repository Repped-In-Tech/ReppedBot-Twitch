const getUserTasks = async (username) => {
  const taskList = await fetch(
    `${process.env.FIREBASE_DB_URL}.json?orderBy="username"&equalTo="${username}"`
  );
  const data = taskList.json();
  return data;
};

const updateTask = (firebaseKey, payload) => {
  return fetch(`${process.env.FIREBASE_DB_URL}/${firebaseKey}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json());
};

const addTask = (username, task, needsHelp = false) => {
  const payload = {
    username,
    task,
    needsHelp,
    isDone: false,
    createAt: Date.now(),
    completedAt: null,
    firebaseKey: null,
  };
  try {
    return fetch(`${process.env.FIREBASE_DB_URL}.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        const firebaseKey = data.name;
        return updateTask(firebaseKey, { firebaseKey }).then((obj) => obj);
      });
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = (firebaseKey) => {
  return fetch(`${process.env.FIREBASE_DB_URL}/${firebaseKey}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

module.exports = { 
  getUserTasks, 
  updateTask, 
  addTask, 
  deleteTask,
};
