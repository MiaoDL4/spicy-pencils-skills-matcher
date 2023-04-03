const chatForm = document.querySelector("#input");
const roomName = document.querySelector("#room");
const userList = document.querySelector("#users");
const chatArea = document.querySelector(".chatBox");

const username = document.querySelector("#loggedUser").textContent;
const room = window.location.pathname.replace("/chat/", "");

const socket = io();

socket.emit("joinRoom", { username, room });

socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

socket.on("message", (message) => {
  output(message);
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = event.target.elements.message.value;


  chatArea.scrollTop = chatArea.scrollHeight;

  socket.emit("chatMessage", message);

  event.target.elements.message.value = "";
  event.target.elements.message.focus;
});

function output(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<div>
    <p>${message.username} at ${message.time}</p>
    <p'>
        ${message.text}
    </p>
    </div>`;
    chatArea.appendChild(div);
}

function outputRoomName(room) {
  roomName.innerText = room;
}

function outputUsers(users) {
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.username;
    userList.appendChild(li);
  });
}
