import {Router} from 'express';
import newsDB from "../newsDB";
import {INewsWithOutIdAndDate} from "../types";
import {imagesUpload} from "../multer";
const newsRouter = Router();

newsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    if (!req.body.title || !req.body.text) {
        res.status(404).send({"error": "Title or text must be present in the request"});
    }

    let newNews: INewsWithOutIdAndDate = {
        title: req.body.title,
        text: req.body.text,
        image: req.file ? req.file.filename : null,
    };

    newNews = await newsDB.addNewsToJson(newNews);
    res.send(newNews);
});

newsRouter.get('/', async (req, res) => {
    let news = await newsDB.getNews();
    news = news.reverse();

    res.send(news);
});

newsRouter.get('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({"error": "Id params must be in url"});
    }

    let news = await newsDB.findNewsById(req.params.id);

    if (news !== null) {
        res.send(news);
    } else {
        res.status(404).send({error: "news not found"});
    }
});

newsRouter.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({"error": "Id params must be in url"});
    }

    let news = await newsDB.deleteNewsById(req.params.id);

    if (news !== null) {
        res.send(news);
    } else {
        res.status(404).send({error: "news not found"});
    }

});


export default newsRouter