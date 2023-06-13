import {NextFunction, Request, Response} from "express";
import path from "path";

function index(req: Request, res: Response, _next: NextFunction) {
    res.sendFile(path.join(__dirname, './../index.html'));
}

export default {
    index
}