import React, {useState} from 'react';
import {INewsForm} from '../../types';
import FileInput from '../../Components/UI/FileInput/FileInput';
import {AppDispatch} from '../../app/store';
import {useDispatch} from 'react-redux';
import {addNews, getNews} from '../NewsThunk';
import {Alert} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const AddNewPost = () => {
  const dispatch: AppDispatch = useDispatch();
  const Navigation = useNavigate();
  const [error, setError] = useState(false);
  const [newNews, setNewNews] = useState<INewsForm>({
    title: '',
    text: '',
    image: null,
  });

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('title', newNews.title);
    formData.append('text', newNews.text);

    if(newNews.image) {
      formData.append('image', newNews.image);
    }

    if (newNews.text.trim().length !== 0 && newNews.title.trim().length !== 0) {
      try {
        await dispatch(addNews(formData));
        await dispatch(getNews());
        Navigation('/');
      } catch (e) {
        console.error(e);
      }
      setError(false);
    } else {
      setError(true);
    }
  };

  const changeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewNews((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setNewNews(prevState => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <div className="container">
      <form onSubmit={onFormSubmit} className="w-50 mx-auto">
        <h2 className="text-center my-4">Add new news</h2>
        {error ? <Alert severity="error">Title and text must be field</Alert> : null}

        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="name" className="form-label">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="form-control"
            value={newNews.title}
            onChange={changeForm}
          />
        </div>

        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="name" className="form-label">Text</label>
          <textarea
            name="text"
            id="text"
            required
            className="form-control"
            value={newNews.text}
            onChange={changeForm}
          ></textarea>
        </div>

        <div className="mb-3 w-75 mx-auto">
          <FileInput
            onChange={fileInputChangeHandler}
            name="image"
            label="Image"
          />
        </div>

        <button disabled={newNews.title.trim().length === 0 && newNews.text.trim().length ===0} type="submit" className="btn btn-primary">Add</button>
      </form>
    </div>
  );
};

export default AddNewPost;