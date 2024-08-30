import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HorizontalTimeline from "../components/layout/Components/HorizontalTimeline";
import VerifiedLayout from "../components/layout/Components/verifiedLayout";
import { appointment, getAlls } from "../features/apiCall";

const DoctorAppointment = () => {
  const servicetime = localStorage.getItem("selectedServiceTime");
  const [selectedDate, setSelectedDate] = useState(null);
  const { dates } = useSelector((state) => state.appointment);
  console.log(dates);
  const { locations } = useSelector((state) => state.appointment);
  const { slots } = useSelector((state) => state.appointment);
  const { isFetching } = useSelector((state) => state.appointment);
  const { isFetching: authIsFetching } = useSelector((state) => state.auth);
  const [success, setSuccess] = useState(false); // Track form submission success
  const [doctors, setDoctors] = useState([]); // Define doctors state here
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [doctorTrainer, setDoctorTrainer] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted:", {
      selectedDate: selectedDate.format("YYYY-MM-DD"),
      location,
      doctor,
      appTime: selectedTimeSlot !== null ? slots[selectedTimeSlot][0] : null,
      endTime: selectedTimeSlot !== null ? slots[selectedTimeSlot][1] : null,
    });
    const selectedDateFormatted = selectedDate.format(
      "YYYY-MM-DDT00:00:00.000"
    );

    try {
      const success = await appointment(dispatch, {
        selectedDate: selectedDateFormatted,
        location,
        doctor,
        appTime: selectedTimeSlot !== null ? slots[selectedTimeSlot][0] : null,
        endTime: selectedTimeSlot !== null ? slots[selectedTimeSlot][1] : null,
      });

      if (success) {
        setSuccess(true);
        setCurrentStep(3);
      }
    } catch (error) {
      // toast.error("Unexpected Error", ErrorToastOptions);
    }
  };

  const isValidDate = (current) => {
    // Disable dates that are before today
    return current.isAfter(moment().subtract(1, "day"));
  };

  const handleClose = () => {
    setShowModal(false);
    navigate("/doctor/dashboard/doctor-service-selection");
    localStorage.removeItem("selectedService");
  };
  const [currentStep, setCurrentStep] = useState(1); // Initially set to step 1

  const totalSteps = 3; // Total number of steps
  const labels = [
    "Select Service",
    "Appointment Information",
    "Payment Process",
  ]; // Labels for each step

  useEffect(() => {
    const fetchDates = async () => {
      try {
        await getAlls(dispatch);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        // Handle error, perhaps show an error toast
      }
    };

    fetchDates();
  }, []);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [doctor, setDoctor] = useState("");

  const handleTimeSlotChange = (id) => {
    setSelectedTimeSlot(id);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAvailable = async () => {
      try {
        const selectedDateFormatted = selectedDate.format(
          "YYYY-MM-DDT00:00:00.000"
        );
        await getAlls(dispatch, {
          selectedDate: selectedDateFormatted,
          doctor,
        });
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    if (selectedDate && doctor != "no") {
      fetchAvailable();
    }
  }, [selectedDate, doctor, dispatch]);

  useEffect(() => {
    if (locations && locations.length > 0 && location) {
      const filteredDoctors = locations
        .filter((loc) => loc.address === location)
        .map((loc) => loc.doctor);
      setDoctors(filteredDoctors);
    }
  }, [location, locations]);

  return (
    <VerifiedLayout>
      <HorizontalTimeline
        currentStep={currentStep}
        totalSteps={totalSteps}
        labels={labels}
        className="appointment"
      />
      {success ? (
        <SucessContent />
      ) : (
        <>
          <section
            className="text-center d-flex flex-column justify-content-center align-items-center appointment-cont "
            style={{ height: "450px", marginTop: "40px", overflow: 'scroll' }}
          >
            <form onSubmit={handleSubmit} style={{ width: "400px", overflow: 'scroll' }}>
              {/* Date input field */}
              <div className="form-group">
                <label htmlFor="date">Appointment Date:</label>
                <Datetime
                  isValidDate={isValidDate}
                  minDate={new Date()}
                  timeFormat={false}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setLocation("");
                    setDoctors([]);
                    setDoctor("");
                    setSelectedTimeSlot("");
                  }}
                  inputProps={{ placeholder: "Select Appointment Date " }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location:</label>
                <select
                  id="location"
                  className="form-control"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {isFetching ? (
                    <>
                      {" "}
                      <option>Hold ! on we are getting locations</option>
                    </>
                  ) : (
                    <>
                      {locations && locations.length > 0 ? (
                        <>
                          <option value="">Select Location</option>
                          {locations.map((loc, index) => (
                            <option key={index} value={loc.address}>
                              {loc.address}
                            </option>
                          ))}
                        </>
                      ) : (
                        <option value="">
                          NO LOCATIONS AVAILABLE ON THIS DATE
                        </option>
                      )}
                    </>
                  )}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="doctorTrainer">Doctor/Trainer:</label>
                <select
                  id="doctorTrainer"
                  className="form-control"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                >
                  <option value="">Select Doctor/Trainer</option>

                  {doctors && doctors.length > 0 ? (
                    <>
                      {doctors.map((doc, index) => (
                        <option key={index} value={doc}>
                          {doc}
                        </option>
                      ))}
                    </>
                  ) : (
                    <option value="no">NO DOCTORS AVAILABLE</option>
                  )}

                  {/* </>
                  )} */}
                </select>
              </div>

              <div className="text-left">
                <label htmlFor="doctorTrainer">
                  Appointment Time
                  <br />
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#757576",
                      fontFamily: "Inter",
                    }}
                  >
                    <img src="/images/icon/Clock.svg" width={15} />{" "}
                    {servicetime} mins Meeting
                  </span>
                </label>
                <div className="scroll-down-bar">
                  <i class="fa-solid fa-arrow-down" />
                </div>

                <div className="radio-container">
                  {doctor && selectedDate && location ? (
                    isFetching ? (
                      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <Spinner />
                      </div>
                    ) : (
                      <>
                        {slots && slots.length > 0 ? (
                          <>
                            {slots.map((slot, index) => (
                              <div key={index}>
                                <label
                                  htmlFor={`timeSlot${index}`}
                                  className={`radio-label-slot ${selectedTimeSlot === index ? "checked" : ""
                                    }`}
                                >
                                  <input
                                    type="radio"
                                    id={`timeSlot${index}`}
                                    value={slot[0]}
                                    checked={selectedTimeSlot === index}
                                    onChange={() => handleTimeSlotChange(index)}
                                  />
                                  {slot[0]} - {slot[1] ? slot[1] : "End of Day"}
                                </label>
                              </div>
                            ))}
                          </>
                        ) : (
                          <p>No slots available</p>
                        )}
                      </>
                    )
                  ) : (
                    <p style={{ fontSize: "10px" }}>
                      Please select a doctor, date, and location to view
                      available slots
                    </p>
                  )}
                </div>
              </div>
              {authIsFetching ? (
                <>
                  {" "}
                  <Button
                    className="purple-button "
                    style={{
                      width: "250px",
                      height: "50px",
                      marginTop: "10px",
                    }}
                  >
                    <Spinner />
                  </Button>
                </>
              ) : (
                <>
                  {" "}
                  <Button
                    type="submit"
                    className="purple-button "
                    style={{
                      width: "250px",
                      height: "50px",
                      marginTop: "10px",
                    }}
                    disabled={
                      !selectedDate || !doctor || doctor === "no" || !location
                    }
                  >
                    Continue
                  </Button>
                </>
              )}
            </form>
          </section>
        </>
      )}
      {/* </div> */}
    </VerifiedLayout>
  );
};

export default DoctorAppointment;

const SucessContent = () => {
  const navigate = useNavigate();

  return (
    <section
      className="text-center d-flex flex-column flex-wrap align-items-center justify-content-center "
      style={{
        height: "75vh",
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "10px 50px ",
      }}
    >
      <img
        src="/images/icons/payments.png"
        alt="payment-icon"
        className="mb-4"
        width={200}
        height={200}
      />
      <div className="d-flex check-your-box-texts">
        <h5>Payment request sent!!</h5>
        <p>
          Payment request bas been sent successfully to the client,
          <br /> Please ask client to complete the payment process.
        </p>
      </div>
      <Button
        onClick={() => navigate("/doctor/dashboard")}
        className="purple-button"
        style={{ width: "332px", height: "62px" }}
      >
        Continue
      </Button>
    </section>
  );
};
