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

    async findCommentById(id: string) {

        if (data.length > 0 && id) {
            let comment: IComment | undefined = data.find(comments => comments.id === id);

            if (comment !== undefined) {
                return comment;
            } else  {
                return null;
            }
        }
    },

    async deleteCommentById(id: string) {
        if (data.length > 0 && id) {
            let comment = await this.findCommentById(id);

            if (comment === null) {
                return null;
            }

            if (comment) {
                data = data.filter(comment => comment.id !== id);
                await this.save();
                return 'Comment was deleted';
            }
        }
    },
    async getComments() {
       return data
    },
    async save(dataToUpdate?: IComment[]) {
        if (dataToUpdate === undefined) dataToUpdate = data;
        return fs.writeFile(fileName, JSON.stringify(dataToUpdate));
    },
};

export default commentsDB;

