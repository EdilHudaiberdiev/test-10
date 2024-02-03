import {Router} from 'express';
import {ICommentWithoutId} from "../types";
import commentsDB from "../commentsDB";
import newsDB from "../newsDB";

const commentsRouter = Router();

commentsRouter.post('/',  async (req, res) => {
    if (!req.body.news_id || !req.body.text) {
        res.status(404).send({"error": "Text and News_id must be present in the request"});
    }

    let checkNewsId = await newsDB.findNewsById(req.body.news_id);

    if (checkNewsId !== null) {
        let newComment: ICommentWithoutId = {
            news_id: req.body.news_id,
            author: req.body.author && req.body.author !== '' ? req.body.author : 'Anonymous',
            text: req.body.text,
        };

        newComment = await commentsDB.addCommentsToJson(newComment);
        res.send(newComment);
    } else {
        res.status(404).send({error: "news_id not found"});
    }
});

commentsRouter.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({"error": "Id params must be in url"});
    }

    let comment = await commentsDB.deleteCommentById(req.params.id);

    if (comment !== null) {
        res.send(comment);
    } else {
        res.status(404).send({error: "comment not found"});
    }
});


export default commentsRouter