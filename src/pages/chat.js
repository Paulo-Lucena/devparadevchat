document.getElementById('chat-form')
    .addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = document.getElementById('message-input').value.trim();

        displayUserMessage(message);
        document.getElementById('message-input').value = '';
        await sendMessage(message);
    });

const displayMessage = (containerClass, avatarClass, avatarIcon, message) => {
    const messagesDiv = document.getElementById('messages');
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container', containerClass);

    const avatar = document.createElement('div');
    avatar.classList.add('avatar', avatarClass);
    avatar.innerHTML = `<i class="fas ${avatarIcon}"></i>`;

    const messageBubble = document.createElement('div');
    messageBubble.classList.add('message-bubble');
    messageBubble.textContent = message;

    messageContainer.appendChild(avatar);
    messageContainer.appendChild(messageBubble);
    messagesDiv.appendChild(messageContainer);

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

const displayUserMessage = (message) => {
    displayMessage('user-message-container', 'user-avatar', 'fa-user', message);
};

const displayBotMessage = (message) => {
    displayMessage('bot-message-container', 'bot-avatar', 'fa-robot', message);
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const sendMessage = async (message) => {
    try {
        const response = await fetch('/api/v1/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message})
        });

        await delay(1000);
        displayBotMessage(await response.json());
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
};
