import React from 'react';
import dayjs from 'dayjs';
import {apiUrl} from '../../constants';
import {INewsFull} from '../../types';
import {CardMedia, styled} from '@mui/material';

interface Props {
  news: INewsFull
}

const FullNewsCard: React.FC<Props> = ({news}) => {
  const ImageCardMedia = styled(CardMedia)({
    width: '150px',
  });

  return (
    <div className="my-5 text-start">
      <h1>{news.title}</h1>
      <p className="text-light-emphasis opacity-50">{dayjs(news.date).format('ddd, MMM D, YYYY h:mm A')}</p>
      <p>{news.text}</p>

      {news.image ?
        <ImageCardMedia image={apiUrl + '/' + news.image} title={news.id}/>
        : null
      }
    </div>
  );
};

export default FullNewsCard;