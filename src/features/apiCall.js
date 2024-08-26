import { toast } from "react-toastify";
import axios from "../utils/axios.js";
import { parseError } from "../utils/parseError.js";
import { FormFailure, FormStart, FormSuccess } from "./FormSlice.js";
import { AppFailure, AppStart, AppSuccess } from "./appointSlice.js";
import {
  Failure,
  Start,
  Success,
  loginFailure,
  loginStart,
  loginSuccess,
} from "./authSlice.js";
import { FetchFailure, FetchStart, FetchSuccess } from "./fetchSlice.js";

import {
  fetchingStart,
  saveDrillsData,
  fetchingFailure,
  saveInitialDrill,
  fetchingSuccess,
} from "./offlineDrillsSlice.js";

const ErrorToastOptions = {
  position: "bottom-center",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};
const successToastOptions = {
  position: "top-center",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());

  const { email, password } = user;

  try {
    const { data } = await axios.post("/api/doctor/login", { email, password });
    // console.log(data);
    toast.success("Logged in Sucessfully!", successToastOptions);
    dispatch(loginSuccess(data));
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(loginFailure(errorMessage));
  }
};
export const SendOtp = async (dispatch, email) => {
  dispatch(Start());
  // const { email } = email;

  try {
    const { data } = await axios.post(
      "/api/doctor/send-forgot-password-code",
      email
    );
    toast.success("OTP Sent!", successToastOptions);
    dispatch(Success(data));
    return true;
  } catch (error) {
    console.log(error);
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(Failure(errorMessage));
    return false;
  }
};
export const VerifyOtp = async (dispatch, { email, code }) => {
  dispatch(Start());

  try {
    const { data } = await axios.post("/api/doctor/validate-code", {
      email,
      code,
    });
    // console.log(data);
    toast.success("Verified!", successToastOptions);
    dispatch(Success(data));
    return true;
  } catch (error) {
    // console.log(error);
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(Failure(errorMessage));
    return false;
  }
};
export const ResetPassword = async (
  dispatch,
  { email, newPassword, confirmPassword }
) => {
  dispatch(Start());
  try {
    const { data } = await axios.put("/api/doctor/reset-password", {
      email,
      newPassword,
      confirmPassword,
    });
    toast.success("Password changed successfully", successToastOptions);
    dispatch(Success(data));
    return true;
  } catch (error) {
    // console.log(error);
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(Failure(errorMessage));
  }
};
export const UpdatePassword = async (
  dispatch,
  { email, newPassword, oldPassword }
) => {
  const token = localStorage.getItem("userToken");

  dispatch(Start());
  try {
    const { data } = await axios.put(
      "/api/doctor/update-password",
      {
        email,
        newPassword,
        oldPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Password updated successfully", successToastOptions);
    dispatch(Success(data));
    return true;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(Failure(errorMessage));
    return false;
  }
};
export const GetProfileDetails = async (dispatch) => {
  const email = localStorage.getItem("userEmail");
  const token = localStorage.getItem("userToken");

  dispatch(Start());
  try {
    const { data } = await axios.get("/api/doctor/get-profile", {
      params: { email }, // Corrected: pass email as an object
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(Success(data));
    return data;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(Failure(errorMessage));
    return false; // Return false to indicate that the request failed
  }
};
export const UpdateProfileDetails = async (dispatch, { formData, userId }) => {
  const email = localStorage.getItem("userEmail");
  const token = localStorage.getItem("userToken");

  dispatch(Start());
  alert(userId);
  try {
    const { data } = await axios.put(
      `/api/doctor/update-profile-doctor`,
      formData,
      {
        params: { userId },
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    toast.success("Profile Updated Successfully!", successToastOptions);

    dispatch(Success(data));
    return data;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(Failure(errorMessage));
    return false; // Return false to indicate that the request failed
  }
};
export const GetTodayAppointmentDetails = async (dispatch, todayDate) => {
  const token = localStorage.getItem("userToken");
  dispatch(FetchStart());
  try {
    const { data } = await axios.get(`/api/doctor/appointments/${todayDate}`, {
      // params: { date: todayDate },
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(
      FetchSuccess({ type: "FETCH_APPOINTMENTS_SUCCESS", payload: data })
    );
    return data;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(FetchFailure(errorMessage));
    return false; // Return false to indicate that the request failed
  }
};
export const GetAllAppointmentDetails = async (dispatch, params) => {
  const token = localStorage.getItem("userToken");
  dispatch(FetchStart());
  try {
    const { data } = await axios.get(`/api/doctor/get-all-appointments`, {
      params: params,
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(
      FetchSuccess({ type: "FETCH_ALL_APPOINTMENTS_SUCCESS", payload: data })
    );
    return data;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(FetchFailure(errorMessage));
    return false; // Return false to indicate that the request failed
  }
};

export const GetRecentPrescriptions = async (
  dispatch,
  { currentPage, pageSize, searchQuery, selectedServiceTypes, selectedDate }
) => {
  // console.log(searchQuery, currentPage);
  const token = localStorage.getItem("userToken");
  dispatch(FetchStart());
  try {
    console.log(searchQuery, currentPage);

    const { data } = await axios.get("/api/doctor/recent-prescriptions", {
      params: {
        page_no: currentPage,
        per_page_count: pageSize,
        service_type: selectedServiceTypes,
        date: selectedDate,
        searchQuery: searchQuery,
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(
      FetchSuccess({ type: "FETCH_PRESCRIPTIONS_SUCCESS", payload: data })
    );
    return data;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(FetchFailure(errorMessage));
    return false; // Return false to indicate that the request failed
  }
};
export const GetCompletedRequests = async (
  dispatch,
  { currentPage, pageSize, searchQuery, selectedServiceTypes, selectedDate }
) => {
  // console.log(searchQuery, currentPage);
  const token = localStorage.getItem("userToken");
  dispatch(FetchStart());
  try {
    // console.log(searchQuery, currentPage);

    const { data } = await axios.get("/api/doctor/get-completed-req", {
      params: {
        page_no: currentPage,
        per_page_count: pageSize,
        service_type: selectedServiceTypes,
        date: selectedDate,
        searchQuery: searchQuery,
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(
      FetchSuccess({ type: "FETCH_COMPLETED_REQUESTS_SUCCESS", payload: data })
    );
    return data;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(FetchFailure(errorMessage));
    return false; // Return false to indicate that the request failed
  }
};
export const GetPlans = async (dispatch) => {
  const token = localStorage.getItem("userToken");
  dispatch(FetchStart());
  try {
    const { data } = await axios.get("/api/doctor/get-plans", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(FetchSuccess({ type: "FETCH_PLANS_SUCCESS", payload: data }));
    return data;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(FetchFailure(errorMessage));
    return false; // Return false to indicate that the request failed
  }
};
export const GetPrescriptionForm = async (dispatch, { appointmentId }) => {
  dispatch(FetchStart());
  const token = localStorage.getItem("userToken");
  // console.log(appointmentId);
  try {
    const { data } = await axios.get(
      "/api/doctor/get-prescriptions",

      {
        params: { prescriptionId: appointmentId },
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log(data);
    dispatch(FetchSuccess({ type: "FETCH_PRESCRIPTION_FORM", payload: data }));
    return true;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(FetchFailure(errorMessage));
    return false; // Return false to indicate that the request failed
  }
};
export const GetEvalDiaForm = async (dispatch, { appointmentId }) => {
  dispatch(FetchStart());
  const token = localStorage.getItem("userToken");
  try {
    const { data } = await axios.get("/api/doctor/get-evaluations", {
      params: { evaluationId: appointmentId },
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(FetchSuccess({ type: "FETCH_EVAL_DIAG_FORM", payload: data }));
    return true;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(FetchFailure(errorMessage));
    return false; // Return false to indicate that the request failed
  }
};

export const Gettrainingsession = async (dispatch, { type, frequencyType }) => {
  dispatch(FetchStart());
  const token = localStorage.getItem("userToken");
  try {
    const { data } = await axios.get("/api/doctor/training-session", {
      params: { session_type: type, frequencyType: frequencyType },
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(FetchSuccess({ type: "FETCH_Session_SUCCESS", payload: data }));
    return data;
  } catch (error) {}
};

export const selecttrainingplan = async (dispatch, { clientId, sessionId }) => {
  dispatch(FetchStart());
  const token = localStorage.getItem("userToken");
  try {
    console.log(clientId, sessionId);
    const { data } = await axios.post(
      `/api/doctor/buy-training-session?clientId=${clientId}&sessionId=${sessionId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(FetchSuccess({ type: "FETCH_Session_SUCCESS", payload: data }));

    return { success: true, message: "" };
  } catch (error) {
    return { success: false, message: error };
  }
};
export const GetRecentBookings = async (
  dispatch,
  {
    currentPage,
    pageSize,
    searchQuery,
    selectedStatus,
    selectedServiceTypes,
    selectedDate,
  }
) => {
  dispatch(FetchStart());
  const token = localStorage.getItem("userToken");
  try {
    const { data } = await axios.get("/api/doctor/recent-bookings", {
      params: {
        page_no: currentPage,
        per_page_count: pageSize,
        status: selectedStatus,
        service_type: selectedServiceTypes,
        date: selectedDate,
        searchQuery: searchQuery,
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(data);
    dispatch(FetchSuccess({ type: "FETCH_BOOKINGS_SUCCESS", payload: data }));
    return true;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(FetchFailure(errorMessage));
    return false; // Return false to indicate that the request failed
  }
};
export const GetInQueueRequests = async (
  dispatch,
  { currentPage, pageSize, selectedServiceTypes, selectedDate, searchQuery }
) => {
  dispatch(FetchStart());
  const token = localStorage.getItem("userToken");
  try {
    const { data } = await axios.get("/api/doctor/in-queue-requests", {
      params: {
        page_no: currentPage,
        per_page_count: pageSize,
        service_type: selectedServiceTypes,
        date: selectedDate,
        searchQuery: searchQuery,
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(data);
    dispatch(FetchSuccess({ type: "FETCH_INQUEUE_SUCCESS", payload: data }));
    return data;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(FetchFailure(errorMessage));
    return false; // Return false to indicate that the request failed
  }
};
export const getAlls = async (dispatch, { selectedDate, doctor } = {}) => {
  const selectedService = localStorage.getItem("selectedService");
  dispatch(AppStart());
  const token = localStorage.getItem("userToken");
  try {
    const params = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (selectedDate) {
      params.params = { ...params.params, date: selectedDate };
    }

    if (doctor) {
      params.params = { ...params.params, doctor };
    }

    if (selectedService) {
      params.params = { ...params.params, service_type: selectedService };
    }

    const { data } = await axios.get("/api/doctor/get-slots", params);

    dispatch(AppSuccess(data));
    return data;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(AppFailure(errorMessage));
    return false;
  }
};

export const Plans = async (dispatch, { name, phase, ClientId }) => {
  dispatch(AppStart());
  const token = localStorage.getItem("userToken");
  try {
    console.log(ClientId);

    const data = await axios.put(
      `/api/doctor/select-plan?userId=${ClientId}&plan=${name}&planPhase=${
        phase.name
      }&mode=${localStorage.getItem("mode")}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    dispatch(AppSuccess(data));
    return data;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(AppFailure(errorMessage));
    return false;
  }
};
export const GetDrillDetails = async (
  dispatch,
  { selectedWeek, appointmentId, clientId }
) => {
  dispatch(FetchStart());
  const token = localStorage.getItem("userToken");
  try {
    const data = await axios.get(
      `/api/doctor/get-Drills?clientId=${clientId}&week=${selectedWeek}&appointmentId=${appointmentId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(FetchSuccess({ type: "FETCH_DRILL_WEEKS", payload: data.data }));
    return data;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(FetchFailure(errorMessage));
    return false;
  }
};

export const fetchAvailableAppointments = async (
  dispatch,
  { selectedDoctor }
) => {
  dispatch(FetchStart());
  const token = localStorage.getItem("userToken");
  try {
    const { data } = await axios.post(
      "/api/doctor/get-slots",
      JSON.stringify({ doctor: selectedDoctor }), // Stringify the object
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Add content type header
        },
      }
    );
    dispatch(FetchSuccess({ type: "FETCH_SLOTS_SUCCESS", payload: data }));
    return data;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(FetchFailure(errorMessage));
    return false; // Return false to indicate that the request failed
  }
};

export const appointment = async (dispatch, formData) => {
  const email = localStorage.getItem("userEmail");
  const token = localStorage.getItem("userToken");
  const client_id = localStorage.getItem("client_id");

  const selectedService = localStorage.getItem("selectedService");
  const { selectedDate, appTime, endTime, doctor, location } = formData;
  dispatch(Start());
  try {
    const { data } = await axios.post(
      `/api/doctor/book-appointment/${client_id}`,
      {
        service_type: selectedService,
        app_date: selectedDate,
        app_time: appTime,
        end_time: endTime,
        doctor_trainer: doctor,
        location: location,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    toast.success(data.message);
    dispatch(Success(data));

    return true;
  } catch (error) {
    console.log(error);
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(Failure(errorMessage));
  }
};
export const SubmitClientForm = async (dispatch, { formData }) => {
  const token = localStorage.getItem("userToken");
  dispatch(FormStart());
  try {
    const { data } = await axios.post(
      "/api/doctor/new-client-registration",
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        suffix: formData.suffix,
        email: formData.email,
        city: formData.city,
        phone: formData.phone,
        state: formData.state,
        dob: formData.dob,
        gender: formData.gender,
        address: formData.address,
        zip: formData.zip,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log(data);
    dispatch(FormSuccess(data));

    return true;
  } catch (error) {
    console.log(error);
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(FormFailure(errorMessage));
  }
};
export const SubmitDrillForm = async (dispatch, { activityId, formData }) => {
  const token = localStorage.getItem("userToken");
  dispatch(FormStart());
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let url = `/api/doctor/update-drill?id=${activityId}`;
    if (activityId) {
      if (formData) {
        // If formData is present, include it in the request body
        const { data } = await axios.put(url, { form: formData }, config);
        dispatch(FormSuccess(data));
      } else {
        // If formData is not present, make a GET request with only query parameters
        const { data } = await axios.put(url, "", config);
        dispatch(FormSuccess(data));
      }
    }
    return true;
  } catch (error) {
    console.log(error);
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(FormFailure(errorMessage));
  }
};

export const SubmitForm = async (
  dispatch,
  { form, appointmentId, formData }
) => {
  const token = localStorage.getItem("userToken");
  dispatch(FormStart());
  let url;
  switch (form) {
    case "Prescription":
      url = "/api/doctor/submit-pres-form";
      break;
    case "Evaluation":
      url = "/api/doctor/submit-eval-form";
      break;
    case "Diagnosis":
      url = "/api/doctor/submit-diagnosis-form";
      break;
    default:
      throw new Error("Invalid form type");
  }

  try {
    const { data } = await axios.post(
      url,
      { form: formData, appointmentId: appointmentId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(FormSuccess(data));
    return true;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(FormFailure(errorMessage));
    return false;
  }
};

export const VerifyAthelete = async (dispatch, { email }) => {
  const token = localStorage.getItem("userToken");
  dispatch(Start());
  try {
    const { data } = await axios.post(
      "/api/doctor/existing-client-verification",
      { email },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    localStorage.setItem("client_id", data?.client_details?.client_id);
    localStorage.setItem("ath-fname", data?.client_details?.first_name);
    localStorage.setItem("ath-lname", data?.client_details?.last_name);
    localStorage.setItem("ath-email", data?.client_details?.email);
    // console.log(data?.client_details?.first_name);
    dispatch(Success(data));
    toast.success("Your Athelete with this email exits!");
    return true;
  } catch (error) {
    console.log(error);
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(Failure(errorMessage));
  }
};
export const GetServiceTypes = async (dispatch) => {
  dispatch(FetchStart());
  const token = localStorage.getItem("userToken");
  try {
    const { data } = await axios.get("/api/doctor/getServiceTypes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(data);
    dispatch(FetchSuccess({ type: "FETCH_Services_SUCCESS", payload: data }));
    return data;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(FetchFailure(errorMessage));
    return false; // Return false to indicate that the request failed
  }
};

export const getofflineDrillsData = async (dispatch) => {
  const token = localStorage.getItem("userToken");
  dispatch(fetchingStart());
  try {
    const { data } = await axios.get("/api/doctor/drill_inputs", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const initialDrill = {};
    data?.data?.columns?.forEach((column) => {
      initialDrill[column.alias] = "";
    });

    dispatch(saveInitialDrill(initialDrill));

    dispatch(
      saveDrillsData({
        columns: data.data.columns,
        drills: data.data.drills,
      })
    );
    return data;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(fetchingFailure(errorMessage));
    return false; // Return false to indicate that the request failed
  }
};

export const submitSessionDrills = async (dispatch, data, cid, aid) => {
  const token = localStorage.getItem("userToken");
  dispatch(fetchingStart());
  try {
    await axios.post(`/api/doctor/offline-drill/${cid}/${aid}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Session saved successfully", successToastOptions);
    dispatch(fetchingSuccess());
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(fetchingFailure(errorMessage));
    return false; // Return false to indicate that the request failed
  }
};

export const getSessionDrills = async (dispatch, cid, aid) => {
  const token = localStorage.getItem("userToken");
  dispatch(fetchingStart());
  try {
    const { data } = await axios.get(
      `/api/doctor/offline-drill/${cid}/${aid}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(fetchingSuccess());
    const sessionsData = {
      createdAt: data?.result?.createdAt,
      sessions: data?.result?.sessions || [],
    };

    return sessionsData;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    dispatch(fetchingFailure(errorMessage));
    return false; // Return false to indicate that the request failed
  }
};
