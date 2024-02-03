import React, {useState} from 'react';
import Spinner from '../UI/Spinner/Spinner';
import {Alert} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import {addComment, getCommentByNewsId} from '../../Containers/CommentsThunk';
import {ICommentForm} from '../../types';

export interface Props {
  params_id: string;
}

const AddCommentForm: React.FC<Props> = ({params_id}) => {
  const [error, setError] = useState(false);
  const loadingAddComments = useSelector((state: RootState) => state.comments.addLoading);
  const dispatch: AppDispatch = useDispatch();
  const [newComment, setNewComment ] = useState<ICommentForm>({
    news_id: params_id,
    author: '',
    text: '',
  });

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const onSendComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (params_id) {
      if (newComment.text.trim().length > 0) {
        try {
          await dispatch(addComment({...newComment}));
          await dispatch(getCommentByNewsId(params_id));
          setNewComment((prev) => ({
            ...prev,
            text: '',
            author: '',
          }));
        } catch (e) {
          console.error(e);
        }
        setError(false);
      } else {
        setError(true);
      }

    }
  };

  return (
    <div>
      <hr/>
      {loadingAddComments ? <Spinner/> :
        <form onSubmit={onSendComment} className="w-50 mx-auto">
          <div className="mb-3 w-75 mx-auto">
            {error ? <Alert severity="error">Text must be field</Alert> : null}
            <label htmlFor="name" className="form-label">Author</label>
            <input
              type="text"
              name="author"
              id="author"
              className="form-control"
              value={newComment.author}
              onChange={changeForm}
            />
          </div>

          <div className="mb-3 w-75 mx-auto">
            <label htmlFor="name" className="form-label">Text</label>
            <input
              type="text"
              name="text"
              id="text"
              required
              className="form-control"
              value={newComment.text}
              onChange={changeForm}
            />
          </div>
          <button disabled={newComment.text.trim().length === 0} type="submit"
                  className="btn btn-primary">Send
          </button>

        </form>
      }
    </div>
  );
};

export default AddCommentForm;