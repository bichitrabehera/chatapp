// @ts-nocheck

const johnSelectorBtn = document.querySelector('#bichi-selector');
const janeSelectorBtn = document.querySelector('#abhi-selector');
const chatHeader = document.querySelector('.chat-header');
const chatMessages = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');

let messages = JSON.parse(localStorage.getItem('messages')) || [];

const createChatMessageElement = (message) => {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', message.sender === 'bichi' ? 'blue-bg' : 'gray-bg');
  messageElement.innerHTML = `
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  `;
  return messageElement;
};

window.onload = () => {
  messages.forEach((message) => {
    const messageElement = createChatMessageElement(message);
    chatMessages.appendChild(messageElement);
  });
};

let messageSender = 'bichi';

const updateMessageSender = (name) => {
  messageSender = name;
  chatHeader.innerText = `${messageSender} chatting...;`
  chatInput.placeholder = `Type here, ${messageSender}...;`

  johnSelectorBtn.classList.toggle('active-person', name === 'bichi');
  janeSelectorBtn.classList.toggle('active-person', name === 'abhi');

  /* auto-focus the input field */
  chatInput.focus();
};

johnSelectorBtn.onclick = () => updateMessageSender('bichi');
janeSelectorBtn.onclick = () => updateMessageSender('abhi');

const sendMessage = (e) => {
  e.preventDefault();

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  };

  /* Save message to local storage */
  messages.push(message);
  localStorage.setItem('messages', JSON.stringify(messages));

  /* Add message to DOM */
  const messageElement = createChatMessageElement(message);
  chatMessages.appendChild(messageElement);

  /* Clear input field */
  chatInput.value = '';

  /* Scroll to bottom of chat messages */
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatInputForm.addEventListener('submit', sendMessage);

clearChatBtn.addEventListener('click', () => {
  localStorage.clear();
  messages = [];
  chatMessages.innerHTML = '';
});
