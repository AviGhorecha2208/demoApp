import { createSlice } from '@reduxjs/toolkit';
import { GeneralState } from '../Interfaces/CommonTypes';

const initialState: GeneralState = {
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'General',
  initialState,
  reducers: {
    setGeneralData: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setGeneralData } = authSlice.actions;

export default authSlice.reducer;
