/**
 * Aplicativo de chat simples usando Express e o classificador Naive Bayes da biblioteca Natural.
 * O aplicativo classifica mensagens de entrada em categorias pré-definidas e retorna uma resposta adequada.
 */

// Importe as bibliotecas necessárias
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const natural = require('natural');
const fs = require('fs');
const csv = require('csv-parser');

// Crie a instância do express e configure as rotas e middlewares
const app = express();
app.use(bodyParser.json());

// Defina a porta em que o servidor irá rodar
const port = 3000;

// Crie uma instância do classificador Naive Bayes
const classifier = new natural.BayesClassifier();

// Caminho para o arquivo CSV de treinamento
const trainingFilePath = 'C:/Users/Dinopc/Desktop/Chat/training_data.csv';


// Função para adicionar exemplos de treinamento a partir do arquivo CSV
function addTrainingDataFromCSV(filePath) {
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      const message = data.message;
      const category = data.category;

      classifier.addDocument(message, category);
    })
    .on('end', () => {
      classifier.train();
      console.log('Treinamento a partir do arquivo CSV concluído.');
    });
}

// Chame a função para adicionar os exemplos de treinamento do arquivo CSV
addTrainingDataFromCSV(trainingFilePath);

/**
 * Função para realizar pré-processamento na mensagem.
 * Remove pontuações e converte para letras minúsculas.
 * @param {string} message - A mensagem a ser pré-processada.
 * @returns {string} - A mensagem pré-processada.
 */

// Função para realizar pré-processamento na mensagem
function preprocessMessage(message) {
  // Remover pontuações
  const processedMessage = message.replace(/[^\w\s]/gi, '');
  // Converter para letras minúsculas
  const lowercaseMessage = processedMessage.toLowerCase();
  // Retornar mensagem pré-processada
  return lowercaseMessage;
}

// Função para processar a mensagem
function processMessage(message) {
  const preprocessedMessage = preprocessMessage(message);
  const classification = classifier.getClassifications(preprocessedMessage)[0];

  if (classification.label === 'cumprimento') {
    const greetings = [
      'Olá! Como posso ajudar?',
      'Oi! Em que posso te auxiliar?',
      'Olá, como posso ser útil?'
    ];
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
  } else if (classification.label === 'data') {
    var dataAtual = new Date();
    var dia = dataAtual.getDate();
    var mes = dataAtual.getMonth() + 1;
    var ano = dataAtual.getFullYear();
    var horas = dataAtual.getHours();
    var minutos = dataAtual.getMinutes();

    return `Hoje é dia ${dia} de ${mes} de ${ano} e o horário é: ${horas}:${minutos}`;
  } else if (classification.label === 'agradecimento') {
    return 'De nada! Estou aqui para ajudar.';
  } else if (classification.label === 'despedida') {
    const farewells = [
      'Até mais! Tenha um ótimo dia.',
      'Até logo! Volte sempre que precisar.',
      'Tchau! Espero ter sido útil.'
    ];
    const randomIndex = Math.floor(Math.random() * farewells.length);
    return farewells[randomIndex];
  } else if (classification.label === 'pergunta') {
    return 'Claro, estou à disposição para responder suas perguntas.';
  } else if (classification.label === 'reserva') {
    return 'Para fazer uma reserva, por favor, entre em contato com nossa equipe de atendimento.';
  } else if (classification.label === 'contato') {
    return 'Você pode entrar em contato conosco pelo telefone (XX) XXXX-XXXX ou pelo email contato@exemplo.com.';
  } else if (classification.label === 'orçamento') {
    return 'Para solicitar um orçamento, por favor, envie um email para orcamento@exemplo.com com os detalhes do seu projeto.';
  } else {
    return 'Desculpe, não entendi sua mensagem.';
  }
}

// Exemplos de treinamento
classifier.addDocument('olá', 'cumprimento');
classifier.addDocument('ola', 'cumprimento');
classifier.addDocument('Oi, tudo bem?', 'cumprimento');
classifier.addDocument('E aí?', 'cumprimento');
classifier.addDocument('bom dia', 'cumprimento');
classifier.addDocument('Qual é a data de hoje?', 'data');
classifier.addDocument('Pode me dizer o dia?', 'data');
classifier.addDocument('Que dia é hoje?', 'data');

// Exemplos de treinamento representativos
classifier.addDocument('Obrigado!', 'agradecimento');
classifier.addDocument('Adeus!', 'despedida');
classifier.addDocument('Até logo!', 'despedida');
classifier.addDocument('Qual é o seu nome?', 'pergunta');
classifier.addDocument('Você pode me ajudar?', 'pergunta');
classifier.addDocument('Quero fazer uma reserva', 'reserva');
classifier.addDocument('Como posso entrar em contato?', 'contato');
classifier.addDocument('Gostaria de um orçamento', 'orçamento');

// Exemplos de treinamento para casos de borda
classifier.addDocument('Nada', 'outro');
classifier.addDocument('123', 'outro');
classifier.addDocument('---', 'outro');
classifier.addDocument('Lorem ipsum dolor sit amet', 'outro');

// Exemplos de treinamento para mais diversidade
classifier.addDocument('Preciso de ajuda urgente!', 'urgente');
classifier.addDocument('Isso é inaceitável!', 'insatisfeito');
classifier.addDocument('Parabéns pelo ótimo serviço!', 'elogio');
classifier.addDocument('Não consigo encontrar a página que procuro', 'problema');
classifier.addDocument('Qual é a capital do Brasil?', 'conhecimento');
classifier.addDocument('Meu pedido não chegou', 'reclamação');

// Treine o classificador
classifier.train();


// Defina as rotas
app.post('/chat', (req, res) => {
  const message = req.body.message;
  const reply = processMessage(message);
  res.json({ reply });
});

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
