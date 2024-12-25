document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

let userName = "";
let waitingForResponse = false;

function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (userInput.trim() !== "") {
        addMessage("user", userInput);
        respondToUser(userInput);
        document.getElementById("userInput").value = "";
    }
}

function addMessage(sender, text) {
    const messagesDiv = document.getElementById("messages");
    const newMessage = document.createElement("div");
    newMessage.classList.add("message");
    newMessage.classList.add(sender === "user" ? "user-message" : "bot-message");
    newMessage.textContent = text;
    messagesDiv.appendChild(newMessage);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function respondToUser(input) {
    let response = "Desculpe, não entendi sua mensagem.";
    const userMessage = input.toLowerCase();

    if (waitingForResponse) {
        if (userMessage.includes("bem")) {
            response = `Que ótimo, ${userName}! Fico feliz em ouvir isso. Como posso ajudar você hoje?`;
            waitingForResponse = false;
        } else if (userMessage.includes("mal")) {
            response = `Sinto muito em ouvir isso, ${userName}. Se quiser conversar sobre algo ou precisar de ajuda, estou aqui para ouvir.`;
            waitingForResponse = false;
        }
    } else {
        if (userMessage.includes("olá") || userMessage.includes("oi") || userMessage.includes("ola") || userMessage.includes("hello")) {
            response = "Olá! Como posso ajudar você hoje? Qual é o seu nome?";
        } else if (userMessage.includes("meu nome é") || userMessage.includes("") || userMessage.includes("me chamo")) {
            userName = input.split(" ").pop(); // Simples extração do nome
            response = `Prazer em conhecê-lo, ${userName}! Como você está hoje?`;
            waitingForResponse = true;
        } else if (userMessage.includes("como você está")) {
            response = `Estou bem, ${userName}. Obrigado por perguntar! E você, como está?`;
            waitingForResponse = true;
        } else if (userMessage.includes("qual é o sentido da vida")) {
            response = `42! Brincadeiras à parte, o sentido da vida depende de cada pessoa. E para você, ${userName}, qual é o sentido da vida?`;
        } else if (userMessage.includes("qual é a sua cor favorita")) {
            response = "Eu sou um chatbot, então não tenho uma cor favorita. Mas gosto de imaginar que seria azul!";
        } else if (userMessage.includes("qual é o seu propósito")) {
            response = `Meu propósito é ajudar você com informações e tarefas, ${userName}. Em que posso ajudar hoje?`;
        } else if (userMessage.includes("me conte uma piada")) {
            response = "Por que o programador foi ao médico? Porque ele tinha um vírus!";
        } else if (userMessage.includes("adeus") || userMessage.includes("tchau")) {
            response = `Adeus, ${userName}! Espero falar com você novamente em breve.`;
        }
    }

    setTimeout(() => addMessage("bot", response), 500);
}
