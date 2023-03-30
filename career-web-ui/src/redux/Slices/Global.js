import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalJobs: [],
};

export const globalSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setTotalJobs: (state, action) => {
      state.totalJobs = action.payload;
      console.log("setTotalJobs: ", state.totalJobs);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTotalJobs } = globalSlice.actions;

export default globalSlice.reducer;
