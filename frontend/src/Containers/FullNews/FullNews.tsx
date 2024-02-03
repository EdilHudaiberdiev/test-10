import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {AppDispatch, RootState} from '../../app/store';
import {useDispatch, useSelector} from 'react-redux';
import {getOneNewsById} from '../NewsThunk';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {deleteComment, getCommentByNewsId} from '../CommentsThunk';
import AddCommentForm from '../../Components/AddCommentForm/AddCommentForm';
import FullNewsCard from '../../Components/FullNewsCard/FullNewsCard';

const FullNews = () => {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const news = useSelector((state: RootState) => state.news.newsById);
  const loadingNews = useSelector((state: RootState) => state.news.isLoading);
  const comments = useSelector((state: RootState) => state.comments.comments);
  const loadingComments = useSelector((state: RootState) => state.comments.isLoading);

  useEffect(() => {
    if (params.id) {
      dispatch(getOneNewsById(params.id));
      dispatch(getCommentByNewsId(params.id));
    }

  }, [dispatch, params.id]);

  const deleteCommentById = async (id: string) => {
    if (id) {
      await dispatch(deleteComment(id));
      await dispatch(getCommentByNewsId(String(params.id)));
    }
  };


  return (
    <div className="container">
      {loadingNews ? <Spinner/> :
        <>
          {news !== null ? <FullNewsCard news={news}/>: <p>Not found</p>}
        </>
      }

      <hr/>
      <h3>Comments:</h3>
      {loadingComments ?  <Spinner/> :
        <>
          {comments.length > 0 ?
            <div className="comments-block">
              {comments.map(comment => (
                <div key={comment.id} className="border rounded-4 mb-4 p-2 text-start d-flex align-items-center justify-content-between w-50 mx-auto">
                  <div>
                    <h5>Author: {comment.author}</h5>
                    <p>{comment.text}</p>
                  </div>
                  <button onClick={() => deleteCommentById(comment.id)} className="btn btn-danger">Delete</button>
                </div>
              ))}
            </div>
            :
            <h6 className="opacity-50">No comments</h6>
          }
        </>
      }
      <div className="comments-block-form">
        <AddCommentForm params_id={String(params.id)}/>
      </div>

    </div>
  );
};

export default FullNews;