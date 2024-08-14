import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VerifyAthelete } from "../../features/apiCall";
import "../../styles/modal.css";
import {toast} from "react-toastify"

const DoctorSelectUser = () => {
  const { isFetching } = useSelector((state) => state.auth);
  const [selectedUserType, setSelectedUserType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false); // Track form submission success
const handleExistinuserLogin=()=>{
   const user= localStorage.getItem("client_id")
   if(user){
   
    navigate("/doctor/dashboard/doctor-service-selection");
   }
}
  useEffect(() => {
    localStorage.removeItem("selectedService");
    handleExistinuserLogin()
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (selectedUserType === "New") {
      navigate("/doctor/dashboard/client_form");
    } else if (selectedUserType === "Existing") {
      console.log("modal opened for verification");
      setSuccess(true);
    }
  };

  const handleUserTypeChange = (event) => {
    setSelectedUserType(event.target.value);
  };

  const handleVerification = async (email) => {
    console.log(email);
    try {
      const success = await VerifyAthelete(dispatch, { email });
      if (success) {
        navigate("/doctor/dashboard/doctor-service-selection");
      }
    } catch (error) {
      alert(error);
    }
    setShowModal(false); // Close the modal after verification
  };

  return (
    <>
      <section className="text-center d-flex flex-column justify-content-center align-items-center select-user h-100">
        {success ? (
          <SucessContent
            handleVerification={handleVerification}
            className="verification-athelete"
            success={success}
            setSuccess={setSuccess}
          />
        ) : (
          <>
            <div className="text-left" style={{ width: "400px" }}>
              <h4 style={{ fontWeight: "700" }}>Select User</h4>
              <p className="text-muted">
                Please select Type of user that you want to treat
              </p>
            </div>

            <Form
              className="d-flex flex-wrap justify-content-center "
              style={{ gap: "30px" }}
              onSubmit={handleSubmit}
            >
              <div className="radio-container">
                <label
                  htmlFor="newUser"
                  className={`radio-label ${
                    selectedUserType === "New" ? "checked" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id="newUser"
                    value="New"
                    checked={selectedUserType === "New"}
                    onChange={handleUserTypeChange}
                  />
                  New Users
                </label>

                <label
                  htmlFor="existingUser"
                  className={`radio-label ${
                    selectedUserType === "Existing" ? "checked" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id="existingUser"
                    value="Existing"
                    checked={selectedUserType === "Existing"}
                    onChange={handleUserTypeChange}
                  />
                  Existing Users
                </label>
              </div>
              <Button
                type="submit"
                className="purple-button "
                style={{ width: "400px", height: "60px", marginTop: "0px" }}
                disabled={!selectedUserType}
              >
                Continue
              </Button>
            </Form>
          </>
        )}
      </section>
    </>
  );
};

export default DoctorSelectUser;

const SucessContent = ({
  handleClose,
  handleVerification,
  className,
  success,
  setSuccess,
}) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { isFetching } = useSelector((state) => state.auth);
  const [verificationStarted, setVerificationStarted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setVerificationStarted(true);
      await handleVerification(email);
    }
    else{
       toast.error("Please enter an email")
    }
  };
  const handleGoBack = () => {
    setSuccess(false);
  };

  const handleCancel = () => {
    // Handle cancel action, stop verification
    setVerificationStarted(false);
  };
  return (
    <>
      <button onClick={handleGoBack} className="m-2 p-0 mb-4 " id="back_bt">
        <img src="/images/icon/back.svg" alt="back" width={30} />
      </button>
      <section className={className}>
        <div className="text-left" style={{ width: "400px" }}>
          <h4 style={{ fontWeight: "700" }}>Verify User</h4>
          <p className="text-muted">
            Please enter email to verify a existing user{" "}
          </p>
        </div>
        <Form
          onSubmit={handleSubmit}
          className="m-auto"
          style={{ width: "400px" }}
        >
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter Existing Email ID"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="mb-3 "
            style={{ height: "60px" }}
          />
          {/* <div className="d-flex"> */}
          {/* <button type="submit" className="bt-4 w-100 bt-5">
            {isFetching ? (
              <>
                <Spinner size="sm" animation="border" />
              </>
            ) : (
              <>Verify</>
            )}
          </button>{" "}
          <button type="button" className="bt-6 w-100">
            Cancel
          </button> */}
          <button
            type="submit"
            className="purple-button p-0"
            style={{ width: "400px", height: "58px", marginTop: "26px" }}
          >
            {isFetching ? (
              <>
                <Spinner size="sm" animation="border" />
              </>
            ) : (
              <>Verify</>
            )}
          </button>

          {/* </div> */}
        </Form>
        <button
          onClick={handleGoBack}
          className="purple-button-2 p-0"
          style={{ width: "400px", height: "58px", marginTop: "15px" }}
        >
          Cancel
        </button>
      </section>
    </>
  );
};
