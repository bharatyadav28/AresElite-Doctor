import { createSlice } from "@reduxjs/toolkit";

const fetchSlice = createSlice({
  name: "fetch_app",
  initialState: {
    isFetching: false,
    error: false,
    errMsg: "",
    appointments: [],
    totalWeeks: "",
    completePercentage: "",
    Allappointments: [],
    Presform: [],
    Eval_Dia_form: [],
    drill_week_details: [],
    inqueue: [],
    slots: [],
    doctors: [],
    completed: [],
    prescriptions: [],
    totalPages: "",
    bookings: [],
    Get_Plans: [],
  },
  reducers: {
    FetchStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },

    FetchSuccess: (state, action) => {
      state.errMsg = "";
      state.error = false;
      state.isFetching = false;
      switch (action.payload.type) {
        case "FETCH_APPOINTMENTS_SUCCESS":
          state.appointments = action.payload.payload.appointments;
          break;
        case "FETCH_SLOTS_SUCCESS":
          state.slots = action.payload.payload.slots;
          break;
        case "FETCH_DOCTORS_SUCCESS":
          state.doctors = action.payload.payload.doctors;
          break;
        case "FETCH_PRESCRIPTIONS_SUCCESS":
          state.prescriptions = action.payload.payload.appointments;
          state.totalPages = action.payload.payload.totalPages;

          break;
        case "FETCH_ALL_APPOINTMENTS_SUCCESS":
          state.Allappointments = action.payload.payload;
          break;
        case "FETCH_INQUEUE_SUCCESS":
          state.inqueue = action.payload.payload.appointments;
          state.totalPages = action.payload.payload.totalPages;

          break;
        case "FETCH_COMPLETED_REQUESTS_SUCCESS":
          state.completed = action.payload.payload?.appointments;
          state.totalPages = action.payload.payload.totalPages;

          break;
        case "FETCH_BOOKINGS_SUCCESS":
          state.bookings = action.payload.payload.appointments;
          state.totalPages = action.payload.payload.totalPages;
          break;
        case "FETCH_PRESCRIPTION_FORM":
          state.Presform = action.payload.payload.form;

          break;
        case "FETCH_PLANS_SUCCESS":
          state.Get_Plans = action.payload.payload.plans;

          break;
        case "FETCH_EVAL_DIAG_FORM":
          state.Eval_Dia_form = action.payload.payload;

          break;
        case "FETCH_DRILL_WEEKS":

        default:
          // Handle default case if necessary
          break;
      }
    },
    FetchFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { FetchFailure, FetchStart, FetchSuccess } = fetchSlice.actions;
export default fetchSlice.reducer;
