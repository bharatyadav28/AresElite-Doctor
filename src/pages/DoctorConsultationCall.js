import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import DoctorMenu from "../components/layout/DoctorMenu";
import DoctorTodayAppointment from "../components/layout/DoctorTodayAppointment";

const DoctorConsultationCall = () => {
  const [formData, setFormData] = useState({
    email: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your Axios API statement goes here
    console.log("Form Data submitted:", formData);
  };

  return (
    <DoctorMenu>
      <div className="d-flex Doctor-Consul  ">
        <section className="w-40 p-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-5">
              <Form.Label>New User?</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email Id"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formDate" className="mb-3">
              <Form.Label>Customer Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formTime" className="mb-3">
              <Form.Label>Customer Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              className="purple-button mt-5 m-auto"
              type="submit"
              style={{ width: "332px", height: "62px" }}
            >
              Next
            </Button>
          </Form>
        </section>
        <DoctorTodayAppointment />
      </div>
    </DoctorMenu>
  );
};

export default DoctorConsultationCall;
