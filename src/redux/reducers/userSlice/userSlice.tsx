import {createSlice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  userData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    clearUser: state => {
      state.userData = null;
    },
  },
});

export const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
};

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;

export const useUserData = () => {
  const user = useSelector(state => state?.user?.userData);
  return user;
};