import {Router} from 'express';
import newsDB from "../newsDB";
import {INews, INewsWithOutIdAndDate} from "../types";
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

    newNews = await newsDB.addCategoryToJson(newNews);
    res.send(newNews);
});

newsRouter.get('/', async (req, res) => {
    let news: INews[];

    news = await newsDB.getNews();
    news = news.reverse();

    res.send(news);
});


export default newsRouter