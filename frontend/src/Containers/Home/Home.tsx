import {useDispatch, useSelector} from 'react-redux';
import {getNews} from '../NewsThunk';
import {useEffect} from 'react';
import {AppDispatch, RootState} from '../../app/store';
import Spinner from '../../Components/UI/Spinner/Spinner';
import NewsCard from '../../Components/NewsCard/NewsCard';
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const Navigation = useNavigate();
  const news = useSelector((state: RootState) => state.news.newsList);
  const loading = useSelector((state: RootState) => state.news.isLoading);

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);


  return (
    <>
      <Button variant="contained" onClick={() =>  Navigation('/new-post')}>Add new post</Button>

      {loading ? <Spinner/> :
        <>{news.length > 0 ?
          <>
            {news.map(item => <NewsCard key={item.id} news={item}/>)}
          </>

          :
          <h4>No news</h4>
        }
        </>
      }
    </>
  );
};

export default Home;