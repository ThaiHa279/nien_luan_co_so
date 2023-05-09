
import authReducer from './authSlice';
import materialReducer from './materialSlice'; 
import cartReducer from './cartSlice';
import distributorReducer from './distributorSlice';
import storeReducer from './storeSlice';
import oderReducer from './orderSlice';
import statisticReducer from './statisticSlice';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {
    persistStore,
    persistReducer,
    // FLUSH,
    // REHYDRATE,
    // PAUSE,
    // PERSIST,
    // PURGE,
    // REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const rootReducer = combineReducers({
  auth: authReducer,
  materials: materialReducer,
  cart: cartReducer,
  distributor: distributorReducer,
  store: storeReducer,
  order: oderReducer,
  statistic: statisticReducer,
}); 

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware({
    //     serializableCheck: {
    //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //     },
    // }),
})
export const persistor = persistStore(store)