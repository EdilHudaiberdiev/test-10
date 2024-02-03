export interface INewsWithoutText {
  id: string,
  title: string,
  image: string | null,
  date: string,
}

export interface INewsFull {
  id: string,
  title: string,
  text: string,
  image: string | null,
  date: string,
}

export interface INewsForm {
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

export interface ICommentForm {
  news_id: string;
  author: string;
  text: string;
}

