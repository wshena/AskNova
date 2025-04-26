import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UtilityState {
  sidebar: boolean
}

const initialState: UtilityState = {
  sidebar: false
};

const utilitySlice = createSlice({
  name: 'utility',
  initialState,
  reducers: {
    setSidebar: (state, action:PayloadAction<boolean>) => {
      state.sidebar = action.payload
    }
  },
});

export const {
  setSidebar
} = utilitySlice.actions;
export default utilitySlice.reducer