import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: { undefined },
  reducers: {
    addSearchResults: (state, action) => {
      //   Object.assign(state, action.payload);
      return action.payload;
    },
  },
});

export const { addSearchResults } = videoSlice.actions;
export default videoSlice.reducer;
