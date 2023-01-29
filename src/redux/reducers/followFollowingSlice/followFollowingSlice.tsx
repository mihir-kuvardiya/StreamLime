import {createSlice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    followersList: [],
    followingList: []
};

const followFollowingSlice = createSlice({
    name: 'followFollowing',
    initialState: initialState,
    reducers: {
      setFollowerListData: (state, action) => {
        state.followersList = action.payload;
      },
      setFollowingListData: (state, action) => {
        state.followingList = action.payload;
      },
    },
});
  
export const followFollowingPersistConfig = {
    key: 'followFollowing',
    storage: AsyncStorage,
};

export const followFollowingAction = followFollowingSlice.actions;
export const followFollowingReducer = followFollowingSlice.reducer;
  
export const useFollowersListData = () => {
    const folowers = useSelector(state => state?.followFollowing?.followersList);
    return folowers;
};

export const useFollowingListData = () => {
    const following = useSelector(state => state?.followFollowing?.followingList);
    return following;
};