// const socket = io({ query: { username: username } });

// socket.on("message", (message) => {
//   const chatMessages = document.getElementById("chat-messages");
//   const messageElement = document.createElement("div");
//   messageElement.classList.add("message");
//   messageElement.textContent = message;
//   chatMessages.appendChild(messageElement);

//   // Auto-scroll to the latest message
//   chatMessages.scrollTop = chatMessages.scrollHeight;
// });

// // Function to emit a chatMessage event
// function sendMessage() {
//   const msg = document.getElementById("message-box").value;
//   socket.emit("chatMessage", msg);
// }

// // Example: Sending a message when the user submits a form
// // Adjust this according to how your form is set up
// document.getElementById("message-form").addEventListener("submit", (e) => {
//   e.preventDefault();

//   sendMessage();
//   e.target.elements.message.value = "";
//   e.target.elements.message.focus();
// });
