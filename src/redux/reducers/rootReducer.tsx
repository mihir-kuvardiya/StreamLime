import {combineReducers} from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import { commentPersistConfig, commentReducer } from './commentSlice/commetnSlice';
import { feedPersistConfig, feedReducer } from './feedSlice/feedSlice';
import {userPersistConfig, userReducer} from './userSlice/userSlice';

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  feed: persistReducer(feedPersistConfig, feedReducer),
  comment: persistReducer(commentPersistConfig, commentReducer),
});

export default rootReducer;