document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    const dashboardContainer = document.getElementById('dashboard-container');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterBtn = document.getElementById('show-register');
    const showLoginBtn = document.getElementById('show-login');
    const logoutBtn = document.getElementById('logout-btn');
    const loginMessage = document.getElementById('login-message');
    const registerMessage = document.getElementById('register-message');
    const dashboardUsername = document.getElementById('dashboard-username');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    // Mostrar formulário de registro
    showRegisterBtn.addEventListener('click', () => {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
        loginMessage.textContent = '';
    });

    // Mostrar formulário de login
    showLoginBtn.addEventListener('click', () => {
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
        registerMessage.textContent = '';
    });

    // Submissão do formulário de login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const result = await window.electronAPI.login({ email, password });

            if (result.success) {
                showDashboard(result.user);
            } else {
                showMessage(loginMessage, result.message, false);
            }
        } catch (err) {
            showMessage(loginMessage, 'Erro ao tentar fazer login', false);
            console.error(err);
        }
    });


    // Submissão do formulário de registro
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;



        try {
            const result = await window.electronAPI.register({ username, email, password });

            if (result.success) {
                showMessage(registerMessage, result.message, true);
                registerForm.reset();
            } else {
                showMessage(registerMessage, result.message, false);
            }
        } catch (err) {
            showMessage(registerMessage, 'Erro ao tentar registrar', false);
            console.error(err);
        }
    });

    // Logout
    logoutBtn.addEventListener('click', () => {
        dashboardContainer.style.display = 'none';
        loginContainer.style.display = 'block';
        loginForm.reset();
    });

    // Envio de mensagens no chat
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (!message) return;

        // Exibe a mensagem do usuário
        displayMessage(message, 'user-message');
        chatInput.value = '';

        // Exibe "Pensando..." enquanto aguarda resposta
        const thinkingMsg = displayMessage("Pensando...", 'bot-message');

        try {
            // Solicita resposta ao backend
            const response = await window.api.gerarResposta(message);

            // Atualiza a mensagem com a resposta real
            thinkingMsg.textContent = response;
        } catch (err) {
            thinkingMsg.textContent = "Erro ao obter resposta";
            console.error(err);
        }

        // Rolagem automática para a última mensagem
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    // Mostrar dashboard após login bem-sucedido
    function showDashboard(user) {
        dashboardUsername.textContent = user.username;
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'none';
        dashboardContainer.style.display = 'block';

        // Foca no input do chat quando o dashboard é mostrado
        chatInput.focus();
    }

    // Mostrar mensagens de feedback
    function showMessage(element, message, isSuccess) {
        element.textContent = message;
        element.className = isSuccess ? 'success' : 'error';
    }

    // Exibir mensagens no chat
    function displayMessage(content, className) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', className);
        messageDiv.textContent = content;
        chatMessages.appendChild(messageDiv);

        // Rolagem automática
        chatMessages.scrollTop = chatMessages.scrollHeight;

        return messageDiv;
    }
});