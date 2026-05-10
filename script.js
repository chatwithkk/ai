const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("message");
const chatArea = document.getElementById("chatArea");
const welcomeBox = document.getElementById("welcomeBox");
const newChatBtn = document.getElementById("newChat");

/* SEND MESSAGE */

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

async function sendMessage() {

  const text = messageInput.value.trim();

  if (!text) return;

  /* HIDE WELCOME */

  welcomeBox.style.display = "none";

  /* USER MESSAGE */

  const userMsg = document.createElement("div");

  userMsg.className = "message user";

  userMsg.innerText = text;

  chatArea.appendChild(userMsg);

  messageInput.value = "";

  chatArea.scrollTop = chatArea.scrollHeight;

  /* LOADING MESSAGE */

  const botMsg = document.createElement("div");

  botMsg.className = "message bot";

  botMsg.innerText = "Typing...";

  chatArea.appendChild(botMsg);

  chatArea.scrollTop = chatArea.scrollHeight;

  try {

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text
      })
    });

    const data = await response.json();

    botMsg.innerText = data.reply;

  } catch (error) {

    botMsg.innerText =
      "Error getting response.";

  }

  chatArea.scrollTop = chatArea.scrollHeight;
}

/* NEW CHAT */

newChatBtn.addEventListener("click", () => {

  chatArea.innerHTML = `
  
    <div class="welcome" id="welcomeBox">

      <h1>👋 Hello</h1>

      <p>Ask me anything...</p>

    </div>
  
  `;

});