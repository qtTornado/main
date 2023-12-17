const socket = io();

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("chatHistory", (messages) => {
  const chatBox = document.getElementById("chat-box");
  messages.forEach((message) => {
    const newMessage = document.createElement("div");
    newMessage.innerText = message;
    chatBox.appendChild(newMessage);
  });
});

socket.on("message", (message) => {
  const chatBox = document.getElementById("chat-box");
  const newMessage = document.createElement("div");
  newMessage.innerText = message;
  chatBox.appendChild(newMessage);
});

function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value.trim();

  if (message !== "") {
    socket.emit("message", message);
    messageInput.value = "";
  }
}
