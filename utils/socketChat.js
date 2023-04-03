const users = [];

function messageData(username, text) {
  const d = new Date();
  return {
    username,
    text,
    time: d.toLocaleTimeString(),
  };
}

function joined(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}

function current(id) {
  return users.find((user) => user.id === id);
}

function getRoom(room) {
  return users.filter((user) => user.room === room);
}

function leave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

module.exports = {
  messageData,
  joined,
  current,
  leave,
  getRoom,
};
