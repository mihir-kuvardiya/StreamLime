import {createSlice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

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
    updateLike: (state, action) => {
      let items = JSON.parse(JSON.stringify(state.feedList));
      let postIndex = _.findIndex(items, {postId: action.payload.id});

      let feedDetailPostItems = JSON.parse(JSON.stringify(state.feedDetail));

      if (postIndex !== -1) {
        console.log(items[postIndex],'iiiiiiiiiiiiiiii')
        if (items[postIndex].isLiked === false) {
          console.log('===============')
          items[postIndex].isLiked = true;
          items[postIndex].likeCount++;
          console.log('=====<<<<<<<<')
        }else{
          items[postIndex].isLiked = false;
          items[postIndex].likeCount--;
        }
        console.log(items[postIndex],'iiiiiiiiiiiiiiii')
      }
      if (state.feedDetail !== null) {
        if (feedDetailPostItems.isLiked === false) {
          feedDetailPostItems.isLiked = true;
          feedDetailPostItems.likeCount++;
        }
        else{
          feedDetailPostItems.isLiked = false;
          feedDetailPostItems.likeCount--;
        }
      }

      state.feedList = items;
      state.feedDetail = feedDetailPostItems;

    }
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