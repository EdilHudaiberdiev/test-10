import {promises as fs} from 'fs';
import * as crypto from 'crypto';
import {IComment, ICommentWithoutId} from "./types";

const fileName = './comments.json';
let data: IComment[] = [];

const commentsDB = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },
    async addCommentsToJson(news: ICommentWithoutId) {
        const id = crypto.randomUUID();
        const newComment = {...news, id}

        data.push(newComment);
        await this.save();

        return newComment;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    },
};

export default commentsDB;

