import React, { useEffect, useState } from "react";
import { Dropdown, Pagination, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Fourzerfour from "../Fourzerfour";
// import { Group } from "./Group";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { GetInQueueRequests } from "../../features/apiCall";
import Loader from "./Components/Loader";

const InQueueReuests = () => {
  const inqueue = useSelector((state) => state.fetch_app.inqueue);
  const totalPages = useSelector((state) => state.fetch_app.totalPages);
  const isFetching = useSelector((state) => state.fetch_app.isFetching);
  const [showDateInput, setShowDateInput] = useState(null);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const isDesktop = window.matchMedia("(min-width: 768px)").matches;
  const pageSize = isDesktop ? 9 : 10;
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = dateObject.getFullYear();

    return `${month}-${day}-${year}`;
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset pagination when search query changes
  };
  const fetchData = async () => {
    try {
      // Create an object to hold the parameters
      const params = {
        currentPage,
        pageSize,
      };
      if (searchQuery) {
        params.searchQuery = searchQuery;
      }

      if (selectedServiceTypes.length > 0) {
        params.selectedServiceTypes = selectedServiceTypes.toString();
      }

      if (selectedDate) {
        // Format the date to 'yyyy-MM-dd'
        const formattedDate = new Date(selectedDate).toLocaleDateString(
          "en-CA"
        );

        params.selectedDate = formattedDate;
      }

      await GetInQueueRequests(dispatch, params);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data whenever currentPage changes
  }, [currentPage, selectedDate, selectedServiceTypes, searchQuery]);

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

      // Update state before calling fetchData
      setSelectedServiceTypes(updatedServiceTypes);

      fetchData(); // Call fetchData after state has been updated

      return updatedServiceTypes;
    });
  };

  const handleDateFilter = (date) => {
    setSelectedDate(date);
  };
  //
  const renderPaginationItems = () => {
    const items = [];
    const range = 1; // Number of pages to show before and after current page

    // Previous Page
    items.push(
      // <Pagination.Prev
      //   key="prev"
      //   onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
      //   disabled={currentPage === 1}
      // />
      <li class="page-item">
        <button
          class="page-link"
          href="#"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        >
          Previous
        </button>
      </li>
    );

    for (
      let i = Math.max(1, currentPage - range);
      i <= Math.min(totalPages, currentPage + range);
      i++
    ) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    items.push(
      <li class="page-item">
        <button
          class="page-link"
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
 
  const [isOpen, setIsOpen] = useState(false);

  const toggleDatePicker = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
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
              {currentPage} of {totalPages}
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
      </div>
      <div className=" main-wrapper">
        {/* <div className="frame"> */}
        <div className="table-div">
          {" "}
          <Table className="table" striped variant="light">
            <thead className="table-head">
              <tr>
                <th style={{ paddingLeft: "20px" }}>
                  <div>Name</div>
                </th>
                <th>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      style={{ fontWeight: "600" }}
                    >
                      Service Types
                      <i className="fa-solid fa-filter" />
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
                          {"  "}
                          <label htmlFor={key}>
                            {Service_ENUM_values[key]}
                          </label>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </th>{" "}
                <th>Mobile Number</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            {!isFetching ? (
              <>
                <tbody className="recent-bookings-cont">
                  {inqueue && inqueue.length > 0 ? (
                    <>
                      {" "}
                      {inqueue &&
                        inqueue.map((booking, index) => (
                          <tr key={index}>
                            <td
                              className=" name-email-image-cont"
                              style={{ paddingLeft: "20px" }}
                            >
                              <img
                                src="/images/image3.png"
                                alt={booking?.client?.firstName}
                                className="recent-booking-person-image "
                                style={{ marginRight: "10px" }}
                              />
                              <div>
                                <small className="name">
                                  {booking?.client?.firstName}{" "}
                                  {booking?.client?.lastName}{" "}
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
                            <td className="phoneno">
                              {booking?.client?.phone}
                            </td>
                            <td className="date">
                              {formatDate(booking?.app_date)}
                            </td>
                            <td className="time">{booking?.app_time}</td>

                            <td className="status ">
                              {booking?.isFilledPrescription &&
                              !booking?.isFilledDiagnosis ? (
                                <div
                                  className="daignosis m-auto"
                                  style={{ width: "fit-content" }}
                                >
                                  <Link
                                    to={`/doctor/dashboard/start-diagnosis/${booking?._id}`}
                                  >
                                    Diagnosis
                                  </Link>
                                </div>
                              ) : (
                                <div
                                  className="StartEvaluation m-auto"
                                  style={{ width: "fit-content" }}
                                >
                                  <Link
                                    to={`/doctor/dashboard/start-evaluation/${booking?._id}`}
                                  >
                                    Start Evaluation
                                  </Link>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                    </>
                  ) : (
                    <div
                    style={{ position: "absolute", margin: "40px 50px", width: "70%" }}
                   
                  >

                     <Fourzerfour/>
                  </div>
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
      {/* </div> */}
    </>
  );
};

export default InQueueReuests;
