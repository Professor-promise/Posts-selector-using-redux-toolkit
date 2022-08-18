import React, { useState, useEffect } from 'react';
import { Button, Card, Input, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPost,
  delPost,
  setEdit,
  updatePost,
} from '../redux/features/post-slice';
import LoadingCard from './LoadingCard';

const Home = () => {
  const [id, setId] = useState();
  const [bodyText, setBodyText] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, post, edit, body } = useSelector(state => ({
    ...state.app,
  }));

  const fetchUserPost = () => {
    if (!id) window.alert('Please provide an id');
    dispatch(getPost({ id }));
    setId('');
  };

  useEffect(() => {
    if (!body) return;
    setBodyText(body);
  }, [body]);

  return (
    <div className='container'>
      <h2 style={{ textAlign: 'Center' }}>Fetch Post</h2>
      <Input
        placeholder='Enter User id'
        type='number'
        onChange={e => setId(e.target.value)}
        value={id}
        style={{ width: '300px' }}
      />
      <br />
      <Space size='small' style={{ margin: '10px' }}>
        <Button type='primary' onClick={fetchUserPost}>
          Fetch User
        </Button>
        <Button type='primary' onClick={() => navigate('/createPost')}>
          Create User Post
        </Button>
      </Space>
      <br />
      <br />
      {loading ? (
        <LoadingCard count={1} />
      ) : (
        <>
          {post.length > 0 &&
            post?.map(({ title, id, body }) => (
              <div key={id}>
                <Card type='inner' title={title} key={id}>
                  {id && <p>User id: {id}</p>}
                  {edit ? (
                    <>
                      <Input.TextArea
                        rows={4}
                        value={bodyText}
                        onChange={e => setBodyText(e.target.value)}
                      />
                      <Space
                        size='middle'
                        style={{ marginTop: 5, marginLeft: 5 }}
                      >
                        <Button
                          type='primary'
                          danger
                          onClick={() =>
                            dispatch(setEdit({ edit: false, body: '' }))
                          }
                        >
                          Cancel
                        </Button>
                        <Button
                          type='primary'
                          onClick={() => {
                            dispatch(updatePost({ id, body: bodyText, title }));
                            dispatch(setEdit({ edit: false, body: '' }));
                          }}
                        >
                          Save
                        </Button>
                      </Space>
                    </>
                  ) : (
                    <span>{body}</span>
                  )}
                </Card>
                {!edit && (
                  <Space
                    size='middle'
                    style={{ marginTop: 35, marginLeft: 5, float: 'right' }}
                  >
                    <Button
                      style={{ cursor: 'pointer' }}
                      type='primary'
                      danger
                      onClick={() => dispatch(delPost({ id }))}
                    >
                      Delete
                    </Button>
                    <Button
                      style={{ cursor: 'pointer' }}
                      type='primary'
                      onClick={() => dispatch(setEdit({ edit: true, body }))}
                    >
                      Edit
                    </Button>
                  </Space>
                )}
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Home;
