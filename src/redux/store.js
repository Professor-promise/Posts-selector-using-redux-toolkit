import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../redux/features/post-slice';

export default configureStore({
  reducer: {
    app: postReducer,
  },
});
