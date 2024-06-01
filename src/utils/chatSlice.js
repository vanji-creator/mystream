import { createSlice } from "@reduxjs/toolkit";
import { OFFSET_LIVECHAT } from "./constants";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      if (state.messages.length > OFFSET_LIVECHAT) {
        state.messages.splice(-5);
      }
      // state.messages.splice(OFFSET_LIVECHAT,5);
      state.messages.unshift(action.payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
