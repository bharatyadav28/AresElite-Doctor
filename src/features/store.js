import { configureStore } from "@reduxjs/toolkit";

import FormReducer from "./FormSlice";
import appointReducer from "./appointSlice";
import authReducer from "./authSlice";
import FetchReducer from "./fetchSlice";
import offlineDrillsReducer from "./offlineDrillsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    forms: FormReducer,
    fetch_app: FetchReducer,
    appointment: appointReducer,
    offlineDrills: offlineDrillsReducer,
  },
});
