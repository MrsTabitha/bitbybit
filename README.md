# Bit by Bit - Chatbot para UniSenac Pelotas

## 📝 Descrição

O **Bit by Bit** é um projeto de chatbot desenvolvido como parte da Unidade Curricular 10 (Gerenciamento da Configuração & Versionamento de Software) do curso técnico do UniSenac Pelotas. A aplicação consiste em um chatbot de desktop, construído com o framework Electron, que utiliza a inteligência artificial da API do Google Gemini para gerar respostas e interagir com o usuário.

## ✨ Funcionalidades

  * **Interface de Chat:** Interface gráfica simples e intuitiva para interação com o usuário.
  * **Integração com IA:** Respostas dinâmicas e contextuais geradas pela API do Google Gemini.
  * **Testes:** O projeto inclui testes de caixa branca para garantir a qualidade do código.

## 💻 Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

  * **[Node.js](https://nodejs.org/)**: Ambiente de execução JavaScript no backend.
  * **[Electron](https://www.electronjs.org/)**: Framework para criar aplicativos de desktop com JavaScript, HTML e CSS.
  * **[Google Gemini API](https://ai.google.dev/)**: Modelo de linguagem de IA para a geração de respostas do chatbot.
  * **[Knex.js](https://knexjs.org/)**: Construtor de consultas SQL para Node.js.
  
## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto em sua máquina local.

**Pré-requisitos:**

  * Ter o [Node.js](https://nodejs.org/en/download/) instalado.
  * Ter o [Git](https://git-scm.com/downloads) instalado.

**Passos:**

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/MrsTabitha/bitbybit.git
    ```

2.  **Navegue até o diretório do projeto:**

    ```bash
    cd bitbybit
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**

      * Renomeie o arquivo `.env.example` para `.env`.
      * Insira sua chave de API do Google Gemini e os dados de conexão com o banco de dados no arquivo `.env`:

    <!-- end list -->

    ```
    API_KEY=SUA_CHAVE_API_AQUI
    ```

5.  **Inicie a aplicação:**

    ```bash
    npm start
    ```


## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://www.google.com/search?q=LICENSE) para mais detalhes.

## 🙏 Agradecimentos

  * Ao **UniSenac Pelotas** pela oportunidade e pelo conhecimento adquirido durante o curso.
  * À equipe do **Google** por disponibilizar a poderosa API do Gemini.

