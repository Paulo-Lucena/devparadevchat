const getElementById = (id) => document.getElementById(id);
const getValue = (element) => element.value.trim();
const setValue = (element, value) => element.value = value;
const createMessageContainer = (containerClass, avatarClass, avatarIcon, message) => {
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

    return messageContainer;
};

const appendMessageContainer = (messageContainer) => {
    const messagesDiv = getElementById('messages');
    const fragment = document.createDocumentFragment();
    fragment.appendChild(messageContainer);
    messagesDiv.appendChild(fragment);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

const displayMessage = (containerClass, avatarClass, avatarIcon, message) => {
    const messageContainer = createMessageContainer(containerClass, avatarClass, avatarIcon, message);
    appendMessageContainer(messageContainer);
};

const displayUserMessage = (message) => {
    displayMessage('user-message-container', 'user-avatar', 'fa-user', message);
};

const displayBotMessage = (message) => {
    displayMessage('bot-message-container', 'bot-avatar', 'fa-robot', message);
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchChatAPI = async (message) => {
    try {
        const response = await fetch('/api/v1/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message}),
        });

        return response.json();
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        throw error;
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const messageInput = getElementById('message-input');
    const message = getValue(messageInput);
    displayUserMessage(message);
    setValue(messageInput, '');
    await sendMessage(message);
};

const sendMessage = async (message) => {
    try {
        const response = await fetchChatAPI(message);
        await delay(1000);
        displayBotMessage(response);
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
};

getElementById('chat-form').addEventListener('submit', handleSubmit);
