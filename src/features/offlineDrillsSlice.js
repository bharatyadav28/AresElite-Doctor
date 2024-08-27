import { createSlice } from "@reduxjs/toolkit";

const offlineDrillsSlice = createSlice({
  name: "offlineDrills",
  initialState: {
    isFetching: false,
    error: false,
    errMsg: "",
    offlineDrillData: {},
    submittedFormData: [],
    initialDrillData: {},
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

    fetchingSuccess: (state) => {
      state.errMsg = "";
      state.error = false;
      state.isFetching = false;
    },
    saveInitialDrill: (state, action) => {
      state.initialDrillData = action.payload;
    },
    submittedFormData: (state, action) => {
      state.submittedFormData = action.payload;
    },

    clearOfflineDrillSlice: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.errMsg = "";
      state.offlineDrillData = {};
      state.submittedFormData = [];
      state.initialDrillData = {};
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
  saveInitialDrill,
  fetchingSuccess,
  clearOfflineDrillSlice,
} = offlineDrillsSlice.actions;
export default offlineDrillsSlice.reducer;
