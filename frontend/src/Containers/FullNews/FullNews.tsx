import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {AppDispatch, RootState} from '../../app/store';
import {useDispatch, useSelector} from 'react-redux';
import {getOneNewsById} from '../NewsThunk';
import Spinner from '../../Components/UI/Spinner/Spinner';
import dayjs from 'dayjs';
import {apiUrl} from '../../constants';

const FullNews = () => {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const news = useSelector((state: RootState) => state.news.newsById);
  const loadingNews = useSelector((state: RootState) => state.news.isLoading);


  useEffect(() => {

    if (params.id) {
      dispatch(getOneNewsById(params.id));
    }

  }, [dispatch, params.id]);

  return (
    <div>
      {loadingNews ? <Spinner/> :
        <>
          {news !== null ?
            <div className={'border'}>
              <h1>{news.title}</h1>
              <p>{dayjs(news.date).format('ddd, MMM D, YYYY h:mm A')}</p>
              <p>{news.text}</p>

              {news.image ?
                <img
                  width="100"
                  height="100"
                  src={apiUrl + news.image}
                  alt={news.title}
                />
                : null
              }


            </div>
            :
            <p>Not found</p>
          }
        </>
      }

      <hr/>
      <h3>Comments:</h3>


    </div>
  );
};

export default FullNews;