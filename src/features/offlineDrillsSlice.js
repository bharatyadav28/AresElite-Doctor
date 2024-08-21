import { createSlice } from "@reduxjs/toolkit";

const offlineDrillsSlice = createSlice({
  name: "offlineDrills",
  initialState: {
    isFetching: false,
    error: false,
    errMsg: "",
    offlineDrillData: {},
    submittedFormData: [],
  },
  reducers: {
    fetchingStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    saveDrillsData: (state, action) => {
      state.errMsg = "";
      state.error = false;
      state.isFetching = false;
      state.offlineDrillData = action.payload;
    },
    submittedFormData: (state, action) => {
      state.submittedFormData = action.payload;
    },
    fetchingFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  fetchingStart,
  saveDrillsData,
  submittedFormData,
  fetchingFailure,
} = offlineDrillsSlice.actions;
export default offlineDrillsSlice.reducer;
