import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DoctorMenu from "../components/layout/DoctorMenu";
import { GetPrescriptionForm } from "../features/apiCall";

const ViewPrescriptionForm = () => {
  const Presform = useSelector((state) => state.fetch_app.Presform);
  const Form = Presform?.form;
  const isFetching = useSelector((state) => state.fetch_app.isFetching);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const fetchData = async () => {
    try {
      await GetPrescriptionForm(dispatch, { appointmentId });
    } catch (error) {
      console.error("Error fetching profile details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, navigate]);

  // Function to render form data in row-column format
  const renderFormData = () => {
    if (isFetching || !Form) {
      return <div>Loading...</div>;
    }

    return Form.map((item, index) => {
      return (
        <Row key={index}>
          {Object.entries(item).map(([label, value], index) => (
            <Col key={index} md={6}>
              <div className="d-flex ">
                <strong className="w-50">{label}</strong>
                <p>{Array.isArray(value) ? value.join(", ") : value}</p>
              </div>
            </Col>
          ))}
        </Row>
      );
    });
  };

  return (
    <DoctorMenu>
      
      <div className="p-3 main-wrapper mt-2 booking-presc">
        <div className="frame" style={{ overflowY: "scroll" }}>
          <div className="recent-booking-head">
            <div style={{ paddingLeft: "15px" }}>
              <h2 className="text-gradient text-uppercase">
                View Prescription Form{" "}
                <h6>APPOINTMENT ID- {Presform?.appointmentId}</h6>
              </h2>
            </div>
            <div className="mt-5 p-4">{renderFormData()}</div>
          </div>
        </div>
      </div>
    </DoctorMenu>
  );
};

export default ViewPrescriptionForm;
