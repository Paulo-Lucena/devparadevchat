import fs from "fs";
import csv from "csv-parser";
import natural from "natural";

const classifier = new natural.BayesClassifier();

function addTrainingDataFromCSV() {
    fs.createReadStream('./training_data.csv')
        .pipe(csv())
        .on('data', (data: any) => {
            const message = data.message;
            const category = data.category;

            classifier.addDocument(message, category);
        }).on('end', () => {
        classifier.train();
    });
}

export default {
    addTrainingDataFromCSV
}
