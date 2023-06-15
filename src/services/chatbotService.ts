import utils from "../helpers/utils";
import {BayesClassifier} from "natural";
import csvRepository from "./csvService";


const classifier = new BayesClassifier();
const classificationMap = new Map<string, string>();
const date = new Date();
const greetings = [
    'Olá! Como posso ajudar?',
    'Oi! Em que posso te auxiliar?',
    'Olá, como posso ser útil?'
];
const farewells = [
    'Até mais! Tenha um ótimo dia.',
    'Até logo! Volte sempre que precisar.',
    'Tchau! Espero ter sido útil.'
];
const unknownResponses = [
    'Desculpe, não entendi sua mensagem.',
    'Não tenho informações sobre isso. Posso ajudar com outra coisa?',
    'Não tenho certeza do que você está procurando. Poderia reformular a pergunta?'
];

function processMessage(message: string) {
    csvRepository.addTrainingDataFromCSV(classifier);
    populaClassification();
    const preprocessedMessage = utils.preProcessMessage(message);
    const classification = classifier.getClassifications(preprocessedMessage)[0];

    if (classification) {
        if (classificationMap.has(classification.label)) {
            return classificationMap.get(classification.label);
        }
    }
    return (unknownResponses)[utils.radomNumber(unknownResponses.length)];
}

function populaClassification() {
    classificationMap.set('cumprimento', (greetings)[utils.radomNumber(greetings.length)]);
    classificationMap.set('despedida', (farewells)[utils.radomNumber(farewells.length)]);
    classificationMap.set('data',
        `Hoje é dia ${date.getDate()} de ${date.getMonth()} de ${date.getFullYear()} e o horário é ${date.getHours()}:${date.getMinutes()}`
    );
    classificationMap.set('agradecimento', 'De nada! Estou aqui para ajudar.');
    classificationMap.set('pergunta', 'Claro, estou à disposição para responder suas perguntas.');
    classificationMap.set('reserva', 'Para fazer uma reserva, por favor, entre em contato com nossa equipe de atendimento.');
    classificationMap.set('contato', 'Você pode entrar em contato conosco pelo telefone (XX) XXXX-XXXX ou pelo email contato@exemplo.com.');
    classificationMap.set('orçamento', 'Para solicitar um orçamento, por favor, envie um email para orcamento@exemplo.com com os detalhes do seu projeto.');
    classificationMap.set('burnout',
        'Síndrome de Burnout ou Síndrome do Esgotamento Profissional é um disturbio emocional com sintomas de exaustão extrema, ' +
        'estresse e esgotamento físico resultante de situações de trabalho desgastante, que demandam muita competitividade ' +
        'ou responsabilidade. A principal causa da doença é justamente o excesso de trabalho.'
    );
}

export default {
    processMessage
}


