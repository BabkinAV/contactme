import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

interface uiState {
  isAuthenticated: boolean;
  userId: number | null;
  errorMsg: string;
}

const initialState: uiState = {
  isAuthenticated: false,
  userId: null,
  errorMsg: '',
};

export const uiSlice = createSlice({
  name: 'uiSlice',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUserId: (state, action: PayloadAction<number|null>) => {
      state.userId = action.payload;
    },
  },
});

export const selectUserId = (state: RootState) => state.ui.userId;

export const {setAuthenticated, setUserId} = uiSlice.actions;

export default uiSlice.reducer;
