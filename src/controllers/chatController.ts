import {NextFunction, Request, Response} from 'express';
import customerRepository from '../repositories/classificationRepository';
import chatBotRepository from "../repositories/chatBotRepository";
import csvRepository from "../repositories/csvRepository";

async function getClassification(req: Request, res: Response, _next: NextFunction) {
    const classification = await customerRepository.getClassifications();
    res.json(classification);
}

async function postClassification(req: Request, res: Response, _next: NextFunction) {
    const classification = await customerRepository.addClassification(req.body.classification);
    if (classification) {
        res.sendStatus(201);
    } else {
        res.sendStatus(500);
    }
}

async function chatBot(req: Request, res: Response, _next: NextFunction) {
    csvRepository.addTrainingDataFromCSV();
    const reponseChat = await chatBotRepository.processMessage(req.body.message);

    if (reponseChat) {
        res.json(reponseChat);
    } else {
        res.sendStatus(500);
    }
}

export default {
    getClassification,
    postClassification,
    chatBot
}