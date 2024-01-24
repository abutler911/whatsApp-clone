const socket = io({
  query: {
    username: username,
  },
});

function appendMessage(type, message) {
  const chatMessages = document.getElementById("chat-messages");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");

  if (type === "user") {
    messageDiv.classList.add("user-message");
    messageDiv.textContent = message;
  } else if (type === "received") {
    messageDiv.classList.add("received-message");
    messageDiv.textContent = message;
  } else {
    messageDiv.classList.add("notification");
    messageDiv.textContent = message;
  }

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Listening for 'message' event from server
socket.on("message", (msg) => {
  appendMessage("notification", msg);
});

document.getElementById("send-message").addEventListener("click", () => {
  const messageBox = document.getElementById("message-box");
  const message = messageBox.value;
  if (message) {
    socket.emit("sendMessage", { username, message });
    appendMessage("user", `You: ${message}`);
    messageBox.value = "";
  }
});

socket.on("receiveMessage", (data) => {
  // Check if the received message is from the current user or others
  if (data.username !== username) {
    appendMessage("received", `${data.username}: ${data.message}`);
  }
});
const messageBox = document.getElementById("message-box");

messageBox.addEventListener("input", () => {
  if (messageBox.value.length > 0) {
    socket.emit("typing", { username: username });
  }
});

socket.on("userTyping", (data) => {
  const typingStatus = document.getElementById("typing-status");
  typingStatus.innerText = `${data.username} is typing...`;
  clearTimeout(typingStatus.timeout);
  typingStatus.timeout = setTimeout(() => {
    typingStatus.innerText = "";
  }, 1000);
});
