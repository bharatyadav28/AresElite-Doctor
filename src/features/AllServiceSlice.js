import { createSlice } from "@reduxjs/toolkit";

const AllServicesSlice = createSlice({
  name: "AllServices",
  initialState: {
    services: [],
  },
  reducers: {
    ServicesFetch: (state, action) => {
      state.services = action.payload;
    },
  },
});

export const { ServicesFetch } = AllServicesSlice.actions;
export default AllServicesSlice.reducer;
