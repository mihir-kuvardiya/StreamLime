import {combineReducers} from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import { feedPersistConfig, feedReducer } from './feedSlice/feedSlice';
import {userPersistConfig, userReducer} from './userSlice/userSlice';

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  feed: persistReducer(feedPersistConfig, feedReducer)
});

export default rootReducer;