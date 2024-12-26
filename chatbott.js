document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

let userName = "";
let userCity = "";
let otherCity = "";
let step = 0;

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

    if (step === 0) {
        response = "Olá! Qual é o seu nome?";
        step++;
    } else if (step === 1) {
        userName = input;
        response = `Blz ${userName}! Você fala de qual cidade no momento?`;
        step++;
    } else if (step === 2) {
        userCity = input;
        response = `Você mora em ${userCity}? Responda apenas 'sim' ou 'não'.`;
        step++;
    } else if (step === 3) {
        if (userMessage.includes("sim")) {
            response = `Hmm, legal, ${userName} de ${userCity}. Você gosta de morar aí? Responda apenas com 'sim' ou 'não'.`;
            step++;
        } else if (userMessage.includes("não") || userMessage.includes('n') || userMessage.includes('nao')) {
            response = `E onde você mora?`;
            step = 3.1;
        }
    } else if (step === 3.1) {
        otherCity = input;
        response = `Interessante, ${userName}. Como é morar em ${otherCity}? Você gosta de morar lá? Responda com 'sim' ou 'não'.`;
        step++;
    } else if (step === 4) {
        if (userMessage.includes("sim")) {
            response = `Que ótimo saber que você gosta de morar aí! Você gosta de assuntos sobre tecnologia? Responda com 'sim' ou 'não'.`;
            step = 5;  // Atalho para step === 5
        } else if (userMessage.includes("não") || userMessage.includes('n') || userMessage.includes('nao')) {
            response = `Sinto muito que você não gosta de morar aí, mas a vida segue né?.. Espero que as coisas melhorem para você. Você gosta de assuntos sobre tecnologia? Responda com 'sim' ou 'não'.`;
            step = 5;  // Atalho para step === 5
        }
    } else if (step === 5) {
        if (userMessage.includes("sim")) {
            response = `Que legal, vamos falar sobre tecnologia então. Você gosta mais de Computadores ou de Smartphones?`;
            step = 5.1;
        } else if (userMessage.includes("não") || userMessage.includes('n') || userMessage.includes('nao')) {
            response = `Você gosta de cinema? Responda com 'sim' ou 'não'`;
            step = 6.1;
        }
    } else if (step === 5.1) {
        if (userMessage.includes("computadores") || userMessage.includes("pc") || userMessage.includes("computador")) {
            response = `PC de mesa ou notebook?`;
            step = 5.2;
        } else if (userMessage.includes("smartphones") || userMessage.includes("celular") || userMessage.includes("smartphone")) {
            response = `Legal, então você prefere Smartphones, telas móveis são mais práticas, não é?`;
            step = 7;
        }
    } else if (step === 5.2) {
        if (userMessage.includes("pc de mesa") || userMessage.includes("pc") || userMessage.includes("computador")) {
            response = `Ótimo, PCs de mesa são poderosos!`;
            step = 7;
        } else if (userMessage.includes("notebook")) {
            response = `Notebooks são muito práticos!`;
            step = 7;
        }
    } else if (step === 6.1) {
        if (userMessage.includes("sim")) {
            response = `Que legal, qual seu filme preferido?`;
            step = 6.2;
        } else if (userMessage.includes("não") || userMessage.includes('n') || userMessage.includes('nao')) {
            response = `Você gosta de música?`;
            step = 6.4;  // Atalho para step === 6.4
        }
    } else if (step === 6.2) {
        const filme = input;
        response = `Legal, o filme ${filme} é de qual gênero? Suspense, drama, comédia?`;
        step = 6.3;
    } else if (step === 6.3) {
        const tipofilme = input;
        response = `Interessante, você gosta de outros filmes que não sejam deste gênero ${tipofilme}?`;
        if (userMessage.includes("sim")) {
            response = `Legal, que bom que gosta de outros estilos!`;
            step = 7;
        } else if (userMessage.includes("não")) {
            response = `Que pena, outros filmes de outros estilos são muito bons também.`;
            step = 7;
        }
    } else if (step === 6.4) {
        response = `Que legal, qual sua música favorita?`;
        step = 6.5;
    } else if (step === 6.5) {
        const musica = input;
        response = `Legal, a música ${musica} é de qual cantor?`;
        step = 6.6;
    } else if (step === 6.6) {
        const cantor = input;
        response = `Você gosta de outras músicas de ${cantor}?`;
        step = 6.7;
    } else if (step === 6.7) {
        const r1 = input;
        response = 'Legal, até mais!';
        step = 7;
    } else if (step === 7) {
        response = `Legal! Obrigado por compartilhar, ${userName}! Se precisar de mais alguma coisa, estou aqui para ajudar.`;
    }

    setTimeout(() => addMessage("bot", response), 500);
}
