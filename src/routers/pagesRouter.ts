import express from 'express';
import pagesController from "../controllers/pagesController";

const routerApi = express.Router();

routerApi.post('/', pagesController.index);

export default routerApi