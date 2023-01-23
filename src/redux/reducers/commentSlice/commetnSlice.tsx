import {createSlice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  commentsList: [],
};

const commentSlice = createSlice({
  name: 'comment',
  initialState: initialState,
  reducers: {
    setCommentData: (state, action) => {
        state[action.payload.collectionName] = action.payload.data;
    },
  },
});

export const commentPersistConfig = {
  key: 'comment',
  storage: AsyncStorage,
};

export const commentAction = commentSlice.actions;
export const commentReducer = commentSlice.reducer;

export const useCommentistData = () => {
  const comment = useSelector(state => state?.comment?.commentsList);
  return comment;
};
