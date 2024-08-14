import React from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  ProgressBar,
  Row,
} from "react-bootstrap";
import AtheleteMenu from "../components/layout/AtheleteMenu";

const Athedrill = () => {
  return (
    <AtheleteMenu>
      <section style={{ overflowX: "hidden" }} className="athel-home">
        <Container>
          <Row>
            <div className="d-flex justify-content-between flex-row  ">
              <div className="d-flex">
                <Button className="week-button">Week 1</Button>{" "}
                <Button className="week-button week-selected">Week 2</Button>{" "}
                <Button className="week-button">Week 3</Button>{" "}
                <Button className="week-button">Week 4</Button>
              </div>
              <div>
                <Button className="week-button week-selected">
                  Upgrade Plan
                </Button>
              </div>
            </div>
          </Row>
          <Row className="bg-white mt-5 p-4">
            <Col className="">
              <h5>Elite (P1)- Week 1/Day1/NeuroTrainer(Calibration)</h5>
              <video src="/images/produ.mp4" className=" w-100 " controls />
            </Col>
            <Col>
              <div className="d-flex justify-content-between">
                <h5 className="m-0">Drill Contents</h5>
                <p className="text-success">15% Completed</p>
              </div>
              <ProgressBar
                now={20}
                variant="success"
                animated
                style={{ height: "5px" }}
                className="mb-2"
              />{" "}
              <section
                className=""
                style={{
                  height: "280px",
                  overflowY: "scroll",
                }}
              >
                <Accordion defaultActiveKey={["0"]} alwaysOpen>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <h6 className="w-25">Day 1</h6>
                      <div className="d-flex acc-head-cont">
                        <div>
                          <img src="/images/icon/playcircle.svg" />
                          <p> 4 Drills</p>
                        </div>
                        <div>
                          <img src="/images/icon/clock.svg" />
                          <p> 51m</p>
                        </div>
                        <div>
                          <img src="/images/icon/checks.svg" />
                          <p> 25% finish (1/4)</p>
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="days-cont">
                        <div class="checkbox-wrapper-43">
                          <input type="checkbox" id="1" />
                          <label for="1" class="check d-inline">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>

                            <p className="d-inline">
                              1. Welcome to Ares Elite Academy
                            </p>
                          </label>
                        </div>

                        <div className="d-flex align-items-center justify-content-center ">
                          <img src="/images/icon/play.svg" />
                          <span style={{ marginLeft: "10px" }}>07:31</span>
                        </div>
                      </div>{" "}
                      <div className="days-cont">
                        <div class="checkbox-wrapper-43">
                          <input type="checkbox" id="2" />
                          <label for="2" class="check d-inline">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>

                            <p className="d-inline">
                              2. NeuroTrainer (Calibration)
                            </p>
                          </label>
                        </div>

                        <div className="d-flex align-items-center justify-content-center ">
                          <img src="/images/icon/play.svg" />
                          <span style={{ marginLeft: "10px" }}>07:31</span>
                        </div>
                      </div>{" "}
                      <div className="days-cont">
                        <div class="checkbox-wrapper-43">
                          <input type="checkbox" id="3" />
                          <label for="3" class="check d-inline">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>

                            <p className="d-inline">
                              3. Senaptec (Eye Hand Coordination)
                            </p>
                          </label>
                        </div>

                        <div className="d-flex align-items-center justify-content-center ">
                          <img src="/images/icon/play.svg" />
                          <span style={{ marginLeft: "10px" }}>07:31</span>
                        </div>
                      </div>{" "}
                      <div className="days-cont">
                        <div class="checkbox-wrapper-43">
                          <input type="checkbox" id="4" />
                          <label for="4" class="check d-inline">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>

                            <p className="d-inline">
                              1. Welcome to Ares Elite Academy
                            </p>
                          </label>
                        </div>

                        <div className="d-flex align-items-center justify-content-center ">
                          <img src="/images/icon/play.svg" />
                          <span style={{ marginLeft: "10px" }}>07:31</span>
                        </div>
                      </div>{" "}
                      <div className="days-cont">
                        <div class="checkbox-wrapper-43">
                          <input type="checkbox" id="5" />
                          <label for="5" class="check d-inline">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>

                            <p className="d-inline">
                              4. Senaptec Eye Hand Coordination Recordings (3x)
                            </p>
                          </label>
                        </div>

                        <div className="d-flex align-items-center justify-content-center ">
                          <img src="/images/icon/play.svg" />
                          <span style={{ marginLeft: "10px" }}>07:31</span>
                        </div>
                      </div>{" "}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      {" "}
                      <h6 className="w-25">Day 2</h6>
                      <div className="d-flex acc-head-cont">
                        <div>
                          <img src="/images/icon/playcircle.svg" />
                          <p> 4 Drills</p>
                        </div>
                        <div>
                          <img src="/images/icon/clock.svg" />
                          <p> 51m</p>
                        </div>
                        <div>
                          <img src="/images/icon/checks.svg" />
                          <p> 25% finish (1/4)</p>
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="days-cont">
                        <div class="checkbox-wrapper-43">
                          <input type="checkbox" id="1" />
                          <label for="1" class="check d-inline">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>

                            <p className="d-inline">
                              1. Welcome to Ares Elite Academy
                            </p>
                          </label>
                        </div>

                        <div className="d-flex align-items-center justify-content-center ">
                          <img src="/images/icon/play.svg" />
                          <span style={{ marginLeft: "10px" }}>07:31</span>
                        </div>
                      </div>{" "}
                      <div className="days-cont">
                        <div class="checkbox-wrapper-43">
                          <input type="checkbox" id="2" />
                          <label for="2" class="check d-inline">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>

                            <p className="d-inline">
                              2. NeuroTrainer (Calibration)
                            </p>
                          </label>
                        </div>

                        <div className="d-flex align-items-center justify-content-center ">
                          <img src="/images/icon/play.svg" />
                          <span style={{ marginLeft: "10px" }}>07:31</span>
                        </div>
                      </div>{" "}
                      <div className="days-cont">
                        <div class="checkbox-wrapper-43">
                          <input type="checkbox" id="3" />
                          <label for="3" class="check d-inline">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>

                            <p className="d-inline">
                              3. Senaptec (Eye Hand Coordination)
                            </p>
                          </label>
                        </div>

                        <div className="d-flex align-items-center justify-content-center ">
                          <img src="/images/icon/play.svg" />
                          <span style={{ marginLeft: "10px" }}>07:31</span>
                        </div>
                      </div>{" "}
                      <div className="days-cont">
                        <div class="checkbox-wrapper-43">
                          <input type="checkbox" id="4" />
                          <label for="4" class="check d-inline">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>

                            <p className="d-inline">
                              1. Welcome to Ares Elite Academy
                            </p>
                          </label>
                        </div>

                        <div className="d-flex align-items-center justify-content-center ">
                          <img src="/images/icon/play.svg" />
                          <span style={{ marginLeft: "10px" }}>07:31</span>
                        </div>
                      </div>{" "}
                      <div className="days-cont">
                        <div class="checkbox-wrapper-43">
                          <input type="checkbox" id="5" />
                          <label for="5" class="check d-inline">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>

                            <p className="d-inline">
                              4. Senaptec Eye Hand Coordination Recordings (3x)
                            </p>
                          </label>
                        </div>

                        <div className="d-flex align-items-center justify-content-center ">
                          <img src="/images/icon/play.svg" />
                          <span style={{ marginLeft: "10px" }}>07:31</span>
                        </div>
                      </div>{" "}
                    </Accordion.Body>
                  </Accordion.Item>{" "}
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      {" "}
                      <h6 className="w-25">Day 3</h6>
                      <div className="d-flex acc-head-cont">
                        <div>
                          <img src="/images/icon/playcircle.svg" />
                          <p> 4 Drills</p>
                        </div>
                        <div>
                          <img src="/images/icon/clock.svg" />
                          <p> 51m</p>
                        </div>
                        <div>
                          <img src="/images/icon/checks.svg" />
                          <p> 25% finish (1/4)</p>
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="days-cont">
                        <div class="checkbox-wrapper-43">
                          <input type="checkbox" id="1" />
                          <label for="1" class="check d-inline">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>

                            <p className="d-inline">
                              1. Welcome to Ares Elite Academy
                            </p>
                          </label>
                        </div>

                        <div className="d-flex align-items-center justify-content-center ">
                          <img src="/images/icon/play.svg" />
                          <span style={{ marginLeft: "10px" }}>07:31</span>
                        </div>
                      </div>{" "}
                      <div className="days-cont">
                        <div class="checkbox-wrapper-43">
                          <input type="checkbox" id="2" />
                          <label for="2" class="check d-inline">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>

                            <p className="d-inline">
                              2. NeuroTrainer (Calibration)
                            </p>
                          </label>
                        </div>

                        <div className="d-flex align-items-center justify-content-center ">
                          <img src="/images/icon/play.svg" />
                          <span style={{ marginLeft: "10px" }}>07:31</span>
                        </div>
                      </div>{" "}
                      <div className="days-cont">
                        <div class="checkbox-wrapper-43">
                          <input type="checkbox" id="3" />
                          <label for="3" class="check d-inline">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>

                            <p className="d-inline">
                              3. Senaptec (Eye Hand Coordination)
                            </p>
                          </label>
                        </div>

                        <div className="d-flex align-items-center justify-content-center ">
                          <img src="/images/icon/play.svg" />
                          <span style={{ marginLeft: "10px" }}>07:31</span>
                        </div>
                      </div>{" "}
                      <div className="days-cont">
                        <div class="checkbox-wrapper-43">
                          <input type="checkbox" id="4" />
                          <label for="4" class="check d-inline">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>

                            <p className="d-inline">
                              1. Welcome to Ares Elite Academy
                            </p>
                          </label>
                        </div>

                        <div className="d-flex align-items-center justify-content-center ">
                          <img src="/images/icon/play.svg" />
                          <span style={{ marginLeft: "10px" }}>07:31</span>
                        </div>
                      </div>{" "}
                      <div className="days-cont">
                        <div class="checkbox-wrapper-43">
                          <input type="checkbox" id="5" />
                          <label for="5" class="check d-inline">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>

                            <p className="d-inline">
                              4. Senaptec Eye Hand Coordination Recordings (3x)
                            </p>
                          </label>
                        </div>

                        <div className="d-flex align-items-center justify-content-center ">
                          <img src="/images/icon/play.svg" />
                          <span style={{ marginLeft: "10px" }}>07:31</span>
                        </div>
                      </div>{" "}
                    </Accordion.Body>
                  </Accordion.Item>{" "}
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>
                      {" "}
                      <h6 className="w-25">Day 4</h6>
                      <div className="d-flex acc-head-cont">
                        <div>
                          <img src="/images/icon/playcircle.svg" />
                          <p> 4 Drills</p>
                        </div>
                        <div>
                          <img src="/images/icon/clock.svg" />
                          <p> 51m</p>
                        </div>
                        <div>
                          <img src="/images/icon/checks.svg" />
                          <p> 25% finish (1/4)</p>
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="days-cont">
                        <div class="checkbox-wrapper-43">
                          <input type="checkbox" id="1" />
                          <label for="1" class="check d-inline">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>

                            <p className="d-inline">
                              1. Welcome to Ares Elite Academy
                            </p>
                          </label>
                        </div>

                        <div className="d-flex align-items-center justify-content-center ">
                          <img src="/images/icon/play.svg" />
                          <span style={{ marginLeft: "10px" }}>07:31</span>
                        </div>
                      </div>{" "}
                      <div className="days-cont">
                        <div class="checkbox-wrapper-43">
                          <input type="checkbox" id="2" />
                          <label for="2" class="check d-inline">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>

                            <p className="d-inline">
                              2. NeuroTrainer (Calibration)
                            </p>
                          </label>
                        </div>

                        <div className="d-flex align-items-center justify-content-center ">
                          <img src="/images/icon/play.svg" />
                          <span style={{ marginLeft: "10px" }}>07:31</span>
                        </div>
                      </div>{" "}
                      <div className="days-cont">
                        <div class="checkbox-wrapper-43">
                          <input type="checkbox" id="3" />
                          <label for="3" class="check d-inline">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>

                            <p className="d-inline">
                              3. Senaptec (Eye Hand Coordination)
                            </p>
                          </label>
                        </div>

                        <div className="d-flex align-items-center justify-content-center ">
                          <img src="/images/icon/play.svg" />
                          <span style={{ marginLeft: "10px" }}>07:31</span>
                        </div>
                      </div>{" "}
                      <div className="days-cont">
                        <div class="checkbox-wrapper-43">
                          <input type="checkbox" id="4" />
                          <label for="4" class="check d-inline">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>

                            <p className="d-inline">
                              1. Welcome to Ares Elite Academy
                            </p>
                          </label>
                        </div>

                        <div className="d-flex align-items-center justify-content-center ">
                          <img src="/images/icon/play.svg" />
                          <span style={{ marginLeft: "10px" }}>07:31</span>
                        </div>
                      </div>{" "}
                      <div className="days-cont">
                        <div class="checkbox-wrapper-43">
                          <input type="checkbox" id="5" />
                          <label for="5" class="check d-inline">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>

                            <p className="d-inline">
                              4. Senaptec Eye Hand Coordination Recordings (3x)
                            </p>
                          </label>
                        </div>

                        <div className="d-flex align-items-center justify-content-center ">
                          <img src="/images/icon/play.svg" />
                          <span style={{ marginLeft: "10px" }}>07:31</span>
                        </div>
                      </div>{" "}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </section>
            </Col>
          </Row>
          <Row></Row>
        </Container>
      </section>
    </AtheleteMenu>
  );
};

export default Athedrill;
