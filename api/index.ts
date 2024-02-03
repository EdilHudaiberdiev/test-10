import express from 'express';
import newsRouter from "./Routers/news";
import newsDB from "./newsDB";
import commentsRouter from "./Routers/comments";
import commentsDB from "./commentsDB";

const cors = require('cors');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use('/news', newsRouter);
app.use('/comments', commentsRouter);

const run = async () => {
    await newsDB.init();
    await commentsDB.init();

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

void run ();

