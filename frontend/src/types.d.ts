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