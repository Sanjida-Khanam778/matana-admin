import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasSeenVisitorPopup: false,
};

const visitorSlice = createSlice({
  name: "visitor",
  initialState,
  reducers: {
    setHasSeenVisitorPopup: (state, action) => {
      state.hasSeenVisitorPopup = action.payload !== undefined ? action.payload : true;
    },
  },
});

export const { setHasSeenVisitorPopup } = visitorSlice.actions;
export default visitorSlice.reducer;
