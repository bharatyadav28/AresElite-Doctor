// import moment from "moment";
// import React, { useEffect, useState } from "react";
// import { Image, NavLink, Table } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { GetTodayAppointmentDetails } from "../../features/apiCall";
// import BootstrapModal from "./Components/BootstrapModal";
// import Loader from "./Components/Loader";

// const DoctorTodayAppointment = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [visibleAppointments, setVisibleAppointments] = useState(10);
//   const { isFetching } = useSelector((state) => state.fetch_app.isFetching);
// const appointments = useSelector((state) => state.fetch_app.appointments);
//   const dispatch = useDispatch();
//   const todayDate = moment().format("YYYY-MM-DD");
//   useEffect(() => {
//     // Fetch data from your API here
//     const fetchData = async () => {
//       try {
//         await GetTodayAppointmentDetails(dispatch, todayDate);

//         // setAppointments(data); // Assuming your API response is an array of appointments
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);
//   const handleViewMore = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <>
//       <section
//         className="today-appoint-container bg-white "
//         style={{ gap: "24px", width: "40vw", margin: "70px 80px" }}
//       >
//         <div className="d-flex justify-content-center w-100 mb-4">
//           <h5>Today's Appointments</h5>
//           {appointments && appointments.length > visibleAppointments && (
//             <NavLink className="view-all">View All</NavLink>
//           )}
//         </div>
//         <Table borderless responsive>
//           <thead>
//             <tr>
//               <td>Name</td>
//               <td>
//                 Service
//                 <i className="fa-solid fa-filter" />
//               </td>
//               <td>Time</td>
//             </tr>
//           </thead>
//           {isFetching ? (
//             <>
//               <Loader class="slots-load" />
//             </>
//           ) : (
//             <>
//               {" "}
//               {appointments && appointments ? (
//                 <tbody>
//                   {" "}
//                   {appointments.length > 0 &&
//                     appointments
//                       // .slice(0, visibleAppointments)
//                       .map((appointment) => (
//                         <tr key={appointment.appointment_id}>
//                           <td>
//                             <div className="d-flex align-items-center">
//                               <Image
//                                 alt="profile picture"
//                                 src="/images/image3.png"
//                                 roundedCircle
//                                 width={42}
//                                 height={42}
//                                 className="mr-2"
//                               />
//                               <div>
//                                 <div
//                                   style={{ fontSize: "15px", color: "black" }}
//                                 >
//                                   {appointment?.client?.first_name}{" "}
//                                   {appointment?.client?.last_name}
//                                 </div>
//                                 <div
//                                   style={{ fontSize: "12px", color: "grey" }}
//                                 >
//                                   {appointment?.client?.email}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td>{appointment.service_type}</td>
//                           <td>{appointment.app_time}</td>
//                         </tr>
//                       ))}
//                 </tbody>
//               ) : (
//                 <>
//                   <div
//                     style={{
//                       backgroundColor: "",
//                       textAlign: "right",
//                       position: "relative",
//                       left: "40px",
//                       fontWeight: "700",
//                       marginTop: "40px",
//                       fontSize: "20px",
//                       color: "grey",
//                     }}
//                   >
//                     No Appointments
//                   </div>
//                 </>
//               )}
//             </>
//           )}
//         </Table>
//       </section>
//       <BootstrapModal
//         show={showModal}
//         onHide={handleCloseModal}
//         modalTitle={`All Appointments for ${todayDate}`}
//         modalContent={<ModalContent appointments={appointments} />}
//       />
//     </>
//   );
// };

// export default DoctorTodayAppointment;
// const ModalContent = ({ appointments }) => {
//   return (
//     <Table borderless responsive>
//       <thead>
//         <tr>
//           <td>Name</td>
//           <td>
//             Service
//             <i className="fa-solid fa-filter" />
//           </td>
//           <td>Time</td>
//         </tr>
//       </thead>
//       <tbody>
//         {appointments &&
//           appointments.map((appointment) => (
//             <tr key={appointment.id}>
//               <td>
//                 <div className="d-flex align-items-center">
//                   <Image
//                     alt="profile picture"
//                     src={appointment.profilePicture} // Replace with the path to your image
//                     roundedCircle
//                     width={42}
//                     height={42}
//                     className="mr-2"
//                   />
//                   <div>
//                     <div style={{ fontSize: "15px", color: "black" }}>
//                       {appointment.name}
//                     </div>
//                     <div style={{ fontSize: "12px", color: "grey" }}>
//                       {appointment.email}
//                     </div>
//                   </div>
//                 </div>
//               </td>
//               <td>{appointment.service}</td>
//               <td>{appointment.time}</td>
//             </tr>
//           ))}
//       </tbody>
//     </Table>
//   );
// };

import moment from "moment";
import React, { useEffect } from "react";
import { Image, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetTodayAppointmentDetails } from "../../features/apiCall";
import Fourzerfour from "../Fourzerfour";

const DoctorTodayAppointment = () => {
  const isFetching = useSelector((state) => state.fetch_app.isFetching);
  const appointments = useSelector((state) => state.fetch_app.appointments);
  const dispatch = useDispatch();
  const todayDate = moment().format("YYYY-MM-DD");
  useEffect(() => {
    const fetchData = async () => {
      try {
        await GetTodayAppointmentDetails(dispatch, todayDate);

        // setAppointments(data); // Assuming your API response is an array of appointments
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section
        style={{
          background: "white",
          width: "47%",
          height: "100%",
          borderRadius: "20px",
          overflowY: "hidden",
        }}
        className="p-4 today-cont"
      >
        <div className="d-flex justify-content-center w-100 mb-4 ">
          <div className="w-100 d-flex justify-content-between flex-row">
            <h5>Today's Appointments</h5>
            <Link
              className="purple-text"
              to="/doctor/dashboard/all-appointments"
            >
              <i class="fa fa-expand-alt mr-1" aria-hidden="true" /> Expand
            </Link>
          </div>
        </div>
        <Table borderless responsive>
          <thead
            style={{
              borderTop: "1px solid rgb(178, 170 ,170,0.2)",
              borderBottom: "1px solid rgb(178 ,170 ,170,0.2)",
              fontSize: "18px",
            }}
          >
            <tr>
              <td>Name</td>
              <td className="pl-4">
                Service
                {/* <i className="fa-solid fa-filter m-1" /> */}
              </td>
              <td>Time</td>
            </tr>
          </thead>

          {appointments && appointments.length > 0 ? (
            <tbody>
              {appointments.length > 0 &&
                appointments
                  // .slice(0, visibleAppointments)
                  .map((appointment) => (
                    <tr key={appointment.appointment_id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <Image
                            alt="profile picture"
                            src="/images/image3.png"
                            roundedCircle
                            width={42}
                            height={42}
                            className="mr-2"
                          />
                          <div>
                            <div style={{ fontSize: "15px", color: "black" }}>
                              {appointment?.client?.firstName}{" "}
                              {appointment?.client?.lastName}
                            </div>
                            <div style={{ fontSize: "12px", color: "grey" }}>
                              {appointment?.client?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{appointment.service_type}</td>
                      <td>{appointment.app_time}</td>
                    </tr>
                  ))}
            </tbody>
          ) : (
            <>
              <div
                style={{
                  backgroundColor: "",
                  textAlign: "center",
                  position: "relative",
                  left: "80px",
                  fontWeight: "700",
                  marginTop: "40px",
                  fontSize: "20px",
                  color: "grey",
                }}
              >
               <Fourzerfour/>
              </div>
            </>
          )}
        </Table>
      </section>
    </>
  );
};

export default DoctorTodayAppointment;
