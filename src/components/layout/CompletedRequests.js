import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Dropdown,
  NavLink,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetCompletedRequests } from "../../features/apiCall";
import BootstrapModal from "./Components/BootstrapModal";
import Loader from "./Components/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Fourzerfour from "../Fourzerfour";

const CompletedRequests = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const isFetching = useSelector((state) => state.fetch_app.isFetching);
  const [selectMode, useSelectMode] = useState("online");

  const isDesktop = window.matchMedia("(min-width: 768px)").matches;
  const pageSize = isDesktop ? 8 : 9;
  const totalPages = useSelector((state) => state.fetch_app.totalPages);
  const completed = useSelector((state) => state.fetch_app.completed);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [dropdown, setDropdown] = useState([]);
  const [disabled, setDisabled] = useState([]);

  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServiceTypes, setSelectedServiceTypes] = useState([]);
  function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = dateObject.getFullYear();

    return `${month}-${day}-${year}`;
  }
  const [isOpen, setIsOpen] = useState(false);
  // console.log( completed);
  const toggleDatePicker = () => {
    setIsOpen(!isOpen);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset pagination when search query changes
  };

  useEffect(() => {
    const len = completed.length;
    if (len > 0) {
      let myArray = new Array(len).fill("offline");
      let arr = [];
      for (let i = 0; i < len; i++) {
        arr.push(completed[i]?.client?.mode);
      }
      setDropdown(arr);
      setDisabled(arr);
    } else {
      let myArray = new Array(len).fill("offline");
      setDropdown(myArray);
      setDisabled(myArray);
    }
  }, [completed]);

  //  useEffect(()=> {
  //   setDropdownState(completed.client.mode)
  //  },[])

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

      await GetCompletedRequests(dispatch, params);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data whenever currentPage changes
  }, [currentPage, selectedDate, selectedServiceTypes, searchQuery]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
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

    // Next Page
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
  const handleModalClose = () => {
    setShowPaymentModal(false);
  };

  const handleSelect = (booking, status, index) => {
    // console.log(booking.client._id, status);
    console.log(index);
    localStorage.setItem("mode", status);
    console.log(status);
    setDropdown((prev) => {
      const oldArr = [...prev];
      oldArr[index] = status;
      return oldArr;
    });
    localStorage.setItem("client_id", booking.client._id);
  };

  const handleClick = (clientId, index) => {
    localStorage.setItem("client_id", clientId);
    const clientMode = dropdown[index];
    if (clientMode === "N.A.") {
      localStorage.setItem("mode", "offline");
    } else {
      localStorage.setItem("mode", clientMode);
    }
  };

  console.log(completed);
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
                style={{ position: "absolute", top: "40px", left: "-60px" }}
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
      <div className="main-wrapper">
        <div className="table-div">
          <Table className="completed-table ">
            <thead>
              <tr>
                <th style={{ paddingLeft: "20px" }}>Name</th>
                <th>
                  Service Type <i className="fa-solid fa-sort" />
                </th>
                <th>Mobile Number</th>
                <th>Date</th>
                <th>Time</th>
                <th>Payment Status</th>
                <th className="text-center">
                  Actions <i className="fa-solid fa-filter" />
                </th>
              </tr>
            </thead>
            {!isFetching ? (
              <>
                <tbody className="recent-bookings-cont">
                  {completed && completed.length >= 0 ? (
                    <>
                      {completed &&
                        completed.map((booking, index) => (
                          <tr key={index}>
                            <td className="" style={{ paddingLeft: "20px" }}>
                              <div className="h-100 d-flex mt-2">
                                <img
                                  src="/images/image3.png"
                                  alt={booking.name}
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
                              </div>
                            </td>
                            <td>{booking?.service_type}</td>
                            <td className="phoneno">
                              {booking?.client?.phone}
                            </td>
                            <td className="date">
                              {formatDate(booking?.app_date)}
                            </td>
                            <td className="time">{booking?.app_time}</td>
                            <td className={`status`}>
                              <div
                                className={`${booking?.client?.plan_payment} m-auto `}
                              >
                                <p>
                                  {!booking?.client?.plan ? (
                                    <>N.A</>
                                  ) : (
                                    <> {booking?.client?.plan_payment}</>
                                  )}
                                </p>
                              </div>
                            </td>{" "}
                            <td className="action ">
                              <Container>
                                <Row>
                                  <Col>
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "1rem",
                                        alignItems: "center",
                                        marginBottom: "5px",
                                      }}
                                    >
                                      <div class="dropdown">
                                        <button
                                          disabled={
                                            disabled[index] === "N.A."
                                              ? false
                                              : true
                                          }
                                          class="btn dropdown-toggle"
                                          type="button"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                          style={{
                                            color: "white",
                                            padding: "5px",
                                            borderRadius: "8px",
                                            background: "#7c73e6",
                                          }}
                                        >
                                          {dropdown[index] === "N.A."
                                            ? "offline"
                                            : dropdown[index]}
                                        </button>
                                        <ul class="dropdown-menu">
                                          <li>
                                            <Link
                                              onClick={() =>
                                                handleSelect(
                                                  booking,
                                                  "offline",
                                                  index
                                                )
                                              }
                                              class="dropdown-item"
                                            >
                                              Offline
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              onClick={() =>
                                                handleSelect(
                                                  booking,
                                                  "online",
                                                  index
                                                )
                                              }
                                              class="dropdown-item"
                                              // to={`/doctor/dashboard/doctor-plans/${booking?.client?._id}`}
                                            >
                                              Online
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                      <button
                                        style={{
                                          backgroundColor: "#FAEBD7",
                                          padding: "4px",
                                          marginBottom: "5px",
                                          borderRadius: "6px",
                                          padding: "5px 10px 5px 10px",
                                          color: "black",
                                        }}
                                      >
                                        {!booking?.client?.plan &&
                                          (dropdown[index] === "offline" ||
                                            dropdown[index] === "N.A.") && (
                                            <>
                                              <Link
                                                onClick={() =>
                                                  handleClick(
                                                    booking.client._id,
                                                    index
                                                  )
                                                }
                                                to="/doctor/dashboard/doctor-service-selection/training"
                                              >
                                                Add training
                                              </Link>
                                            </>
                                          )}
                                        {!booking?.client?.plan &&
                                        dropdown[index] === "online" ? (
                                          <>
                                            <Link
                                              onClick={() =>
                                                handleClick(
                                                  booking.client._id,
                                                  index
                                                )
                                              }
                                              to={`/doctor/dashboard/doctor-plans/${booking?.client?._id}`}
                                            >
                                              Select Plan
                                            </Link>
                                          </>
                                        ) : (
                                          <>
                                            {booking?.client?.plan_payment ===
                                            "paid" ? (
                                              <>
                                                <Link
                                                  onClick={() => {
                                                    localStorage.setItem(
                                                      "firstName",
                                                      booking.client.firstName
                                                    );
                                                    localStorage.setItem(
                                                      "lastName",
                                                      booking.client.lastName
                                                    );
                                                  }}
                                                  to={`/doctor/dashboard/drill/${booking?.client?._id}/${booking._id}`}
                                                  state={{
                                                    data: {
                                                      firstName:
                                                        booking?.client
                                                          ?.firstName,
                                                      lastName:
                                                        booking?.client
                                                          ?.lastName,
                                                    },
                                                  }}
                                                >
                                                  Start Drill
                                                </Link>
                                              </>
                                            ) : (
                                              <>
                                                {booking?.client
                                                  ?.plan_payment ===
                                                  "pending" && (
                                                  <NavLink
                                                    onClick={() => {
                                                      setShowPaymentModal(true);
                                                    }}
                                                  >
                                                    Wait !
                                                  </NavLink>
                                                )}
                                              </>
                                            )}
                                          </>
                                        )}
                                      </button>
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    {" "}
                                    <button className="action-view-eval">
                                      <Link
                                        to={`/doctor/dashboard/view-eval-form/${booking?.evaluationId}`}
                                      >
                                        View Evaluation
                                      </Link>
                                    </button>
                                  </Col>
                                </Row>
                              </Container>
                            </td>
                          </tr>
                        ))}
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          position: "absolute",
                          margin: "40px 50px",
                          width: "70%",
                        }}
                      >
                        <Fourzerfour />
                      </div>
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
          <BootstrapModal
            showModal={showPaymentModal}
            handleClose={handleModalClose}
            modalTitle="Payment Required - START DRILL"
            modalContent={<ModalContent />}
          />
        </div>
      </div>
    </>
  );
};

export default CompletedRequests;
const ModalContent = () => {
  return (
    <section className="forgot-password p-4">
      <h6 className="m-auto font-weight-bold text-center">
        Wait for athelete to pay for the plan !
      </h6>
    </section>
  );
};
