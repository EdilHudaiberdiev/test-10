
import React from 'react';
import {INewsWithoutText} from '../../types';
import {AppDispatch} from '../../app/store';
import {useDispatch} from 'react-redux';
import {deleteNews, getNews} from '../../Containers/NewsThunk';
import {apiUrl} from '../../constants';
import dayjs from 'dayjs';

interface Props {
  news: INewsWithoutText
}
const NewsCard:React.FC<Props> = ({news}) => {
  const dispatch: AppDispatch = useDispatch();


  const deleteNewsById = async (id: string) => {
    await dispatch(deleteNews(id));
    await dispatch(getNews());
  };

  return (
    <>
      <div className={'border'}>
        <p>{news.title}</p>
        <p>{dayjs(news.date).format('ddd, MMM D, YYYY h:mm A')}</p>

        {news.image ?
          <img
            width="100"
            height="100"
            src={apiUrl + news.image}
            alt={news.title}
          />
          : null
        }


        <button
          onClick={() => deleteNewsById(news.id)}
          type="button"
          className="ms-3 me-1 btn btn-danger"
        >Delete
        </button>
      </div>
    </>
  );
};

export default NewsCard;