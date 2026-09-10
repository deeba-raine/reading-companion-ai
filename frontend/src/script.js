// Grab the elements we need
const thread = document.getElementById('thread');
const input = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

// Add a new chat bubble to the thread
function addBubble(text, type) {
  const bubble = document.createElement('div');
  bubble.className = 'bubble ' + type;
  bubble.textContent = text;
  thread.appendChild(bubble);

  // Auto-scroll to the newest message
  thread.scrollTop = thread.scrollHeight;
}

// Handle sending a message
function sendMessage() {
  const text = input.value.trim();

  // Don't send empty messages
  if (!text) return;

  // Show user's message
  addBubble(text, 'user');
  input.value = '';

  // Fake a reply from the assistant
  setTimeout(function () {
    addBubble("Noted — I'll factor that into your next picks and surface matching passages as you read.", 'assistant');
  }, 500);
}

// Click the send button
sendBtn.addEventListener('click', sendMessage);

// Press Enter in the input field
input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});