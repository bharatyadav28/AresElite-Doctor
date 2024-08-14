import React, { useEffect, useState } from "react";
import { Dropdown, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/layout/Components/Loader";
import DoctorMenu from "../components/layout/DoctorMenu";
import { GetRecentBookings } from "../features/apiCall";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Fourzerfour from "../components/Fourzerfour";
const RecentBookings = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const bookings = useSelector((state) => state.fetch_app.bookings);
  const totalPages = useSelector((state) => state.fetch_app.totalPages);
  const isFetching = useSelector((state) => state.fetch_app.isFetching);
  const [showDateInput, setShowDateInput] = useState(null);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const isDesktop = window.matchMedia("(min-width: 768px)").matches;
  const isLargeDesktop = window.matchMedia("(min-width: 1900px)").matches;
  console.log(bookings)

  let pageSize;
  if (isLargeDesktop) {
    pageSize = 11;
  } else if (isDesktop) {
    pageSize = 8;
  } else {
    pageSize = 9;
  }

  const dispatch = useDispatch();
  console.log(bookings);
  const fetchData = async () => {
  
    try {
      const params = {
        currentPage,
        pageSize,
        searchQuery, // Include search query parameter
      };
      if (searchQuery) {
        params.searchQuery = searchQuery;
      }
      if (selectedStatus) {
        params.selectedStatus = selectedStatus;
      }

      if (selectedServiceTypes.length > 0) {
        params.selectedServiceTypes = selectedServiceTypes.toString();
      }

      if (selectedDate) {
        const formattedDate = new Date(selectedDate).toLocaleDateString(
          "en-CA"
        );

        params.selectedDate = formattedDate;
      }

      await GetRecentBookings(dispatch, params);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    currentPage,
    selectedDate,
    selectedStatus,
    selectedServiceTypes,
    searchQuery,
  ]);
  function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = dateObject.getFullYear();

    return `${month}-${day}-${year}`;
  }

  const startIndex = (currentPage - 1) * pageSize;
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const Service_ENUM_values = {
    SportsVision: "Sports Vision Evaluation",
    TrainingSessions: "Training Sessions",
    ConcussionEval: "Concussion Evaluation",
    MedicalOfficeVisit: "Medical Office Visit",
    Consultation: "Consultation Call",
  };
  const Status_ENUM_values = {
    paid: "Paid",
    pending: "Pending",
    failed: "Failed",
    All: "All",
  };
  const handleServiceTypeFilter = (selectedServiceType) => {
    setSelectedServiceTypes((prevSelectedServiceTypes) => {
      const updatedServiceTypes = prevSelectedServiceTypes.includes(
        selectedServiceType
      )
        ? prevSelectedServiceTypes.filter(
            (type) => type !== selectedServiceType
          )
        : [...prevSelectedServiceTypes, selectedServiceType];
      console.log(updatedServiceTypes);
      setSelectedServiceTypes(updatedServiceTypes);
      return updatedServiceTypes;
    });
  };
  const handleStatusFilter = (status) => {
    if (status == "All") {
      setSelectedStatus("");
    } else {
      setSelectedStatus(status);
    }
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset pagination when search query changes
  };
  const handleDateFilter = (date) => {
    setSelectedDate(date);
  };

  const calculatePageRange = () => {
    const startRange = (currentPage - 1) * pageSize + 1;
    const endRange = Math.min(currentPage * pageSize, totalPages);
    return `${startRange}-${endRange}`;
  };

  const [startDate, setStartDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDatePicker = () => {
    setIsOpen(!isOpen);
  };

  const renderPaginationItems = () => {
    const items = [];
    const range = 1;

    items.push(
      <li className="page-item">
        <button
          className="page-link"
          href="#"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        >
          Previous
        </button>
      </li>
    );

    // Display page range instead of page number
    items.push(
      <li className="page-item" key="page-range">
        <button className="page-link">{calculatePageRange()}</button>
      </li>
    );

    items.push(
      <li className="page-item">
        <button
          className="page-link"
          href="#"
          onClick={() =>
            handlePageChange(Math.min(currentPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </li>
    );

    return items;
  };

  return (
    <DoctorMenu>
      <div className="p-3 main-wrapper mt-2 booking-presc">
        <div className="frame ">
          <div className="recent-booking-head">
            <div style={{ paddingLeft: "15px" }}>
              <h2 className="text-gradient text-uppercase">Recent Bookings</h2>
            </div>
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
                    <i class="fas fa-search"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  aria-label="Search"
                  aria-describedby="searchIcon"
                  style={{ height: "40px" }}
                  value={searchQuery}
                  onChange={handleSearchChange}
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
                {/* <div className="calender-icon">
                  <i className="fa-regular fa-calendar m-auto" />

                </div> */}
                 <div className="input-group">
      <div className="input-group-prepend">
        <button className="calender-icon" type="button" onClick={toggleDatePicker}>
        <i className="fa-regular fa-calendar m-auto" />
        </button>
      </div>
      
      {isOpen && (
        <div className="date-picker-container" style={{position:"absolute",top:"40px",left:"-60px"}}>
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
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-pages">
                    {`${(currentPage - 1) * pageSize + 1}-${Math.min(
                      currentPage * pageSize,
                      currentPage * pageSize + 10
                    )} `}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {[...Array(totalPages).keys()].map((page) => (
                      <Dropdown.Item
                        key={page + 1}
                        onClick={() => handlePageChange(page + 1)}
                      >
                        {page + 1}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              {/* </div> */}
            </div>
            <div className="table-div-booking">
              <Table
                className="table"
                // striped
                hover
                // variant="dark"
                // style={{ height: "70vh" }}
              >
                <thead className="table-head mb-3">
                  <tr>
                    <th style={{ paddingLeft: "20px" }}>
                      <div>Name</div>
                    </th>
                    <th>
                      <Dropdown style={{zIndex:"2"}}>
                        <Dropdown.Toggle
                          variant="light"
                          id="dropdown-basic"
                          style={{ fontWeight: "600" }}
                        >
                          Select Service Types
                          <i className="fa-solid fa-filter m-1" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {Object.keys(Service_ENUM_values).map((key) => (
                            <Dropdown.Item key={key}>
                              <input
                                type="checkbox"
                                id={key}
                                checked={selectedServiceTypes.includes(key)}
                                onChange={() => handleServiceTypeFilter(key)}
                              />{" "}
                              <label htmlFor={key}>
                                {Service_ENUM_values[key]}
                              </label>
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </th>
                    <th>
                      {/* <div className="date-container">
                      <div
                        className="date-display "
                        onClick={() => setShowDateInput(!showDateInput)}
                      >
                        {selectedDate === null
                          ? "Date"
                          : new Date(selectedDate).toLocaleDateString("en-CA")}
                        <i className="fa-solid fa-sort m-1" />
                      </div>
                      {showDateInput && (
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => {
                            handleDateFilter(date);
                            setShowDateInput(false);
                          }}
                        />
                      )}
                    </div> */}
                      Date
                    </th>
                    <th>Time</th>
                    <th>Mobile Number</th>
                    <th>
                      <Dropdown
                        onSelect={(eventKey) => handleStatusFilter(eventKey)}
                      >
                        <Dropdown.Toggle
                          variant="light"
                          id="status-dropdown"
                          style={{ fontWeight: "600" }}
                        >
                          {selectedStatus
                            ? Status_ENUM_values[selectedStatus]
                            : "Payment Status "}
                          <i className="fa-solid fa-filter m-1" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {Object.keys(Status_ENUM_values).map((status) => (
                            <Dropdown.Item key={status} eventKey={status}>
                              {Status_ENUM_values[status]}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                      {/* Payment Status */}
                    </th>
                    <th>Service Status</th>
                  </tr>
                </thead>

                {!isFetching ? (
                  <>
                    <tbody className="recent-bookings-cont">
                      {bookings && bookings.length > 0 ? (
                        <>
                          {bookings.map((booking, index) => (
                            <tr key={index}>
                              <td
                                className=" name-email-image-cont"
                                style={{ paddingLeft: "20px" }}
                              >
                                <img
                                  src="/images/image3.png"
                                  alt={booking?.name}
                                  className="recent-booking-person-image "
                                  style={{ marginRight: "10px" }}
                                />
                                <div>
                                  <small className="name">
                                    {booking?.client?.firstName}{" "}
                                    {booking?.client?.lastName}
                                  </small>
                                  <br />
                                  <small className="email">
                                    {booking?.client?.email}
                                  </small>
                                </div>
                              </td>
                              <td className="service_type">
                                {booking?.service_type}
                              </td>
                              <td className="date">
                                {formatDate(booking?.app_date)}
                              </td>
                              <td className="time">{booking?.app_time}</td>
                              <td className="phoneno">98107213755</td>
                              <td className="status">
                                <div className={`${booking?.status} m-auto`}>
                                  <p> {booking.status}</p>
                                </div>
                              </td>
                              <td
                                className={`${booking?.service_status} m-auto complete service-status`}
                              >
                                {(() => {
                                  switch (booking.service_status) {
                                    case "upcoming":
                                      return (
                                        <div>Anticipated Consultation</div>
                                      );
                                    case "completed":
                                      return <div>Consultation Completed</div>;
                                    case "canceled":
                                      return <div> Cancelled</div>;
                                    default:
                                      return <div>N.A</div>;
                                  }
                                })()}
                                <br />
                              </td>

                              {/* <i
                                className="fa fa-ellipsis-v"
                                style={{
                                  width: "60px",
                                  position: "relative",
                                  bottom: "20px",
                                }}
                              /> */}
                            </tr>
                          ))}
                        </>
                      ) : (
                        <>
                          <tr>
                            <td>
                            <div
                style={{ position: "absolute", margin: "40px 50px", width: "100%" }}
               
              >

               <Fourzerfour/>
              </div>
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </>
                ) : (
                  <>
                    <Loader />
                  </>
                )}
              </Table>
            </div>
          </div>
          {/* <div className="pag-cont">
          <Pagination className="m-auto ">{renderPaginationItems()}</Pagination>
        </div> */}
        </div>
      </div>
    </DoctorMenu>
  );
};

export default RecentBookings;
