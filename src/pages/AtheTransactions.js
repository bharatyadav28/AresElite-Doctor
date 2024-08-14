import React from "react";
import { Button, Dropdown, Table } from "react-bootstrap";
import AtheleteMenu from "../components/layout/AtheleteMenu";

const AtheTransactions = () => {
  const bookings = [
    {
      time: "9:23 AM",
      date: "Oct 17, 2023",
      serviceType: "Sports Vision Performance",
      name: "Mr. Scott Mctominay",
      email: "curtis.weaver@example.com",
      phoneNumber: "(406) 555-0120",
      status: "paid",
    },
    {
      time: "9:23 AM",
      date: "Oct 17, 2023",
      serviceType: "Sports Vision Performance",
      name: "Mr. Scott Mctominay",
      email: "curtis.weaver@example.com",
      phoneNumber: "(406) 555-0120",
      status: "failed",
    },
    {
      time: "9:23 AM",
      date: "Oct 17, 2023",
      serviceType: "Sports Vision Performance",
      name: "Mr. Scott Mctominay",
      email: "curtis.weaver@example.com",
      phoneNumber: "(406) 555-0120",
      status: "pending",
    },
    {
      time: "9:23 AM",
      date: "Oct 17, 2023",
      serviceType: "Sports Vision Performance",
      name: "Mr. Scott Mctominay",
      email: "curtis.weaver@example.com",
      phoneNumber: "(406) 555-0120",
      status: "paid",
    },
    {
      time: "9:23 AM",
      date: "Oct 17, 2023",
      serviceType: "Sports Vision Performance",
      name: "Mr. Scott Mctominay",
      email: "curtis.weaver@example.com",
      phoneNumber: "(406) 555-0120",
      status: "paid",
    },
    {
      time: "9:23 AM",
      date: "Oct 17, 2023",
      serviceType: "Sports Vision Performance",
      name: "Mr. Scott Mctominay",
      email: "curtis.weaver@example.com",
      phoneNumber: "(406) 555-0120",
      status: "paid",
    },
    {
      time: "9:23 AM",
      date: "Oct 17, 2023",
      serviceType: "Sports Vision Performance",
      name: "Mr. Scott Mctominay",
      email: "curtis.weaver@example.com",
      phoneNumber: "(406) 555-0120",
      status: "paid",
    },

    {
      time: "9:23 AM",
      date: "Oct 17, 2023",
      serviceType: "Sports Vision Performance",
      name: "Mr. Scott Mctominay",
      email: "curtis.weaver@example.com",
      phoneNumber: "(406) 555-0120",
      status: "paid",
    },

    // Add more data objects for each booking...
  ];

  return (
    <AtheleteMenu>
      <div className="p-3 main-wrapper mt-5 booking-presc">
        <div className="frame ">
          <div className="d-flex justify-content-between align-items-center recent-booking-head">
            <div style={{ paddingLeft: "15px" }}>
              <h2 className="">Recent Transactions</h2>
            </div>
            <div
              className="input-group mb-3 search-bar"
              style={{ width: "400px" }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="searchIcon"
              />
              <div className="input-group-append ">
                <span className="input-group-text" id="searchIcon">
                  <i class="fas fa-search"></i>
                </span>
              </div>
            </div>

            <div
              className=" d-flex flex-row  justify-content-center mt-3"
              style={{ width: "150px", gap: "10px", marginRight: "15px" }}
            >
              <i class="fa-solid fa-calendar m-auto" />
              <Dropdown>
                {/* <Dropdown.Toggle id="dropdown-basic">
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
                </Dropdown.Menu> */}
              </Dropdown>
            </div>
            {/* </div> */}
          </div>
          <div className="table-div-booking">
            <Table
              className="table"
              striped
              hover
              variant="light"
              // style={{ height: "70vh" }}
            >
              <thead className="table-head">
                <tr>
                  <th style={{ paddingLeft: "20px" }}>
                    Name <i className="fa-solid fa-sort" />
                  </th>
                  <th>
                    Service Type <i className="fa-solid fa-filter" />
                  </th>
                  <th>
                    Date <i className="fa-solid fa-sort" />
                  </th>
                  <th>
                    Time <i className="fa-solid fa-sort" />
                  </th>

                  <th>
                    Status <i className="fa-solid fa-filter" />
                  </th>
                  <th>
                    Actions <i className="fa-solid fa-sort" />
                  </th>
                </tr>
              </thead>

              {/* {!isFetching ? ( */}

              <tbody className="recent-bookings-cont">
                {/* {bookings.length > 0 ? ( */}

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
                      {/* <div>
                        <small className="name">
                          {booking?.client?.first_name}{" "}
                          {booking?.client?.last_name}
                        </small>
                        <br />
                        <small className="email">
                          {booking?.client?.email}
                        </small>
                      </div> */}
                      <div>
                        <small className="name">{booking.name} </small>
                        <br />
                        <small className="email">{booking.email}</small>
                      </div>
                    </td>
                    {/* <td className="service_type">
                      {Service_ENUM_values[booking?.service_type]}
                      
                    </td> */}
                    <td className="service_type">{booking.serviceType}</td>
                    <td className="date">{booking.date}</td>
                    <td className="time">{booking.time}</td>

                    <td className="status">
                      <div className={`${booking.status} `}>
                        {booking.status}
                      </div>
                    </td>
                    <td className="actions ">
                      <Button className="action-view-eval pay">Pay Now</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* //       ) : (
              //         <>
              //           <tr>
              //             <td>
              //               {" "}
              //               <div className="text-center ">
              //                 No Appointments
              //               </div>{" "}
              //             </td>
              //           </tr>
              //         </>
              //       )}
              //     </tbody>
              //   </>
              // ) : (
              //   <> */}

              {/*   <tr>
                      {" "}
                      <td>
                        {" "}
                        <Placeholder size="lg" />
                      </td>{" "}
                      <td>
                        {" "}
                        <Placeholder size="lg" />
                      </td>{" "}
                      <td>
                        {" "}
                        <Placeholder size="lg" />
                      </td>{" "}
                      <td>
                        {" "}
                        <Placeholder size="lg" />
                      </td>{" "}
                      <td>
                        {" "}
                        <Placeholder size="lg" />
                      </td>{" "}
                      <td>
                        {" "}
                        <Placeholder size="lg" />
                      </td>
                    </tr>{" "}
                    <tr><td></td><td></td></tr>
                    <tr>
                      {" "}
                      <td>
                        {" "}
                        <Placeholder size="lg" />
                      </td>{" "}
                      <td>
                        {" "}
                        <Placeholder size="lg" />
                      </td>{" "}
                      <td>
                        {" "}
                        <Placeholder size="lg" />
                      </td>{" "}
                      <td>
                        {" "}
                        <Placeholder size="lg" />
                      </td>{" "}
                      <td>
                        {" "}
                        <Placeholder size="lg" />
                      </td>{" "}
                      <td>
                        {" "}
                        <Placeholder size="lg" />
                      </td>
                    </tr>{" "}
                    <tr>
                      {" "}
                      <td>
                        {" "}
                        <Placeholder size="lg" />
                      </td>{" "}
                      <td>
                        {" "}
                        <Placeholder size="lg" />
                      </td>{" "}
                      <td>
                        {" "}
                        <Placeholder size="lg" />
                      </td>{" "}
                      <td>
                        {" "}
                        <Placeholder size="lg" />
                      </td>{" "}
                      <td>
                        {" "}
                        <Placeholder size="lg" />
                      </td>{" "}
                      <td>
                        {" "}
                        <Placeholder size="lg" />
                      </td>
                    </tr>{" "}
                    <tr></tr>
                  </tbody> */}
              {/* <Spinner className="m-auto" />
                </>
              )} */}
            </Table>
          </div>
        </div>
      </div>
    </AtheleteMenu>
  );
};

export default AtheTransactions;
