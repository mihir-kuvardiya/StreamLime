import {combineReducers} from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import {userPersistConfig, userReducer} from './userSlice/userSlice';

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
});

export default rootReducer;