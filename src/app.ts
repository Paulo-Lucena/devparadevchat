import 'express-async-errors';
import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import chatRouter from "./routers/chatRouter";
import pagesRouter from "./routers/pagesRouter";

const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static(__dirname + '/pages'));

app.use('/', pagesRouter);
app.use('/api/v1', chatRouter);
app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
    res.status(500).send(error.message);
})

export default app;