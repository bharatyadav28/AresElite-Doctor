import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AtheleteMenu from "../components/layout/AtheleteMenu";
import "../styles/athele.css";
import "../styles/athelehome.css";
import "../styles/doctor.css";

const AtheleHome = () => {
  const defaultValues = [
    new Date(2024, 0, 10),
    new Date(2024, 0, 15),
    new Date(2024, 0, 20),
  ];

  
  return (
    <AtheleteMenu>
      <section style={{ overflowY: "hidden" }} className="athel-home">
        <p className="h4 " style={{ marginLeft: "20px", margin: "10px 20px" }}>
          Hello,
          <p className="font-weight-bold d-inline">
            Colter! <img src="/images/icon/hi.svg" />
          </p>
        </p>
        <Container style={{ height: "85%", width: "99%" }}>
          <Row style={{ height: "100%" }} className="justify-content-around">
            <Col sm={8} className="d-grid  all-cont-width">
              <Row className="justify-content-between ">
                <Col
                  className="rounded-4 p-4 d-flex justify-content-around flex-column"
                  style={{
                    background:
                      "linear-gradient(95deg, #CDC3FF -2.52%, rgba(114, 87, 255, 0.60) 100%)",
                  }}
                  sm={6}
                >
                  <h3 style={{ Color: "#2C2C2C" }}>
                    Powerful features for powerful Athletes.{" "}
                  </h3>
                  <p className="text-muted">
                    Choose a plan that’s right for them. All plans will be
                    customized according to you
                  </p>
                  <div>
                    <button className="text-light select-plan">
                      Select Plan{" "}
                    </button>
                    <img src="/images/sports.png" id="sports-person" />
                  </div>
                </Col>
                <Col
                  style={{
                    background: "#1B2C4F",
                  }}
                  sm={6}
                  className=" rounded-4 p-5 d-flex justify-content-between"
                >
                  <div>
                    <span style={{ color: "#CCC" }}>Tele Sessions</span>
                    <br />
                    <h3 className="mt-3 text-white">Total - 6</h3>
                    <h3 className="text-white">Remaining- 4 </h3>
                  </div>
                  <div>
                    <img src="/images/icon/percent.svg" height={120} />
                  </div>
                </Col>
              </Row>
              <Row>
                <h5>Select Service</h5>
                <Container className="services-cont ">
                  <Row className="justify-content-between ">
                    <Col
                      sm={6}
                      style={{ backgroundColor: "#57315A" }}
                      className="text-light mb-4 d-flex justify-content-between  align-items-center"
                    >
                      <img
                        src="/images/icon/sportsvison.svg"
                        className="service-cont-icon"
                      />
                      <div style={{ width: "60%" }}>
                        <h6>Sports Vision Evaluation</h6>
                        <p>
                          {" "}
                          <img
                            src="/images/icon/clock_light.svg"
                            className="service-cont-clock
                    "
                          />{" "}
                          $13.88 per 30 Minutes
                        </p>
                      </div>
                      <img
                        src="/images/icon/service.svg"
                        className="service-cont-arrow
                    "
                      />
                    </Col>
                    <Col
                      sm={6}
                      style={{ backgroundColor: "#FF8989" }}
                      className="text-light mb-4 d-flex justify-content-between align-items-center"
                    >
                      <img
                        src="/images/icon/postcon.svg"
                        className="service-cont-icon"
                      />
                      <div style={{ width: "60%" }}>
                        <h6>Post-Concussion Evaluation</h6>
                        <p>
                          {" "}
                          <img
                            src="/images/icon/clock_light.svg"
                            className="service-cont-clock
                    "
                          />{" "}
                          $13.88 per 30 Minutes
                        </p>
                      </div>
                      <img
                        src="/images/icon/service.svg"
                        className="service-cont-arrow
                    "
                      />
                    </Col>
                  </Row>
                  <Row className="justify-content-between">
                    <Col
                      sm={6}
                      style={{ backgroundColor: "#C1E2F4" }}
                      className=" mb-4 d-flex justify-content-between  align-items-center"
                    >
                      <img
                        src="/images/icon/medical.svg"
                        className="service-cont-icon"
                      />
                      <div style={{ width: "60%" }}>
                        <h6>Medical/Office visit</h6>
                        <p>
                          {" "}
                          <img
                            src="/images/icon/clock.svg"
                            className="service-cont-clock
                    "
                          />{" "}
                          $13.88 per 30 Minutes
                        </p>
                      </div>
                      <img
                        src="/images/icon/service.svg"
                        className="service-cont-arrow
                    "
                      />
                    </Col>
                    <Col
                      sm={6}
                      style={{ backgroundColor: "#D9CFFB" }}
                      className=" mb-4 d-flex justify-content-between  align-items-center"
                    >
                      <img
                        src="/images/icon/consul.svg"
                        className="service-cont-icon"
                      />
                      <div style={{ width: "60%" }}>
                        <h6>Consultation Call</h6>
                        <p>
                          {" "}
                          <img
                            src="/images/icon/clock_light.svg"
                            className="service-cont-clock
                    "
                          />{" "}
                          $13.88 per 30 Minutes
                        </p>
                      </div>
                      <img
                        src="/images/icon/service.svg"
                        className="service-cont-arrow
                    "
                      />
                    </Col>
                  </Row>
                </Container>
              </Row>
              <Row>
                <h5>Recent Prescription</h5>
                <Table bordered striped style={{ background: "transparent" }}>
                  <tbody>
                    <tr>
                      <td className="d-flex" style={{ paddingLeft: "20px" }}>
                        <img
                          src="/images/image3.png"
                          className="recent-booking-person-image "
                          style={{ marginRight: "10px" }}
                        />
                        <div>
                          <small className="name">Dr.Joe</small>
                          <br />
                        </div>
                      </td>
                      <td className="date">10 Jan 2024</td>
                      <td className="time">10:25AM</td>
                      <td className="service_type">Post Concussion</td>
                      <td className="">
                        <Link>View Prescription</Link>
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="d-flex" style={{ paddingLeft: "20px" }}>
                        <img
                          src="/images/image3.png"
                          className="recent-booking-person-image "
                          style={{ marginRight: "10px" }}
                        />
                        <div>
                          <small className="name">Dr.Joe</small>
                          <br />
                        </div>
                      </td>
                      <td className="date">10 Jan 2024</td>
                      <td className="time">10:25AM</td>
                      <td className="service_type">Post Concussion</td>
                      <td className="">
                        <Link>View Prescription</Link>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
            </Col>
            <Col
              class="col-md-auto"
              style={{
                backgroundColor: "white",
                borderRadius: "20px",
                paddingTop: "20px",

                marginLeft: "25px",
                marginRight: "25px",
                padding: "20px 10px",
              }}
            >
              {/* <Calendar
                defaultValue={defaultValues}
                style={{ height: "200px" }}
              /> */}
              <Row className="m-1">
                <div className="d-flex justify-content-between ">
                  <h5>Upcoming</h5>
                  <Link
                    className="text-primary text-decoration-underline"
                    style={{ fontSize: "13px" }}
                  >
                    View All
                  </Link>
                </div>
                <div className="appointments-aligned mt-3">
                  <div className="appointments-aligned-div">
                    <div
                      className="b-gradient-1 d-flex justify-content-center align-items-center text-white"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    >
                      M
                    </div>
                    <div className="d-flex flex-column ">
                      <h6>Dr. Alex</h6>
                      <p className="m-0">
                        Post Concussion | 9 Apr’23 | 04:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="appointments-aligned-div">
                    <div
                      className="b-gradient-1 d-flex justify-content-center align-items-center text-white"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    >
                      M
                    </div>
                    <div className="d-flex flex-column ">
                      <h6>Dr. Alex</h6>
                      <p className="m-0">
                        Post Concussion | 9 Apr’23 | 04:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </Row>
              <Row className="m-1">
                <div className="d-flex justify-content-between">
                  <h5>Notifications</h5>
                  <Link
                    className="text-secondary text-decoration-underline"
                    style={{ fontSize: "13px" }}
                  >
                    Show More
                  </Link>
                </div>
                <div
                  style={{ backgroundColor: "rgba(123, 107, 169, 0.10)" }}
                  className="rounded-4  p-2"
                >
                  <div className="d-flex flex-start flex-row mt-3">
                    <img
                      src="/images/image3.png"
                      className="recent-booking-person-image rounded-3"
                      style={{ marginRight: "10px" }}
                    />
                    <div className="flex-row">
                      <h6>Dr.Joe</h6>

                      <p className="m-0"> Ophthalmologist</p>
                    </div>
                  </div>
                  <div className="d-flex  flex-column align-items-end mt-3">
                    <p style={{ fontSize: "13px", marginLeft: "50px" }}>
                      Doctor has choose the Novice program P1 for you, Please
                      pay the amount to proceed.
                    </p>
                    <button className="b2">Pay Now</button>
                  </div>
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </AtheleteMenu>
  );
};

export default AtheleHome;
