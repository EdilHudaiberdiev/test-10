export interface INews {
    id: string,
    title: string,
    text: string
    image: string | null,
    date: string,
}

export interface INewsWithOutIdAndDate {
    title: string,
    text: string
    image: string | null,
}


export interface IComment {
    id: string,
    news_id: string;
    author: string;
    text: string;
}

export interface ICommentWithoutId {
    news_id: string;
    author: string;
    text: string;
}

