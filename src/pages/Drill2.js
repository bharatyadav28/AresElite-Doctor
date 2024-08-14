import React, { useEffect, useState } from "react";
import {
  Accordion,
  Col,
  Container,
  Form,
  ProgressBar,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import DoctorMenu from "../components/layout/DoctorMenu";
import DrillForm from "../components/layout/DrillForm";
import { GetDrillDetails, SubmitDrillForm } from "../features/apiCall";
import axios from "axios";
import Select from "react-select";
import Popup from "../components/Popup";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OfflineSessions from "./OfflineSessions";

const Drill2 = (props) => {
  const [drill_week_details, setDrillWeekDetails] = useState(null);
  const { clientId, appointmentId } = useParams();
  const isFetching = useSelector((state) => state.fetch_app.isFetching);
  const dispatch = useDispatch();
  const location= useLocation()
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [ActivityId, setActivityId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [sessions, setSessions] = useState([]);
  const [drillCount, setDrillCount] = useState([]);
  const [getForm, setForm] = useState([]);
  const [formData, setFormData] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
 
  const [selectedSession, setSelectedSession] = useState(-1);
  const [selectedDrill, setSelectedDrill] = useState(-1);
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const showToastMessage = () => {
    toast.success("Success Notification !");
  };

  const showToastError = () => {
    toast.success("Same fields already present!");
  };
  useEffect(() => {
    const fun = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/doctor/get-offlineDrills?clientId=${clientId}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        console.log(data);
        setSessions(data.sessions);
     
      } catch (err) {
        console.log(err);
      }
    };
    fun();
  }, []);
  // console.log(sessions.length);

  // useEffect(() => {
  //   // fetchData();
  // }, [selectedWeek, dispatch]);

  const handleInputChange = (e, key, index) => {
    console.log(key);
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [index]: value,
    }));
  };

  const handleSelectChange = (selectedOptions, key, index) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFormData((prevState) => ({
      ...prevState,
      [index]: selectedValues,
    }));
  };

  useEffect(() => {
    if (selectedDrill > -1 && selectedSession > -1) {
      console.log(sessions[selectedSession]?.drills[selectedDrill]?.form);
      if (
        sessions[selectedSession]?.drills.length > 0 &&
        sessions[selectedSession]?.drills[selectedDrill]?.form.length > 0
      ) {
        let obj = {};
        sessions[selectedSession].drills[selectedDrill].form.map((val, i) => {
          obj[val._id] = val.value;
        });

        setFormData(obj);
      }
    }
  }, [selectedDrill, selectedSession]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedData = Object.keys(formData).map((key) => ({
        _id: key,
        value: formData[key],
      }));
      // console.log("Formatted Data for Submission:", { formValues: formattedData });
      const res = await fetch(
        "http://localhost:5000/api/doctor/submitOfflineDrill",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formValues: formattedData,
            clientId,
            sessionId,
            drillId: getForm._id,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Network problem!");
      }
      const data = await res.json();
      showToastMessage();
      window.location.reload();
    } catch (err) {
      showToastError();
      console.log(err);
    }
  };
  const handleOptions = (event) => {
    setSelectedSession(event.target.value);
    // console.log(sessions[event.target.value].drills);
    if (sessions[event.target.value]?.drills?.length > 0) {
      // console.log(sessions[event.target.value]._id);
      setSessionId(sessions[event.target.value]._id);
      // setSelectedDrill(sessions[event.target.value]?.drills?.length)
      setDrillCount(sessions[event.target.value]?.drills);
    } else {
      setDrillCount([]);
    }
  };

  const handleDrillOptions = (event) => {
    const selected = event.target.value;
    setSelectedDrill(selected);
  };

  useEffect(() => {
    if (selectedSession != -1 && selectedDrill != -1) {
      setForm(sessions[selectedSession]?.drills[selectedDrill]);
    } else {
      setForm([]);
    }
  }, [selectedSession, selectedDrill]);

  return (
    <DoctorMenu>
      <div
        className="d-flex Doctor-home  flex-wrap Drill"
        style={{
          justifyContent: "space-evenly",
          fontFamily: "Plus Jakarta Sans, sans-serif",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            height: "100%",
            width: "47%",
            borderRadius: "14px",
            padding: "20px",
            overflowY: "hidden",
          }}
        >
          <OfflineSessions sessions={sessions} />
        </div>

        <Container
          className="drill-form"
          style={{
            backgroundColor: "white",
            height: "100%",
            width: "47%",
            borderRadius: "14px",
            padding: "15px",
          }}
        >
          <Form
            onSubmit={handleFormSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Form.Select
                      id="sessions"
                      value={selectedSession}
                      onChange={handleOptions}
                    >
                      <option value="">Session</option>
                      {sessions?.map((_, i) => (
                        <option key={i} value={i}>
                          {i + 1}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Select
                      id="drills"
                      value={selectedDrill}
                      onChange={handleDrillOptions}
                    >
                      <option value="">Drill</option>
                      {drillCount?.map((_, i) => (
                        <option key={i} value={i}>
                          {i + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <div style={{ display: "flex", gap: "15px" }}>
                    <div
                      onClick={togglePopup}
                      className="text-primary"
                      style={{ cursor: "pointer", fontWeight: "bold" }}
                    >
                      Create New
                    </div>
                    <div
                      className="text-secondary"
                      style={{ cursor: "pointer", fontWeight: "bold" }}
                    >
                      Edit
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {getForm?.form?.length > 0 && (
                  <>
                    <div style={{ fontSize: "20px", marginTop: "6px" }}>
                      <h5 style={{ fontWeight: "bold", fontSize: "1.4rem" }}>
                        {getForm.label}
                      </h5>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginTop: "20px",
                        gap: "20px",
                      }}
                    >
                      {getForm?.form?.map((field, index) => (
                        <Form.Group
                          key={field._id}
                          controlId={field.key}
                          className=""
                          style={{ flex: "1 1 calc(50% - 20px)" }}
                        >
                          <div
                            style={{ fontSize: "17px", marginBottom: "4px" }}
                          >
                            {field.label}
                          </div>
                          {field.type_of_field === "text" && (
                            <Form.Control
                              type="text"
                              name={field._id}
                              required
                              value={formData[field._id] || ""}
                              onChange={(e) =>
                                handleInputChange(e, field, field._id)
                              }
                              placeholder={`Enter ${field.label}`}
                            />
                          )}
                          {field.type_of_field === "multipleChoice" && (
                            <Form.Control
                              as="select"
                              required
                              name={field.key}
                              value={formData[field._id] || ""}
                              onChange={(e) =>
                                handleInputChange(e, field, field._id)
                              }
                            >
                              <option value="">Select {field.label}</option>
                              {field.options.map((option, optionIndex) => (
                                <option key={optionIndex} value={option}>
                                  {option}
                                </option>
                              ))}
                            </Form.Control>
                          )}
                          {field.type_of_field === "checkBox" && (
                            <Select
                              isMulti
                              options={field.options.map(
                                (option, optionIndex) => ({
                                  value: option,
                                  label: option,
                                })
                              )}
                              required
                              value={
                                Array.isArray(formData[field._id])
                                  ? formData[field._id].map((value) => ({
                                      value,
                                      label: value,
                                    }))
                                  : []
                              }
                              onChange={(selectedOptions) =>
                                handleSelectChange(
                                  selectedOptions,
                                  field,
                                  field._id
                                )
                              }
                            />
                          )}
                        </Form.Group>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >
                <button
                  className="purple-button"
                  type="submit"
                  style={{ width: "170px" }}
                >
                  Complete
                </button>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="button">Prev</button>
                  <button type="button">Next</button>
                </div>
              </div>
            </div>
          </Form>
          
        </Container>
      </div>
      <ToastContainer />
      {isPopupOpen && (
        <Popup
          clientId={clientId}
          sessions={sessions}
          closePopup={togglePopup}
        />
      )}

      
    </DoctorMenu>
  );
};

export default Drill2;
