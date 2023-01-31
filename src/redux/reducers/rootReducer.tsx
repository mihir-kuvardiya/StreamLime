import {combineReducers} from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import { feedPersistConfig, feedReducer } from './feedSlice/feedSlice';
import { followFollowingPersistConfig, followFollowingReducer } from './followFollowingSlice/followFollowingSlice';
import {userPersistConfig, userReducer} from './userSlice/userSlice';

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  feed: persistReducer(feedPersistConfig, feedReducer),
  followFollowing: persistReducer(followFollowingPersistConfig,followFollowingReducer),
});

export default rootReducer;