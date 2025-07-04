require('dotenv').config();

// Importa a biblioteca oficial da Google para usar os modelos generativos (como o Gemini)
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Chave de API do Google Gemini
const API_KEY = process.env.GEMINI_API_KEY;

// Inicializa a instância da API com a chave
const genAI = new GoogleGenerativeAI(API_KEY);

/*Função principal que gera a resposta do Gemini com base no prompt do usuário*/
async function gerarResposta(promptUsuario) {
    // Escolhe o modelo Gemini que será usado
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

    // Adiciona um contexto ao prompt para orientar o modelo a agir como um assistente técnico
    const promptFinal = `Você é um assistente técnico. Responda com clareza e objetividade sobre hardware de computadores. Pergunta: ${promptUsuario}`;

    // Exemplo alternativo de prompt comentado: para recomendar jogos conforme a combinação de hardware
    /* const promptFinal = `Recomende jogos que rodem bem com a combinação ${promptUsuario}. `; */

    // Envia o prompt final para o modelo gerar uma resposta
    const result = await model.generateContent(promptFinal);

    // Aguarda a resposta completa do modelo
    const response = await result.response;

    // Extrai o texto da resposta gerada
    const text = response.text();

    // Retorna o texto gerado ao chamador
    return text;
}

/*Wrapper para chamar gerarResposta*/
async function obterRespostaGemini(pergunta) {
    return await gerarResposta(pergunta);
}

// Exporta as funções para que possam ser usadas em outros arquivos do Electron (como no preload.js ou renderer.js)
module.exports = {
    gerarResposta,
    obterRespostaGemini
};
