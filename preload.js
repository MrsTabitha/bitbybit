const { contextBridge, ipcRenderer } = require('electron');

// Essa parte aqui é pra expor uma interface segura entre o processo principal e o renderizador.
// A ideia é que o front (HTML/JS) só consiga acessar essas funções específicas, e nada além disso.
contextBridge.exposeInMainWorld('api', {



    // Envia um sinal para mudar a tela para o chat. Não espera resposta, só dispara o evento.
    redirecionarParaChat: () => ipcRenderer.send('ir-para-chat'),

    // Envia uma mensagem para o Gemini gerar uma resposta, e espera essa resposta de volta.
    gerarResposta: (mensagem) => ipcRenderer.invoke('gerar-resposta', mensagem),
});

contextBridge.exposeInMainWorld('electronAPI', {
    register: (data) => ipcRenderer.invoke('register', data),
    login: (data) => ipcRenderer.invoke('login', data),
    generateResponse: (message) => ipcRenderer.invoke('generateResponse', message)
});

