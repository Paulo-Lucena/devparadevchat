function radomNumber(value: number) {
    return Math.floor(Math.random() * value)
}

function preProcessMessage(message: string) {
    const processedMessage = message.replace(/[^\w\s]/gi, '');
    return processedMessage.toLowerCase();
}

export default {
    preProcessMessage,
    radomNumber
}