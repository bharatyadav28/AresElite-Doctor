import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Fourzerfour from "../components/Fourzerfour";
import AppointmentTableComponent from "../components/layout/AppointmentTableComponent";
import BootstrapModal from "../components/layout/Components/BootstrapModal";
import Loader from "../components/layout/Components/Loader";
import DoctorMenu from "../components/layout/DoctorMenu";
import { GetAllAppointmentDetails } from "../features/apiCall";
import DatePicker from 'react-datepicker';
import axios from "../utils/axios";
var selected=""
const DoctorExpandAppointments = () => {
  const token = localStorage.getItem("userToken");
  const [showDateInput, setShowDateInput] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const isDesktop = window.matchMedia("(min-width: 768px)").matches;
  const isLargeDesktop = window.matchMedia("(min-width: 1900px)").matches;
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const handleClose = () => {
    setShowModal(false);
  };
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  let pageSize;
  if (isLargeDesktop) {
    pageSize = 13;
  } else if (isDesktop) {
    pageSize = 8;
  } else {
    pageSize = 9;
  }
  const [name, setName] = useState("");
  const [bookingId, setBookingId] = useState("");
  const isFetching = useSelector((state) => state.fetch_app.isFetching);
  const { Allappointments } = useSelector((state) => state.fetch_app);
  const dispatch = useDispatch();
  console.log(Allappointments);
  // const todayDate = moment().format("YYYY-MM-DD");
  const fetchData = async () => {
    try {
      const params = { searchQuery };
      if (searchQuery) {
        params.searchQuery = searchQuery;
      }
      await GetAllAppointmentDetails(dispatch, params);

      // setAppointments(data); // Assuming your API response is an array of appointments
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    // alert(date);
    // handleDateFilter(date); // Call the function to handle filtering based on the selected date
    setShowDateInput(false); // Hide the date picker after selecting a date
  };
  const tableHeader = [
    "Name",
    "Email Id",
    "Mobile Number",
    "Service",
    "Start Time",
    "End Time",
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/doctor/dashboard");
  };

  const handleCompleteAppointment = (bookingId, name) => {
    setName(name);
    setBookingId(bookingId);
   selected="complete"
    setModalData("completed");

    setShowModal(true);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDatePicker = () => {
    setIsOpen(!isOpen);
  };
  const handleCancelAppointment = (bookingId, name) => {
    setName(name);
    setBookingId(bookingId);
    selected="cancel"
    setModalData("cancelled");
    setShowModal(true);
  };
  const updateAppointmentStatus = async () => {
    try {
      // Make the API request to update the appointment status
      // alert(modalData);
      const data = await axios.put(
        `/api/doctor/update-status-appointment?Id=${bookingId}&status=${modalData}`,
        null, // Pass null for the request body if not sending any data
        {
          headers: { Authorization: `Bearer ${token}` }, // Pass headers as a separate object
        }
      );

      fetchData();
      setShowModal(false);
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  return (
    <DoctorMenu>
      <div className="p-3 main-wrapper mt-2 booking-presc ">
        <div className="frame " style={{ overflowY: "hidden" }}>
          <Link
            className="purple-text position-absolute collapse-btn"
            style={{ top: "40px", right: "40px" }}
            to="/doctor/dashboard"
          >
            <i class="fa-solid fa-down-left-and-up-right-to-center" /> Collapse
          </Link>
          <div
            className="recent-booking-head "
            style={{ height: "95vh", borderRadius: "20px" }}
          >
            <div
              className="d-flex align-items-center mt-3"
              style={{ paddingLeft: "15px" }}
            >
              <div
                className="input-group mb-3 search-bar"
                style={{ width: "40%", marginRight: "25px" }}
              >
                <div className="input-group-append ">
                  <span
                    className="input-group-text"
                    id="searchIcon"
                    style={{ borderRadius: "5px 0px 0px 5px" }}
                  >
                    <i className="fas fa-search"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  aria-label="Search"
                  aria-describedby="searchIcon"
                  style={{ height: "40px" }}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                />
              </div>

              <div
                className=" d-flex flex-row  justify-content-center "
                style={{
                  width: "150px",
                  gap: "10px",
                  marginRight: "15px",
                  marginBottom: "18px",
                }}
              >
                <div className="date-container">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <button
                        className="calender-icon"
                        type="button"
                        onClick={toggleDatePicker}
                      >
                        <i className="fa-regular fa-calendar m-auto" />
                      </button>
                    </div>

                    {isOpen && (
                      <div
                        className="date-picker-container"
                        style={{
                          position: "absolute",
                          top: "40px",
                          left: "-60px",
                          zIndex: "2",
                        }}
                      >
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => {
                            setSelectedDate(date);
                            setIsOpen(false); // Close the date picker after selecting a date
                          }}
                          inline // Display the calendar inline
                        />
                      </div>
                    )}
                  </div>
                  {showDateInput && (
                    <ReactDatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      onClickOutside={() => setShowDateInput(false)} // Close date picker when clicked outside
                    />
                  )}
                  {/* {selectedDate !== null && (
                    <div
                      className="date-display"
                      onClick={() => setShowDateInput(!showDateInput)}
                    >
                      {new Date(selectedDate).toLocaleDateString("en-CA")}
                    </div>
                  )} */}
                </div>
              </div>
            </div>
            {isFetching && <Loader />}

            {!isFetching &&
              Allappointments &&
              Allappointments.success &&
              Allappointments.appointments.length > 0 &&
              Allappointments.appointments.map((dateAppointment) => {
                const { date, appointments: appointmentsForDate } =
                  dateAppointment;
                const todayString = new Date().toISOString().split("T")[0]; // Get today's date in "YYYY-MM-DD" format
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const tomorrowString = tomorrow.toISOString().split("T")[0];
                return (
                  <div key={date} className="pl-3">
                    <div style={{ fontSize: "21px" }} className="mb-3">
                      {date === todayString && <>Today</>}
                      {date === tomorrowString && <>Tomorrow</>}
                      {/* Render date if it's not today or tomorrow */}
                      {date !== todayString && date !== tomorrowString && (
                        <span
                          style={{
                            color: "rgb(178 170 170)",
                            fontSize: "18px",
                          }}
                        >
                          {date}
                        </span>
                      )}
                    </div>
                    <div>
                      <AppointmentTableComponent
                        bookings={appointmentsForDate}
                        tableHeader={tableHeader} // Assuming tableHeader is defined
                        handleCompleteAppointment={handleCompleteAppointment} // Assuming handleCompleteAppointment is defined
                        handleCancelAppointment={handleCancelAppointment} // Assuming handleCancelAppointment is defined
                      />
                    </div>
                  </div>
                );
              })}

            {!isFetching &&
              Allappointments &&
              Allappointments.success &&
              Allappointments.appointments.length === 0 && (
                <div
                  style={{
                    position: "absolute",
                    margin: "40px 50px",
                    width: "100%",
                  }}
                >
                  <Fourzerfour />
                </div>
              )}
          </div>{" "}
        </div>{" "}
        {bookingId && name && (
          <BootstrapModal
            showModal={showModal}
            handleClose={handleClose}
            modalTitle={
              modalData === "completed"
                ? " Appointment Completed?"
                : " Appointment Cancel?"
            }
            modalContent={
              <ModalContent
                modalData={modalData}
                updateAppointmentStatus={updateAppointmentStatus}
                name={name}
              />
            } // Corrected prop name
          />
        )}
      </div>
    </DoctorMenu>
  );
};
export default DoctorExpandAppointments;

const ModalContent = ({ modalData, updateAppointmentStatus, name }) => {
  return (
    <section className="text-center">
      <div className="d-flex check-your-box-texts">
        <p className="text-muted">
          {`Are you sure that you want to ${selected} an appointment`}
          <br /> with <span className="purple-text">{name}</span> ?
        </p>
        <div className="d-flex justify-content-around mt-4">
          <button
            type="submit"
            className="bt-6  "
            style={{ borderRadius: "10px", width: "200px" }}
            onClick={() => updateAppointmentStatus()}
          >
            {/* {isFetching ? (
              <>
                <Spinner size="sm" animation="border" />
              </>
            ) : ( */}
            <>Save</>
            {/* )} */}
          </button>{" "}
          <button
            type="button"
            className="bt-4  bt-5"
            style={{ borderRadius: "10px", width: "200px", margin: "0px" }}
            // onClick={() => handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};
