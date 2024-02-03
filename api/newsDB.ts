import {promises as fs} from 'fs';
import * as crypto from 'crypto';
import {INews, INewsWithOutIdAndDate} from "./types";

const fileName = './news.json';
let data: INews[] = [];

const newsDB = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },
    async addNewsToJson(news: INewsWithOutIdAndDate) {
        const id = crypto.randomUUID();
        const date = new Date().toISOString();
        const newNews = {...news, id,  date}

        data.push(newNews);
        await this.save();

        return newNews;
    },

    async findNewsById(id: string) {

        if (data.length > 0 && id) {
            let news: INews | undefined = data.find(news => news.id === id);

            if (news !== undefined) {
                return news;
            } else  {
                return {error: "news not found"};
            }
        }
    },

    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    },
    async getNews() {
        return data.map(news => ({
            id: news.id,
            title: news.title,
            image: news.image,
            date: news.date
        }));
    },
};

export default newsDB;

