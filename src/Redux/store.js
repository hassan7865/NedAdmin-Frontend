import { configureStore,combineReducers} from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
import LoginReducer from './LoginRedux'
import NewsReducer from './NewsRedux'
import FaqReducer from './FaqRedux'
import TestReducer from './TestRedux'
import PaperRedux from './PaperRedux'
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  const rootReducer = combineReducers( {Login:LoginReducer,News:NewsReducer,Faq:FaqReducer,Test:TestReducer,Paper:PaperRedux})
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
  
export const persistor = persistStore(store)