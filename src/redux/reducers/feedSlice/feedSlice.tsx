import {createSlice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

const initialState = {
  feedDetail: null,
  feedList: [],
  commentsList: [],
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
        if (items[postIndex].isLiked === false) {
          items[postIndex].isLiked = true;
          items[postIndex].likeCount++;
        }else{
          items[postIndex].isLiked = false;
          items[postIndex].likeCount--;
        }
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
    },
    setCommentData: (state, action) => {
      state[action.payload.collectionName] = action.payload.data;
    },
    updateComment: (state,action) => {
      let comments = JSON.parse(JSON.stringify(state.commentsList));
      let data = action.payload.data;

      let items = JSON.parse(JSON.stringify(state.feedList));
      let postIndex = _.findIndex(items, {postId: data.postId});

      let feedDetailPostItems = JSON.parse(JSON.stringify(state.feedDetail));

      if (postIndex !== -1) {
          items[postIndex].commentCount++;
      }
      if (state.feedDetail !== null) {
          feedDetailPostItems.commentCount++;
      }
      comments = [action.payload.data,...comments];

      state.commentsList = comments;
      state.feedList = items;
      state.feedDetail = feedDetailPostItems;
    },
    deletePost: (state,action) => {
      let items = JSON.parse(JSON.stringify(state.feedList));
      let postIndex = _.findIndex(items, {postId: action.payload.id});

      let feedDetailPostItems = JSON.parse(JSON.stringify(state.feedDetail));

      if (postIndex !== -1) {
        _.remove(items, function (c) {
          return c.postId === items[postIndex].postId;
        });
      }
      if (state.feedDetail !== null) {
        if (action.payload.id === feedDetailPostItems.postId) {
          feedDetailPostItems = null;
        }
      }
      state.feedList = items;
      state.feedDetail = feedDetailPostItems;
    },
    deleteComment : (state,action) => {
      let comments = JSON.parse(JSON.stringify(state.commentsList));
      let commentIndex = _.findIndex(comments, {commentId: action.payload.id});

      let items = JSON.parse(JSON.stringify(state.feedList));
      let postIndex = _.findIndex(items, {postId: action.payload.postId});

      let feedDetailPostItems = JSON.parse(JSON.stringify(state.feedDetail));

      if (commentIndex !== -1) {
        _.remove(comments, function (c) {
          return c.commentId === comments[commentIndex].commentId;
        });
      }
      
      if (postIndex !== -1) {
        items[postIndex].commentCount--;
      }
      if (state.feedDetail !== null) {
          feedDetailPostItems.commentCount--;
      }

      state.commentsList = comments;
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

export const useCommentistData = () => {
  const comment = useSelector(state => state?.feed?.commentsList);
  return comment;
};