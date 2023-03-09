	const input = document.getElementById('Prompt');
const chat = document.getElementById('chat');

input.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    const message = input.value;
    input.value = '';

    const response = await fetch('/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    }).then((response) => response.json());

    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.classList.add('user-message');
    chat.appendChild(messageEl);

    const responseEl = document.createElement('div');
    responseEl.textContent = response;
    //responseEl.classList.add('chatbot-message');
    chat.appendChild(responseEl);
  }
});