import React, { useEffect, useState } from "react";
import { Dropdown, Pagination, Table } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/layout/Components/Loader";
import DoctorMenu from "../components/layout/DoctorMenu";
import { GetRecentPrescriptions } from "../features/apiCall";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Fourzerfour from "../components/Fourzerfour";

const RecentPrescriptions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServiceTypes, setSelectedServiceTypes] = useState([]);
  const prescriptions = useSelector((state) => state.fetch_app.prescriptions);
  const totalPages = useSelector((state) => state.fetch_app.totalPages);
  const isFetching = useSelector((state) => state.fetch_app.isFetching);
  const [showDateInput, setShowDateInput] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Number of items per page
  const dispatch = useDispatch();

  const services = useSelector((state) => state.AllServices.services);

  function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = dateObject.getFullYear();

    return `${month}-${day}-${year}`;
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleDatePicker = () => {
    setIsOpen(!isOpen);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset pagination when search query changes
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
      // setSelectedServiceTypes(updatedServiceTypes);
      return updatedServiceTypes;
    });
  };
  // const Service_ENUM_values = {
  //   MedicalOfficeVisit: "Medical Office Visit",
  //   Consultation: "Consultation Call",
  // };
  const Service_ENUM_values = services;
  const allowedServicesAlias = ["Medical/OfficeVisit", "ConsultationCall"];

  const fetchData = async () => {
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
      const formattedDate = new Date(selectedDate).toLocaleDateString("en-CA");
      params.selectedDate = formattedDate;
    }
    try {
      await GetRecentPrescriptions(dispatch, params);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, selectedDate, selectedServiceTypes, searchQuery]);
  const startIndex = (currentPage - 1) * pageSize;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleDateFilter = (date) => {
    setSelectedDate(date);
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

    // Pagination Items
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

  const getProfilePic = (pic) => {
    console.log("pic: ", pic);
    if (!pic || pic === "picture") {
      return "https://icon-library.com/images/icon-user/icon-user-15.jpg";
    }
    return pic;
  };

  return (
    <DoctorMenu>
      <div className="p-3 main-wrapper mt-2 booking-presc">
        <div className="frame">
          <div className="recent-booking-head">
            <div style={{ paddingLeft: "15px" }}>
              <h2 className="text-gradient text-uppercase">
                Prescription REQUESTS
              </h2>
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
                        zIndex: "1000",
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
              {/* </div> */}
            </div>
            <div className="table-div-booking">
              <Table className="table" hover>
                <thead>
                  <tr>
                    <th style={{ paddingLeft: "20px" }}>Name</th>
                    <th>
                      <Dropdown style={{ zIndex: "3" }}>
                        <Dropdown.Toggle
                          variant="light"
                          id="dropdown-basic"
                          style={{ fontWeight: "600" }}
                        >
                          Select Service Types
                          <i className="fa-solid fa-filter m-1" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {allowedServicesAlias.map((key) => (
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
                    </th>{" "}
                    <th>Mobile Number</th>
                    <th>
                      <div className="date-container">
                        {/* <div
                          className="date-display "
                          onClick={() => setShowDateInput(!showDateInput)}
                        >
                          {selectedDate === null
                            ? "Date"
                            : new Date(selectedDate).toLocaleDateString(
                                "en-CA"
                              )}
                          <i className="fa-solid fa-sort m-1" />
                        </div> */}
                        {showDateInput && (
                          <DatePicker
                            selected={selectedDate}
                            onChange={(date) => {
                              handleDateFilter(date);
                              setShowDateInput(false);
                            }}
                          />
                        )}
                      </div>
                      Date
                    </th>
                    <th>Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {!isFetching ? (
                  <>
                    {" "}
                    {prescriptions && prescriptions.length > 0 ? (
                      <>
                        {" "}
                        <tbody className="recent-bookings-cont">
                          {prescriptions.map((booking, index) => (
                            <tr key={index}>
                              <td
                                className="name-email-image-cont"
                                style={{ paddingLeft: "20px" }}
                              >
                                <img
                                  src={getProfilePic(
                                    booking?.client?.profilePic
                                  )}
                                  alt={booking.name}
                                  className="recent-booking-person-image"
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
                              <td>{booking?.service_type}</td>
                              <td className="phoneno">
                                {booking?.client?.phone}
                              </td>
                              <td className="date">
                                {formatDate(booking?.app_date)}
                              </td>
                              <td className="time">{booking?.app_time}</td>

                              <td className="status ">
                                {booking?.isFilled ? (
                                  <div
                                    className="action-view-eval m-auto "
                                    style={{
                                      width: "fit-content",
                                      padding: "6px 10px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    <Link
                                      to={`/doctor/dashboard/view-pres-form/${booking?.presId}`}
                                    >
                                      {" "}
                                      View Prescription
                                    </Link>
                                  </div>
                                ) : (
                                  <>
                                    <div className="StartPrescription m-auto">
                                      <Link
                                        to={`/doctor/dashboard/start-prescription/${booking?._id}`}
                                        className=" "
                                        state={{
                                          serviceType: booking.service_type,
                                        }}
                                      >
                                        <p> Start Prescription</p>
                                      </Link>
                                    </div>
                                  </>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </>
                    ) : (
                      <div
                        style={{
                          position: "absolute",
                          margin: "40px 50px",
                          width: "70%",
                        }}
                      >
                        <Fourzerfour />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <Loader />
                  </>
                )}
              </Table>
            </div>
          </div>
        </div>
        {/* <div className="pag-cont">
          <Pagination className="m-auto ">{renderPaginationItems()}</Pagination>
        </div> */}
      </div>
    </DoctorMenu>
  );
};

export default RecentPrescriptions;
// import React, { useState } from "react";
// import { Dropdown, Pagination, Table } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import DoctorMenu from "../components/layout/DoctorMenu";

// const RecentPrescriptions = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 8; // Number of items per page

//   const totalPages = Math.ceil(prescriptions.length / pageSize);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const renderPaginationItems = () => {
//     const items = [];
//     const range = 1; // Number of pages to show before and after current page

//     // Previous Page
//     items.push(
//       <Pagination.Prev
//         key="prev"
//         onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
//         disabled={currentPage === 1}
//       />
//     );

//     // Pagination Items
//     for (
//       let i = Math.max(1, currentPage - range);
//       i <= Math.min(totalPages, currentPage + range);
//       i++
//     ) {
//       items.push(
//         <Pagination.Item
//           key={i}
//           active={i === currentPage}
//           onClick={() => handlePageChange(i)}
//         >
//           {i}
//         </Pagination.Item>
//       );
//     }

//     // Next Page
//     items.push(
//       <Pagination.Next
//         key="next"
//         onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
//         disabled={currentPage === totalPages}
//       />
//     );

//     return items;
//   };

//   return (
//     <DoctorMenu>
//       <div className="p-3 main-wrapper mt-2 booking-presc">
//         <div className="frame">
//           <div className="recent-booking-head">
//             <h2 className="text-gradient text-uppercase">
//               Prescription REQUESTS
//             </h2>
//             <div
//               className="d-flex align-items-center mt-3"
//               style={{ paddingLeft: "15px" }}
//             >
//               <div
//                 className="input-group mb-3 search-bar"
//                 style={{ width: "40%", marginRight: "25px" }}
//               >
//                 <div className="input-group-append ">
//                   <span
//                     className="input-group-text"
//                     id="searchIcon"
//                     style={{ borderRadius: "5px 0px 0px 5px" }}
//                   >
//                     <i class="fas fa-search"></i>
//                   </span>
//                 </div>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Search..."
//                   aria-label="Search"
//                   aria-describedby="searchIcon"
//                   style={{ height: "40px" }}
//                 />
//               </div>

//               <div
//                 className=" d-flex flex-row  justify-content-center "
//                 style={{
//                   width: "150px",
//                   gap: "10px",
//                   marginRight: "15px",
//                   marginBottom: "18px",
//                 }}
//               >
//                 <div className="calender-icon">
//                   <i className="fa-regular fa-calendar m-auto" />
//                 </div>
//                 <Dropdown>
//                   <Dropdown.Toggle id="dropdown-pages">
//                     {currentPage} of {totalPages}
//                   </Dropdown.Toggle>

//                   <Dropdown.Menu>
//                     {[...Array(totalPages).keys()].map((page) => (
//                       <Dropdown.Item
//                         key={page + 1}
//                         onClick={() => handlePageChange(page + 1)}
//                       >
//                         {page + 1}
//                       </Dropdown.Item>
//                     ))}
//                   </Dropdown.Menu>
//                 </Dropdown>
//               </div>
//               {/* </div> */}
//             </div>
//             <div className="table-div-booking">
//               <Table className="table" hover>
//                 <thead>
//                   <tr>
//                     <th style={{ paddingLeft: "20px" }}>Name</th>
//                     <th>Mobile Number</th>
//                     <th>
//                       {/* <div className="date-container">
//                         <div
//                           className="date-display "
//                           onClick={() => setShowDateInput(!showDateInput)}
//                         >
//                           {selectedDate === null
//                             ? "Date"
//                             : new Date(selectedDate).toLocaleDateString(
//                                 "en-CA"
//                               )}
//                           <i className="fa-solid fa-sort m-1" />
//                         </div>
//                         {showDateInput && (
//                           <DatePicker
//                             selected={selectedDate}
//                             onChange={(date) => {
//                               handleDateFilter(date);
//                               setShowDateInput(false);
//                             }}
//                           />
//                         )}
//                       </div> */}
//                       Date
//                     </th>
//                     <th>Time</th>

//                     <th>Action</th>
//                   </tr>
//                 </thead>

//                 <tbody className="recent-bookings-cont">
//                   {prescriptions
//                     .slice((currentPage - 1) * pageSize, currentPage * pageSize)
//                     .map((booking) => (
//                       <tr key={booking.id}>
//                         <td className="name-email-image-cont">
//                           <div
//                             style={{ display: "flex", alignItems: "center" }}
//                           >
//                             <img
//                               src="/images/image3.png"
//                               alt={booking.client.first_name}
//                               className="recent-booking-person-image"
//                               style={{
//                                 marginRight: "10px",
//                                 width: "30px",
//                                 height: "30px",
//                               }}
//                             />
//                             <div>
//                               <small className="name">
//                                 {booking.client.first_name}{" "}
//                                 {booking.client.last_name}
//                               </small>
//                               <br />
//                               <small
//                                 className="email"
//                                 style={{
//                                   maxWidth: "150px",
//                                   overflow: "hidden",
//                                   textOverflow: "ellipsis",
//                                 }}
//                               >
//                                 {booking.client.email}
//                               </small>
//                             </div>
//                           </div>
//                         </td>
//                         <td>{booking.phone_number}</td>
//                         <td>{booking.app_date}</td>
//                         <td>{booking.app_time}</td>
//                         <td className="status">
//                           <div className="StartPrescription m-auto">
//                             <Link
//                               to={`/doctor/dashboard/start-prescription/${booking.client.client_id}`}
//                               className=" "
//                             >
//                               <p>Start Prescription</p>
//                             </Link>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </Table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </DoctorMenu>
//   );
// };

// export default RecentPrescriptions;
