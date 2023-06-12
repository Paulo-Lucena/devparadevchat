# Chat Dev para Dev

Este é um aplicativo de chat simples que usa o framework Express.js e o classificador Naive Bayes da biblioteca Natural para classificar mensagens de entrada em categorias pré-definidas e retornar respostas adequadas.

## Configuração do Ambiente

1. Certifique-se de ter o Node.js instalado no seu sistema.
2. Faça o download ou clone este repositório.

## Instalação das Dependências

No diretório raiz do projeto, execute o seguinte comando para instalar as dependências:

```
npm install
```

## Executando o Aplicativo

No diretório raiz do projeto, execute o seguinte comando para iniciar o servidor:

```
npm start
```

O servidor será iniciado na porta 3000. Você pode acessar o aplicativo abrindo o navegador e navegando para `http://localhost:3000`.

## Uso

O aplicativo oferece uma rota POST `/chat` para receber mensagens de chat. As mensagens devem ser enviadas no formato JSON com a chave `message`. O aplicativo classificará a mensagem e retornará uma resposta adequada no formato JSON com a chave `reply`.

Exemplo de requisição usando cURL:

```
curl -X POST -H "Content-Type: application/json" -d '{"message":"Qual é a data de hoje?"}' http://localhost:3000/chat
```

Exemplo de resposta:

```json
{
  "reply": "Hoje é dia XX de XX de XXXX e o horário é: XX:XX"
}
```

## Treinamento do Classificador

O classificador Naive Bayes é treinado com exemplos de treinamento representativos em diferentes categorias. Os exemplos de treinamento são adicionados usando o método `addDocument` do classificador.

Para adicionar mais exemplos de treinamento, você pode modificar o código no arquivo `server.js`. No trecho de código onde estão adicionados os exemplos de treinamento, você pode adicionar novas mensagens e suas respectivas categorias.

```javascript
// Adicione exemplos de treinamento
classifier.addDocument('Exemplo de mensagem', 'categoria');
```

Após adicionar novos exemplos de treinamento, você precisa treinar novamente o classificador executando o seguinte comando:

```
npm start
```

## Modificando as Respostas

As respostas do aplicativo podem ser modificadas de acordo com suas necessidades. No código, você encontrará a função `processMessage`, que recebe uma mensagem como entrada e retorna uma resposta adequada com base na classificação da mensagem.

Você pode modificar as respostas existentes ou adicionar novos blocos `if` para lidar com categorias adicionais. Certifique-se de atualizar as respostas de acordo com a categoria correspondente.

## Considerações de Segurança

Este aplicativo é apenas um exemplo e não implementa medidas de segurança robustas. Ao usar em um ambiente de produção, certifique-se de implementar medidas apropriadas para proteger o aplicativo contra ataques, como validação de entrada, sanitização de dados, proteção contra injeção de código e autenticação adequada, conforme necessário.

## Conclusão

Este aplicativo de chat básico demonstra como usar o framework Express.js e o classificador Naive Bayes da biblioteca Natural para criar um serviço de chat simples. Você pode usar esse código como ponto

 de partida e personalizá-lo de acordo com suas necessidades específicas.

## Documentação oficial 
Do Express.js (https://expressjs.com/) 
Da biblioteca Natural (https://github.com/NaturalNode/natural) 

