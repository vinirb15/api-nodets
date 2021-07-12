import 'dotenv/config';
import express, { Request, Response, Errback, Application } from 'express'
import cors from 'cors';
import routes from './routes';
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(routes);

//notFound
app.use(function (req, res: Response, next) {
    var err = new Error('Not Found');
    res.status(404); // using response here
    next(err);
});

//catch all
app.use((error: any, req: Request, res: Response) => {
    res.status(error.status || 500);
    res.json({ error: error.message })
})

app.listen(process.env.PORT, () => {
    var dtNow = new Date;
    console.log('--------------------------------------');
    console.log('    Server running: ' + dtNow.getHours() + ":" + dtNow.getMinutes() + ":" + dtNow.getSeconds());
    console.log('ENV: ' + process.env.NODE_ENV + ' PORT: ' + process.env.PORT);
    console.log('--------------------------------------');
});