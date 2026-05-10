const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("message");
const chatArea = document.getElementById("chatArea");
const welcomeBox = document.getElementById("welcomeBox");
const newChat = document.getElementById("newChat");

function addMessage(text, type){
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.innerText = text;
  chatArea.appendChild(div);

  chatArea.scrollTop = chatArea.scrollHeight;
}

sendBtn.onclick = async () => {

  const text = messageInput.value.trim();

  if(!text) return;

  if(welcomeBox){
    welcomeBox.style.display = "none";
  }

  addMessage(text, "user");

  messageInput.value = "";

  const loading = document.createElement("div");
  loading.className = "message bot";
  loading.innerText = "Typing...";
  chatArea.appendChild(loading);

  try{

    const res = await fetch("/api/chat",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({message:text})
    });

    const data = await res.json();

    loading.remove();

    addMessage(data.reply || "No response", "bot");

  }catch(err){

    loading.remove();

    addMessage("Error connecting AI", "bot");
  }
};

newChat.onclick = () => {
  chatArea.innerHTML = `
    <div class="welcome" id="welcomeBox">
      👋 Hello! Ask me anything.
    </div>
  `;
};