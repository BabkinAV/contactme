import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';

interface uiState {
  isAuthenticated: boolean;
}

const initialState: uiState = {
  isAuthenticated: false,
};

export const uiSlice = createSlice({
  name: 'uiSlice',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const {setAuthenticated} = uiSlice.actions;

export default uiSlice.reducer;
