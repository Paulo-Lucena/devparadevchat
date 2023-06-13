import Classification from './../models/classification'

const classifications: Classification[] = [];

async function getClassifications(): Promise<Classification[]> {
    return new Promise((resolve, _reject) => {
        return resolve(classifications);
    });
}

async function addClassification(classification: Classification): Promise<Classification> {
    return new Promise((resolve, reject) => {
        if (!classification.message || !classification.category) {
            return reject(new Error(`Invalid classification.`));
        }
        const newCustomer = new Classification(classification.message, classification.category);
        classifications.push(newCustomer);
        return resolve(newCustomer);
    })
}

export default {
    addClassification,
    getClassifications,
}