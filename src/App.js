import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import SignIn from "./components/auth/SignIn";
import UpdatePassword from "./components/auth/password/UpdatePassword";
import ForgotPassword from "./components/auth/password/forgotPassword";
import DoctorTrainingServices from "./components/layout/DoctorTrainingSession/DoctorTrainingServices";
import DoctorAppointment from "./pages/DoctorAppointment";
import DoctorConsultationCall from "./pages/DoctorConsultationCall";
import DoctorForm from "./pages/DoctorForm";

import DoctorSelectUserType from "./pages/DoctorHome";
import DoctorInOffice from "./pages/DoctorInOffice";
import DoctorPlansPackages from "./pages/DoctorPlansPackages";
import DoctorProfile from "./pages/DoctorProfile";
import DoctorServiceSelection from "./pages/DoctorServiceSelection";
import { getAllServices } from "./features/apiCall.js";

import EditProfile from "./components/layout/EditProfile";
import DoctorExpandAppointments from "./pages/DoctorExpandAppointments";
import Client_Form from "./pages/Forms/Client_Form";
import PageNotFound from "./pages/PageNotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RecentBookings from "./pages/RecentBookings";
import RecentEvaluation2 from "./pages/RecentEvaluation2";
import RecentPrescriptions from "./pages/RecentPrescriptions";
import TermsOfUse from "./pages/TermsOfUse";
import "./App.css";
import "./styles/doctor.css";
import "./styles/login.css";
import "./styles/recent_bookings.css";

import Drill from "./pages/Drill";
import ViewEval_Dai from "./pages/ViewEval_Dia";
import ViewPrescriptionForm from "./pages/ViewPrescriptionForm";
import ErrorBoundary from "./utils/ErrorBoundary.js";
import ProtectedRoute from "./utils/ProtectedRoute";
import Drill2 from "./pages/Drill2";
import InitialDrillForm from "./pages/InitialDrillForm.js";
import SeasonForm from "./pages/SeasonForm.js";
import SubmittedDrills from "./pages/SubmittedDrills.js";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getAllServices(dispatch);
  }, [dispatch]);
  return (
    <>
      <ErrorBoundary>
        {/* <Router> */}
        <Routes>
          <Route path="/" element={<SignIn />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="*" element={<PageNotFound />} />

          <Route path="/doctor" element={<ProtectedRoute />}>
            <Route path="dashboard" element={<DoctorSelectUserType />} />
            <Route
              path="dashboard/all-appointments"
              element={<DoctorExpandAppointments />}
            />
            <Route path="dashboard/client_form" element={<Client_Form />} />
            <Route path="dashboard/profile" element={<DoctorProfile />} />
            <Route path="dashboard/edit-profile" element={<EditProfile />} />
            <Route
              path="dashboard/drill/:clientId/:appointmentId"
              // element={<Drill2/>}
              // element={<InitialDrillForm />}
              element={<SubmittedDrills />}
            />
            <Route
              path="dashboard/drill/:clientId/:appointmentId/start-drill"
              // element={<Drill2/>}
              // element={<SubmittedDrills />}
              element={<InitialDrillForm />}
            />
            <Route
              path="dashboard/doctor-service-selection"
              element={<DoctorServiceSelection />}
            />{" "}
            <Route
              path="dashboard/doctor-service-selection/training"
              element={<DoctorTrainingServices />}
            />
            <Route
              path="dashboard/doctor-inoffice"
              element={<DoctorInOffice />}
            />
            <Route
              path="dashboard/doctor-plans/:ClientId"
              element={<DoctorPlansPackages />}
            />
            <Route
              path="dashboard/consultation-call"
              element={<DoctorConsultationCall />}
            />
            <Route
              path="dashboard/appointment"
              element={<DoctorAppointment />}
            />
            {/* <Route path="/recent-evaluation" element={<RecentEvaluation />} /> */}
            <Route
              path="dashboard/recent-evaluation2"
              element={<RecentEvaluation2 />}
            />
            <Route
              path="dashboard/recent-prescription"
              element={<RecentPrescriptions />}
            />{" "}
            <Route
              path="dashboard/start-prescription/:appointmentId"
              element={<DoctorForm form="Prescription" />}
            />{" "}
            <Route
              path="dashboard/view-pres-form/:appointmentId"
              element={<ViewPrescriptionForm />}
            />{" "}
            <Route
              path="dashboard/view-eval-form/:appointmentId"
              element={<ViewEval_Dai />}
            />{" "}
            <Route
              path="dashboard/start-evaluation/:appointmentId"
              element={<DoctorForm form="Evaluation" />}
            />{" "}
            <Route
              path="dashboard/start-diagnosis/:appointmentId"
              element={<DoctorForm form="Diagnosis" />}
            />
            <Route
              path="dashboard/recent-bookings"
              element={<RecentBookings />}
            />
          </Route>
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
        </Routes>
        {/* </Router> */}
      </ErrorBoundary>
    </>
  );
}

export default App;
