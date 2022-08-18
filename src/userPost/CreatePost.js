import React, { useState } from 'react';
import { Input, Button, Card, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../redux/features/post-slice';
import LoadingCard from './LoadingCard';

const CreatePost = () => {
  const [values, setValues] = useState({
    title: '',
    body: '',
  });
  const [showPost, setShowPost] = useState(false);
  const { title, body } = values;
  const { loading, post } = useSelector(state => ({ ...state.app }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createPost({ values }));
    setValues({ text: '', body: '' });
    setShowPost(true);
  };

  const onChange = e => {
    const { name, value } = e.target;
    setValues(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const showPostBlog = () => {
    return (
      <>
        {loading ? (
          <LoadingCard count={1} />
        ) : (
          <>
            {post?.map(({ title, id, body }) => (
              <React.Fragment key={id}>
                <Card type='inner' title={title} key={id}>
                  {id && <p>User id: {id}</p>}
                  <span>{body}</span>
                </Card>
              </React.Fragment>
            ))}
          </>
        )}
      </>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create Post</h2>
        <Input
          placeholder='Enter Title'
          type='text'
          name='title'
          onChange={onChange}
          value={title}
          style={{ width: '400px' }}
        />
        <br />
        <br />
        <Input.TextArea
          placeholder='Enter Post Body'
          type='text'
          name='body'
          onChange={onChange}
          value={body}
          style={{ width: '400px' }}
          size='large'
        />
        <br />
        <br />
        <Space style={{ margin: 10 }}>
          <Button onClick={() => navigate('/')}>Go back</Button>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Space>
      </form>
      {showPost && <div>{showPostBlog()}</div>}
    </div>
  );
};

export default CreatePost;
