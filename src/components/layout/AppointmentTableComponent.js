// import React from "react";
import { Col, Row, Table } from "react-bootstrap";

const AppointmentTableComponent = ({
  bookings,
  tableHeader,
  handleCompleteAppointment,
  handleCancelAppointment,
}) => {
  const Service_ENUM_values = {
    SportsVision: "Sports Vision Evaluation",
    TrainingSessions: "Training Sessions",
    ConcussionEval: "Concussion Evaluation",
    MedicalOfficeVisit: "Medical Office Visit",
    Consultation: "Consultation Call",
  };
  return (
    <Table className="table" hover>
      <thead className="table-head expanded-table">
        <tr>
          {tableHeader.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking.id}>
            <td style={{ width: "200px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="/images/image3.png"
                  alt={booking?.client?.firstName}
                  className="recent-booking-person-image"
                  style={{ marginRight: "10px", width: "40px", height: "40px" }}
                />
                <div>
                  <small className="name">
                    {booking?.client?.firstName} {booking?.client?.lastName}
                  </small>
                  <br />
                </div>
              </div>
            </td>
            <td
              style={{
                width: "259px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {booking?.client?.email}
            </td>
            <td style={{ width: "150px", overflowWrap: "break-word" }}>
              {booking?.client?.phone}
            </td>
            <td style={{ width: "150px", overflowWrap: "break-word" }}>
              {booking?.service_type}
            </td>
            <td style={{ width: "100px", overflowWrap: "break-word" }}>
              {booking?.app_time}
            </td>
            <td style={{ width: "100px", overflowWrap: "break-word" }}>
              {booking?.end_time}
            </td>
            <td className="action service-status complete">
              {(() => {
                switch (booking?.service_status) {
                  case "upcoming":
                    return (
                      <>
                        <Row>
                          <Col>
                            {" "}
                            <button
                              className="action-select-plan"
                              onClick={() =>
                                handleCompleteAppointment(
                                  booking?._id,
                                  booking?.client?.firstName
                                )
                              }
                            >
                              Complete
                            </button>
                          </Col>
                          <Col>
                            {" "}
                            <button
                              className="action-view-eval"
                              onClick={() =>
                                handleCancelAppointment(
                                  booking?._id,
                                  booking?.client?.firstName
                                )
                              }
                            >
                              Cancel
                            </button>
                          </Col>
                        </Row>
                      </>
                    );
                  case "completed":
                    return <div>Completed</div>;
                  case "cancelled":
                    return <div className="text-danger">Cancelled</div>;
                  default:
                    return <div className="text-info">N.A</div>;
                }
              })()}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AppointmentTableComponent;
