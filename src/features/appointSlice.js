import { createSlice } from "@reduxjs/toolkit";

const appointSlice = createSlice({
  name: "appointment",
  initialState: {
    isFetching: false,
    error: false,
    errMsg: "",
    slots: [],
    dates: [],
    locations: [],
  },
  reducers: {
    AppStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    AppSuccess: (state, action) => {
      console.log(action);
      state.errMsg = "";
      state.error = false;
      state.isFetching = false;
      if (action.payload.dates) {
        state.dates = action.payload.dates;
        state.locations = [];
        state.slots = [];
      }

      if (action.payload.location) {
        state.locations = action.payload.location;
      }

      if (action.payload.slots) {
        state.slots = action.payload.slots;
      }
    },
    AppFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { AppFailure, AppStart, AppSuccess } = appointSlice.actions;
export default appointSlice.reducer;
