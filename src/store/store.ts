import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import dataReducer from './slices/dataSlice';

const rootReducer = combineReducers({
  ui: uiReducer,
  data: dataReducer
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
  });
}


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch']

export const store = setupStore();
