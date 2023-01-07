import {configureStore} from '@reduxjs/toolkit';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import rootReducer from './reducers/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);