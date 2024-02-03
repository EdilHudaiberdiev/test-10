import {useDispatch} from 'react-redux';
import {getNews} from '../NewsThunk';
import {useEffect} from 'react';
import {AppDispatch} from '../../app/store';

const Home = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);


  return (
    <>
      Future App
    </>
  );
};

export default Home;