const getSquad = async (squadName) => {
  const squadList = await fetch(
    `${process.env.FIREBASE_DB_URL}/squad.json?orderBy="reppedSquad"&equalTo="${squadName}"`
  );
  const data = squadList.json();
  return data;
};

const checkIfSquaded = async (username) => {
  const squadList = await fetch(
    `${process.env.FIREBASE_DB_URL}/squad.json?orderBy="username"&equalTo="${username}"`
  );
  const data = squadList.json();
  return data;
}

const updateSquadMember = (firebaseKey, payload) => {
  return fetch(`${process.env.FIREBASE_DB_URL}/squad/${firebaseKey}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json());
};

const addToSquad = (username, reppedSquad) => {
  const payload = {
    username,
    reppedSquad,
    firebaseKey: null,
  };
  try {
    return fetch(`${process.env.FIREBASE_DB_URL}/squad.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        const firebaseKey = data.name;
        return updateSquadMember(firebaseKey, { firebaseKey, reppedSquad }).then((obj) => obj);
      });
  } catch (error) {
    console.log(error);
  }
};

const deleteFromSquad = (firebaseKey, squad) => {
  return fetch(`${process.env.FIREBASE_DB_URL}/squad/${firebaseKey}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

module.exports = { 
  getSquad, 
  addToSquad, 
  deleteFromSquad,
  checkIfSquaded,
  updateSquadMember
};
