import { createSlice } from "@reduxjs/toolkit";

const FormSlice = createSlice({
  name: "forms",
  initialState: {
    isFormFetching: false,
    error: false,
    errMsg: "",
  },
  reducers: {
    FormStart: (state, action) => {
      state.isFormFetching = true;
      state.error = false;
    },
    FormSuccess: (state, action) => {
      state.errMsg = "";
      state.error = false;
      state.isFormFetching = false;
    },
    FormFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFormFetching = false;
      state.error = true;
    },
  },
});

export const { FormFailure, FormStart, FormSuccess } = FormSlice.actions;
export default FormSlice.reducer;
