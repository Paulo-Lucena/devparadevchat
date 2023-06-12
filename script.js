document.getElementById('chat-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();

  if (message !== '') {
    displayUserMessage(message);
    messageInput.value = '';
    sendMessage(message);
  }
});

function displayUserMessage(message) {
  const messagesDiv = document.getElementById('messages');
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message-container', 'user-message-container');

  const userAvatar = document.createElement('div');
  userAvatar.classList.add('avatar', 'user-avatar');
  userAvatar.innerHTML = '<i class="fas fa-user"></i>';

  const messageBubble = document.createElement('div');
  messageBubble.classList.add('message-bubble', 'user-message-bubble');
  messageBubble.textContent = message;

  messageContainer.appendChild(userAvatar);
  messageContainer.appendChild(messageBubble);
  messagesDiv.appendChild(messageContainer);

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function displayBotMessage(message) {
  const messagesDiv = document.getElementById('messages');
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message-container', 'bot-message-container');

  const botAvatar = document.createElement('div');
  botAvatar.classList.add('avatar', 'bot-avatar');
  botAvatar.innerHTML = '<i class="fas fa-robot"></i>';

  const messageBubble = document.createElement('div');
  messageBubble.classList.add('message-bubble', 'bot-message-bubble');
  messageBubble.textContent = message;

  messageContainer.appendChild(botAvatar);
  messageContainer.appendChild(messageBubble);
  messagesDiv.appendChild(messageContainer);

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function sendMessage(message) {
  try {
    //displayBotMessage('Digitando...'); // Exibe uma mensagem indicando que o bot está digitando

    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    // Aguarda um pequeno atraso antes de exibir a resposta do chatbot
    setTimeout(function() {
      displayBotMessage(data.reply);
    }, 1000);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
  }
}
