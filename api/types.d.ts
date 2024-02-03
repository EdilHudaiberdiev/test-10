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

