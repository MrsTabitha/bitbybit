const { app, BrowserWindow, ipcMain, nativeTheme, Menu, shell } = require('electron');
const path = require('path');
const db = require('./db');

const bcrypt = require('bcryptjs');
const { gerarResposta, obterRespostaGemini } = require(path.join(__dirname, 'src', 'views', 'gemini.js'));

// Configuração do banco de dados
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'senacrs',
    database: 'db_bitbybit'
};

let win;


// Função principal pra criar a janela da aplicação
// Aqui a gente define tamanho, ícone, configurações de segurança e qual HTML será carregado
async function createWindow() {
    // Conectar ao banco de dados


    nativeTheme.themeSource = 'dark'; // força o tema claro (poderia ser 'dark' ou 'system')

    win = new BrowserWindow({
        width: 1000,
        height: 800,
        icon: './src/public/img/icone.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // conecta o preload que define a ponte segura entre main e renderer
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true
        }
    });

    // Define o menu personalizado da aplicação
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));

    // Carrega a tela inicial (index.html)
    win.loadFile(path.join('./src/views/index.html'));
}

// IPC Handlers
ipcMain.handle('register', async (event, { username, email, password }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db('users').insert({ username, email, password: hashedPassword });
        return { success: true, message: 'Usuário registrado com sucesso!' };
    } catch (error) {
        console.error('Erro no registro:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return { success: false, message: 'E-mail já está em uso.' };
        }
        return { success: false, message: 'Erro interno no servidor.' };
    }
});



ipcMain.handle('login', async (event, { email, password }) => {
    try {
        const user = await db('users').where({ email }).first();
        if (!user) return { success: false, message: 'E-mail não encontrado.' };

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            return { success: true, user: { username: user.username, email: user.email } };
        } else {
            return { success: false, message: 'Senha incorreta.' };
        }
    } catch (error) {
        console.error('Erro no login:', error);
        return { success: false, message: 'Erro interno no servidor.' };
    }
});




// Quando o Electron estiver pronto, criamos a janela
app.whenReady().then(() => {
    createWindow();

    // Se o app for reaberto (ex: clicando no ícone do dock no macOS)
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quando o front envia um pedido pra ir pro chat, a gente carrega a página do chat
ipcMain.on('ir-para-chat', () => {
    win.loadFile(path.join(__dirname, 'src', 'views', 'chat.html'));
});

// Fecha a aplicação quando todas as janelas forem fechadas (menos no macOS)
app.on('window-all-closed', async () => {
    await db.destroy();
    console.log('Conexão com o banco finalizada via Knex');

    // Encerra o app de verdade
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


// Handler que chama a função do Gemini pra gerar uma resposta a partir da pergunta
ipcMain.handle('gerar-resposta', async (event, mensagem) => {
    return await obterRespostaGemini(mensagem);
});

// IPC Handlers adicionais para o chat
ipcMain.handle('generateResponse', async (event, message) => {
    try {
        // Aqui você pode integrar com Gemini API ou outra IA
        // Exemplo simples:
        const responses = [
            "Interessante! O que mais você gostaria de saber?",
            "Entendi sua pergunta. Vamos explorar isso juntos.",
            "Ótimo ponto! Aqui está o que penso sobre isso...",
            "Estou processando sua solicitação. Um momento..."
        ];

        // Simula um tempo de resposta
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

        return responses[Math.floor(Math.random() * responses.length)];
    } catch (err) {
        console.error('Erro ao gerar resposta:', err);
        return "Desculpe, ocorreu um erro ao processar sua mensagem.";
    }
});

// Aqui definimos o menu superior da aplicação
// Tem opções como sair, recarregar, abrir ferramentas de desenvolvedor, zoom e ajuda
const template = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            }
        ]
    },
    {
        label: 'Exibir',
        submenu: [
            {
                label: 'Recarregar',
                role: 'reload'
            },
            {
                label: 'Ferramentas do Desenvolvedor',
                role: 'toggleDevTools'
            },
            {
                type: 'separator'
            },
            {
                label: 'Aplicar Zoom',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar o Zoom Padrão',
                role: 'resetZoom'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Docs',
                click: () => shell.openExternal('https://www.electronjs.org/pt/docs/latest/')
            }
        ]
    }
];