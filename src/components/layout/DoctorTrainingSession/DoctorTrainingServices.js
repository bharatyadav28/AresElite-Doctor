import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import VerifiedLayout from "../Components/verifiedLayout";
import DoctorInOffice from "./DoctorInOffice.js";
import DoctorMonthlyPlans from "./DoctorPlans_Monthly_Package";
import { Button, Form, Spinner } from "react-bootstrap";
const DoctorTrainingServices = () => {
  const navigate = useNavigate();
  const { isFetching } = useSelector((state) => state.auth);
  const [showDoctorInOffice, setShowDoctorInOffice] = useState(false);
  const [selectedTrainingType, setSelectedTrainingType] = useState("");
  const dispatch = useDispatch();

  const location= useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDoctorInOffice(true);
  

  };

  const handleTrainingTypeChange = (event) => {
    setSelectedTrainingType(event.target.value);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("session_type", event.target.value);
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  
  // useEffect(() => {
  //   const storedSelectedService = localStorage.getItem("selectedService");
  //   const clientId = localStorage.getItem("client_id");
  //   console.log('jjj', storedSelectedService);
  //   console.log('ttt', clientId);
  //   // if (storedSelectedService && clientId) {
  //   // } else {
  //   //   // If empty, navigate to the desired page
  //   //   navigate("/doctor/dashboard/doctor-service-selection");
  //   // }
  // }, []);

  return (
    <VerifiedLayout>
      {showDoctorInOffice ? (
        <>
          {selectedTrainingType == "InOffice" ? (
            <>
              <DoctorInOffice navigate={navigate} />
            </>
          ) : (
            <>
              {" "}
              <DoctorMonthlyPlans navigate={navigate} type="tele_session" freq="Packages" />
            </>
          )}
        </>
      ) : (
        <>
          {" "}
          <section
            className="text-center d-flex flex-column  align-items-center select-user "
            style={{ gap: "3vh",postion:"relative" }}
          >
            <div className="text-left mb-3" style={{ width: "400px" }}>
              <h4 className="mb-0">Select type of Plan</h4>
              <p className="text-muted">Please Select type of Plan</p>
            </div>
            <Form
              className="d-flex flex-wrap justify-content-center "
              style={{ gap: "24px"}}
              onSubmit={handleSubmit}
            >
              <div className="radio-container">
                <label
                  htmlFor="inOfficeUser"
                  className={`radio-label ${
                    selectedTrainingType === "InOffice" ? "checked" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id="inOfficeUser"
                    value="InOffice"
                    checked={selectedTrainingType === "InOffice"}
                    onChange={handleTrainingTypeChange}
                  />
                  In Office
                </label>

                {/* <label
                  htmlFor="teleSessionsUser"
                  className={`radio-label ${
                    selectedTrainingType === "TeleSessions" ? "checked" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id="teleSessionsUser"
                    value="TeleSessions"
                    checked={selectedTrainingType === "TeleSessions"}
                    onChange={handleTrainingTypeChange}
                  />
                  Tele Sessions
                </label> */}
                <label
                  htmlFor="teleSessionsUser"
                  className={`radio-label ${
                    selectedTrainingType === "TeleSessions" ? "checked" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id="teleSessionsUser"
                    value="TeleSessions"
                    checked={selectedTrainingType === "TeleSessions"}
                    onChange={handleTrainingTypeChange}
                  />
                  Tele Sessions
                </label>
              </div>
             
            </Form>
            <div style={{position:"absolute", bottom:"30px"}}>
        {isFetching ? (
          <button className="purple-button c-b">
            <Spinner animation="border" variant="light" />
          </button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="purple-button"
            style={{ width: "332px", height: "62px" }}
            disabled={!selectedTrainingType}
          >
            Continue
          </Button>
        )}
        </div>
          </section>
        </>
      )}
    </VerifiedLayout>
  );
};

export default DoctorTrainingServices;
