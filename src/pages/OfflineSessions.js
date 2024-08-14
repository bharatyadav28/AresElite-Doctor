import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Collapse } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const OfflineSessions = ({sessions}) => {
    const [selectedSession, setSelectedSession] = useState(null);
    const [open, setOpen] = useState(Array(sessions.length).fill(false));
    const [sessionDrills, setSessionDrills]= useState([])

    console.log(sessionDrills);

    const toggleDropdown = (index) => {
      const newOpen = [...open];
      newOpen[index] = !newOpen[index];
      setOpen(newOpen);
    };

    // console.log(open);
    console.log(selectedSession);

    const handleSessionClick = (index) => {
      setSelectedSession(index);
      // console.log(sessions[index].drills);
      setSessionDrills(sessions[index].drills)
      setOpen(Array(sessions.length).fill(false))
    };
  // console.log(sessions);
    return (
      <Container>
        <div style={{display:"flex", margin:"6px", gap:"6px", marginBottom:"12px", alignItems:"center"}}>
          <div style={{ fontWeight:"bold", fontSize:"1.2rem"}}>Drills -</div>
        <div>{localStorage.getItem("firstName")}</div>
        <div>{localStorage.getItem("lastName")}</div>
        </div>
        <Row
  style={{
    display: "flex",
    gap: "3px",
    fontSize:"2.4rem"
  }}
  className="mb-1"
>
  {sessions.map((session, index) => (
    <Col key={index} xs="auto">
      <Button
        onClick={() => handleSessionClick(index)}
        style={{
          backgroundColor: 'transparent', // Keep the background transparent
          color: selectedSession === index ? '#800080' : '#555555', // Darker grey text color
          fontWeight: '600', // Semibold font weight
          borderColor: 'transparent',
        }}
      >
        {`Session ${index + 1}`}
      </Button>
    </Col>
  ))}
</Row>

  
        {selectedSession !== null && (
          <Row>
            <Col>
              <div style={{ padding: '20px' }}>
                <h4 style={{ fontWeight:"bold", marginBottom:"10px"}}>Elite- Session {selectedSession + 1}</h4>
                <h5 style={{ fontWeight:"bold",  marginBottom:"30px"}}>Drill Contents</h5>
                {/* <p>{sessions[selectedSession]?._id}</p> */}
                <Container>
                {sessionDrills.map((dropdown, index) => (
  <div key={index}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        borderBottom: "1px solid #ddd",
        paddingBottom: "8px",
        marginBottom: "8px"
      }}
      onClick={() => toggleDropdown(index)}
      aria-controls={`collapse-${index}`}
      aria-expanded={open[index]}
      className="mb-2"
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "8px", transition: "transform 0.3s" }}>
          {open[index] ? (
            <FaChevronUp /> // Up arrow
          ) : (
            <FaChevronDown />// Down arrow
          )}
        </div>
        <div style={{ fontSize:"1.2rem"}}>Drill {index + 1}</div>
        
      </div>
      <div style={{ color:"blue"}}>{dropdown.form.length} Activities</div>
    </div>
    <Collapse in={open[index]}>
      <div style={{ margin:" 12px 0 12px 0"}} id={`collapse-${index}`}>
        <ol>
          <div style={{ fontWeight: "bold" }}>
            Title: <span> {dropdown.label}</span>
          </div>
          {dropdown.form.map((content, i) => (
            <li style={{ padding:"8px"}} key={i}>{content.label}</li>
          ))}
          </ol>
      
      </div>
    </Collapse>
  </div>
))}

    </Container>
              </div>
              {
                sessionDrills.length === 0 && <div style={{display:"flex",justifyContent:"center", fontSize:"1.4rem", fontWeight:"500", paddingTop:"20%" }}> No Drills to show!</div>
              }
            </Col>
          </Row>
        )}
        <div style={{ display:"flex",justifyContent:"center", paddingTop:"40%"}}>
        {
                ( selectedSession === null )&& <div style={{ fontSize:"1.4rem", fontWeight:"600"}}>Select Session to view Drill content!</div>
              }
              </div>
      </Container>
    );
  };
  


export default OfflineSessions
