import {createSlice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  feedDetail: null,
  feedList: [],
};

const feedSlice = createSlice({
  name: 'feed',
  initialState: initialState,
  reducers: {
    setFeedData: (state, action) => {
        state[action.payload.collectionName] = action.payload.data;
    },
  },
});

export const feedPersistConfig = {
  key: 'feed',
  storage: AsyncStorage,
};

export const feedAction = feedSlice.actions;
export const feedReducer = feedSlice.reducer;

export const useFeedDetailData = () => {
  const feed = useSelector(state => state?.feed?.feedDetail);
  return feed;
};

export const useFeedListData = () => {
  const feed = useSelector(state => state?.feed?.feedList);
  return feed;
};