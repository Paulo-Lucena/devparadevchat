import express from 'express';
import chatController from "../controllers/chatController";

const routerApi = express.Router();

routerApi.post('/chat', chatController.chatBot);
routerApi.post('/learning, ', chatController.postClassification);
routerApi.get('/classifications', chatController.getClassification);

export default routerApi