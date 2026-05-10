const sendBtn = document.getElementById("send");
const messageInput = document.getElementById("message");
const chatBox = document.getElementById("chat-box");

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

async function sendMessage() {

  const message = messageInput.value.trim();

  if (!message) return;

  // User Message

  const userDiv = document.createElement("div");
  userDiv.className = "user-message";
  userDiv.innerText = message;

  chatBox.appendChild(userDiv);

  messageInput.value = "";

  // Typing Message

  const typingDiv = document.createElement("div");
  typingDiv.className = "ai-message";
  typingDiv.innerText = "Typing...";

  chatBox.appendChild(typingDiv);

  chatBox.scrollTop = chatBox.scrollHeight;

  try {

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message
      })
    });

    const data = await response.json();

    typingDiv.innerText = data.reply;

  } catch (error) {

    typingDiv.innerText = "Something went wrong.";

  }

  chatBox.scrollTop = chatBox.scrollHeight;

}