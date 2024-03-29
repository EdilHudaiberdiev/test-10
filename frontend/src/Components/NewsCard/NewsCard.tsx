
import React from 'react';
import {INewsWithoutText} from '../../types';
import {AppDispatch} from '../../app/store';
import {useDispatch} from 'react-redux';
import {deleteNews, getNews} from '../../Containers/NewsThunk';
import {apiUrl} from '../../constants';
import dayjs from 'dayjs';
import {NavLink} from 'react-router-dom';

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
      <div className="border rounded-4 text-start p-3 w-50 me-auto mb-4">
        <div className="d-flex">
          {news.image ?
            <img
              width="100"
              height="100"
              className="me-3"
              src={apiUrl + news.image}
              alt={news.title}
            />
            : null
          }

          <div>
            <h5>{news.title}</h5>
            <p>{dayjs(news.date).format('ddd, MMM D, YYYY h:mm A')}</p>
          </div>
        </div>

        <div className="d-flex py-4 justify-content-between align-items-center">
          <NavLink to={`/news/${news.id}`} className="navbar-brand d-flex btn btn-primary text-white py-2">Read more &gt;</NavLink>

          <button
            onClick={() => deleteNewsById(news.id)}
            type="button"
            className="ms-3 me-1 btn btn-danger"
          >Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default NewsCard;