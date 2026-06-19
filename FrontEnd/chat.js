/**
 * Chat IA Integration - SITME Metrolínea
 * Handles communication between FrontEnd and app-sistema-ia
 */

document.addEventListener('DOMContentLoaded', () => {
    const chatbotIcon = document.querySelector('.floating-item.chatbot');
    if (!chatbotIcon) return;

    // Prevenir el comportamiento por defecto si es un enlace
    chatbotIcon.addEventListener('click', (e) => {
        e.preventDefault();
        toggleChat();
    });

    // Inyectar el HTML del chat si no existe
    if (!document.getElementById('ia-chat-container')) {
        const chatHTML = `
            <div id="ia-chat-container" class="chat-container">
                <div class="chat-header">
                    <h3>🤖 Asistente SITME</h3>
                    <button class="chat-close" id="close-chat">&times;</button>
                </div>
                <div id="chat-messages" class="chat-messages">
                    <div class="message bot">¡Hola! Soy tu asistente de Metrolínea. ¿En qué puedo ayudarte?</div>
                </div>
                <div class="chat-input-area">
                    <input type="text" id="chat-input" placeholder="Escribe un mensaje..." autocomplete="off">
                    <button id="send-chat" class="chat-send-btn">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    const chatContainer = document.getElementById('ia-chat-container');
    const closeBtn = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-chat');
    const input = document.getElementById('chat-input');
    const messageList = document.getElementById('chat-messages');

    function toggleChat() {
        chatContainer.classList.toggle('open');
        if (chatContainer.classList.contains('open')) {
            input.focus();
        }
    }

    closeBtn.addEventListener('click', toggleChat);

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    async function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        // Limpiar input y añadir mensaje del usuario
        input.value = '';
        addMessage(text, 'user');

        // Mostrar indicador de carga
        const loadingId = addMessage('...', 'bot');

        try {
            const response = await fetch('http://localhost:8080/api/ia/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: text })
            });

            if (!response.ok) throw new Error('Error en el servidor');

            const data = await response.json();
            updateMessage(loadingId, data.response);
        } catch (error) {
            console.error('Chat Error:', error);
            updateMessage(loadingId, 'Lo siento, no puedo conectarme con mi cerebro digital ahora mismo. Por favor, intenta más tarde.');
        }
    }

    function addMessage(text, type) {
        const id = 'msg-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}`;
        msgDiv.id = id;
        msgDiv.textContent = text;
        messageList.appendChild(msgDiv);
        messageList.scrollTop = messageList.scrollHeight;
        return id;
    }

    function updateMessage(id, text) {
        const msgDiv = document.getElementById(id);
        if (msgDiv) {
            msgDiv.textContent = text;
            messageList.scrollTop = messageList.scrollHeight;
        }
    }
});
