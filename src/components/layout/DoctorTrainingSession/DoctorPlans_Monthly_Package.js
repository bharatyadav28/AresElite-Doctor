import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addTrainingSession,
  Gettrainingsession,
  selecttrainingplan,
} from "../../../features/apiCall";
import BootstrapModal from "../Components/BootstrapModal";
import { useLocation } from "react-router-dom";

const DoctorMonthlyPlans = ({ navigate, type, freq }) => {
  const [showMonthlyPlans, setShowMonthlyPlans] = useState(false);
  const { isFetching, userName } = useSelector((state) => state.auth);
  const [plans, setplans] = useState([]);
  const [plansSubtype, setplansSubtype] = useState("");
  const [selectedMonthlyPlans, setSelectedMonthlyPlans] = useState("");
  const dispatch = useDispatch();
  const navigate2 = useNavigate();

  const location = useLocation();

  // Get search params from URL
  const searchParams = new URLSearchParams(location.search);

  // Get a specific parameter
  const appointmentID = searchParams.get("appointment_id");
  const addSession = searchParams.get("add_session");

  console.log("add Session", addSession);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    navigate2("/doctor/dashboard");
  };

  const handleGettrainingsessionPlans = async () => {
    let frequencyType = "";
    if (freq === "Monthly") {
      frequencyType = "per_month";
    } else if (freq == "Packages") {
      frequencyType = "package";
    } else {
      frequencyType = "package";
    }

    const res = await Gettrainingsession(dispatch, {
      type: type,
      frequencyType: frequencyType,
    });
    console.log(res?.trainigSessionModel);
    setplans(res?.trainigSessionModel);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    // alert(selectedMonthlyPlans);
    const clientId = localStorage.getItem("client_id");
    const sessionId = selectedMonthlyPlans;
    console.log("add Session", addSession);

    let contModal = false;

    if (addSession === "true") {
      const { success, message } = await addTrainingSession(dispatch, {
        clientId,
        sessionId,
        doctorName: userName,
        service_type: "TrainingSessions",
        appointmentId: appointmentID,
        addSession,
      });
      contModal = success;
    } else {
      const { success, message } = await selecttrainingplan(dispatch, {
        clientId,
        sessionId,
        doctorName: userName,
        service_type: "TrainingSessions",
        appointmentId: appointmentID,
        addSession,
      });
      contModal = success;
    }

    if (contModal) {
      setShowModal(true);
      localStorage.removeItem("client_id");
      localStorage.removeItem("ath-fname");
      localStorage.removeItem("ath-lname");
      localStorage.removeItem("ath-email");
      localStorage.removeItem("ath-plan-payment");
    }
  };

  const handleMonthlyPlansChange = (event) => {
    console.log(event.target.value);
    setSelectedMonthlyPlans(event.target.value);
  };
  useEffect(() => {
    // const storedSelectedService = localStorage.getItem("selectedService");
    // const clientId = localStorage.getItem("client_id");
    // if (storedSelectedService && clientId) {
    // } else {
    //   // If empty, navigate to the desired page
    //   navigate("/doctor/dashboard/doctor-service-selection");
    // }

    handleGettrainingsessionPlans();
  }, []);

  return (
    <>
      <section
        className="text-center d-flex flex-column justify-content-center align-items-center select-user"
        style={{ gap: "3vh" }}
      >
        <div className="text-left mb-3" style={{ width: "400px" }}>
          <h4 className="mb-0">Available Plans</h4>
          <p className="text-muted">Please Select type of Plan</p>
        </div>
        <Form
          className="d-flex flex-wrap justify-content-center "
          style={{ gap: "24px" }}
          onSubmit={handleSubmit}
        >
          <div className="radio-container">
            {plans?.map((option) => (
              <label
                key={option._id}
                htmlFor={option._id}
                className={`radio-label ${
                  selectedMonthlyPlans === option._id ? "checked" : ""
                }`}
              >
                <div className="d-flex justify-content-between w-100 p-3">
                  {" "}
                  <input
                    type="radio"
                    id={option._id}
                    value={option._id}
                    checked={selectedMonthlyPlans === option._id}
                    onChange={handleMonthlyPlansChange}
                  />
                  {`${option.sessions} Sessions`}
                  {option.frequency == "per_month" ? ` per month` : ` in total`}
                  <div>${option.cost}</div>
                </div>
              </label>
            ))}
          </div>

          <Button
            type="submit"
            className="purple-button "
            style={{ width: "332px", height: "62px" }}
            disabled={!selectedMonthlyPlans}
          >
            Continue
          </Button>
        </Form>{" "}
        <BootstrapModal
          showModal={showModal}
          handleClose={handleClose}
          modalTitle={""}
          modalContent={<ModalContent />}
        />
      </section>
    </>
  );
};

export default DoctorMonthlyPlans;
const ModalContent = () => {
  return (
    <section className="text-center">
      <img
        src="/images/icons/formTick.svg"
        alt="payment-icon"
        className="mb-4"
      />
      <div className="d-flex check-your-box-texts">
        <h5>Training Frequency Selected!!</h5>
        <p>
          Training frequency has been selected to the user.
          <br /> Payment Confirmation has been sent to Client’s Email Id.
        </p>
      </div>
    </section>
  );
};
