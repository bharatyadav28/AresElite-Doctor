import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DoctorMonthlyPackagePlans from "./DoctorPlans_Monthly_Package";
import { useLocation } from "react-router-dom";

const DoctorInOffice = ({ navigate }) => {
  const location = useLocation();
  useEffect(() => {
    // Check if selectedService is empty in localStorage
    const storedSelectedService = localStorage.getItem("selectedService");
    const clientId = localStorage.getItem("client_id");
    console.log(clientId);
    // if (storedSelectedService && clientId) {
    // } else {
    //   navigate("/doctor/dashboard/doctor-service-selection");
    // }
  }, [navigate]);
  const { isFetching } = useSelector((state) => state.auth);
  const [selectedInOfficeType, setSelectedInOfficeType] = useState("");
  const [showDoctorMonthly, setShowDoctorMonthly] = useState(false);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    // alert(selectedInOfficeType);
    setShowDoctorMonthly(true);
  };

  const handleInOfficeTypeChange = (event) => {
    setSelectedInOfficeType(event.target.value);
    const searchParams = new URLSearchParams(location.search);
    console.log(searchParams);
    searchParams.set("frequency", event.target.value); // Use set instead of append
    navigate({ search: searchParams.toString() }, { replace: true });
  };
  return (
    <>
      {showDoctorMonthly ? (
        <>
          <DoctorMonthlyPackagePlans
            freq={selectedInOfficeType}
            type="in_office"
          />
        </>
      ) : (
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
                <label
                  htmlFor="monthly"
                  className={`radio-label ${
                    selectedInOfficeType === "Monthly" ? "checked" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id="monthly"
                    value="Monthly"
                    checked={selectedInOfficeType === "Monthly"}
                    onChange={handleInOfficeTypeChange}
                  />
                  Monthly
                </label>

                <label
                  htmlFor="Packages"
                  className={`radio-label ${
                    selectedInOfficeType === "Packages" ? "checked" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id="Packages"
                    value="Packages"
                    checked={selectedInOfficeType === "Packages"}
                    onChange={handleInOfficeTypeChange}
                  />
                  Packages
                </label>
              </div>

              <Button
                type="submit"
                className="purple-button "
                style={{ width: "332px", height: "62px" }}
                disabled={!selectedInOfficeType}
              >
                Continue
              </Button>
            </Form>
          </section>
        </>
      )}
    </>
  );
};

export default DoctorInOffice;
