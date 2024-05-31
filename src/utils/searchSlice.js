import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    cacheResults: (state, action) => {
      // Check if state has more than 10 keys
      if (Object.keys(state).length > 10) {
        // Get the keys of the state object
        const keys = Object.keys(state);
        // Delete the first key (oldest cached result)
        delete state[keys[0]];
      }
      // Merge the new results into the state
      Object.assign(state, action.payload);
    },
  },
});

export const { cacheResults } = searchSlice.actions;
export default searchSlice.reducer;
