import express from 'express';
import newsRouter from "./Routers/news";
import newsDB from "./newsDB";

const cors = require('cors');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use('/news', newsRouter);

const run = async () => {
    await newsDB.init();

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

void run ();

