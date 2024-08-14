import React, { useEffect, useState } from "react";
import { Accordion, Col, ProgressBar, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import DoctorMenu from "../components/layout/DoctorMenu";
import DrillForm from "../components/layout/DrillForm";
import { GetDrillDetails, SubmitDrillForm } from "../features/apiCall";

const Drill = (props) => {
  const [drill_week_details, setDrillWeekDetails] = useState(null);
  const { clientId, appointmentId } = useParams();
  const location = useLocation();
  const { firstName, lastName } = location.state.data;
  const [totalWeeks, setTotalWeeks] = useState("");
  const [completePercentage, setCompletePercentage] = useState("");
  const isFetching = useSelector((state) => state.fetch_app.isFetching);
  const dispatch = useDispatch();
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [ActivityId, setActivityId] = useState("");
  const [selectedIndex, setIndex] = useState(null);
  const [totalActivities, setTotal] = useState(null);

  const handleWeekSelect = (weekNumber) => {
    setSelectedWeek(weekNumber);
  };
  const fetchData = async () => {
    try {
      const params = { appointmentId, clientId, selectedWeek };
      const data = await GetDrillDetails(dispatch, params);
      if (data) {
        setDrillWeekDetails(data?.data?.weeks?.[0]);
        setCompletePercentage(data?.data?.completePercentage);
        setTotalWeeks(data?.data?.totalWeeks);
        setSelectedActivity(
          data?.data?.weeks?.[0]?.drills?.[0]?.activities?.[0]
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    // fetchData();
  }, [selectedWeek, dispatch]);

  const handleLabelClick = (activity, index, total) => {
    console.log(activity);
    setSelectedActivity(activity);
    setIndex(index);
    setTotal(total);
    setActivityId(activity?._id);
    Update(activity?._id);
  };

  const Update = async () => {
    try {
      const success = await SubmitDrillForm(dispatch, {
        activityId: ActivityId,
      });
    } catch (error) {}
  };

  const handleChange = async (activityId) => {
    const updatedActivities = drill_week_details?.drills.map((day) => ({
      ...day,
      activities: day.activities.map((activity) =>
        activity._id === activityId
          ? { ...activity, isComplete: !activity.isComplete }
          : activity
      ),
    }));
    setDrillWeekDetails((prevDetails) => ({
      ...prevDetails,
      drills: updatedActivities,
    }));
    setActivityId(activityId);
    Update();
  };

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
          <Row>
            {" "}
            <div style={{ fontSize: "20px" }}>
              <p className="font-weight-bold d-inline m-0"> Drills</p>{" "}
              <span class="dot"></span>
              {firstName && lastName && (
                <span className="name-drill">
                  {firstName} {lastName}
                </span>
              )}
            </div>
          </Row>

          <Row>
            {" "}
            <div style={{ width: "100%" }}>
              <div
                style={{ width: "fit-content" }}
                className="d-flex buttons-cont m-auto mt-4 "
              >
                {/* Render buttons for each week */}
                {[...Array(totalWeeks)].map((_, index) => (
                  <div
                    key={index}
                    style={{ padding: "5px 13px 5px 13px" }}
                    className={`bt-${selectedWeek === index + 1 ? "3" : "2"}`}
                    onClick={() => handleWeekSelect(index + 1)}
                  >
                    Week {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </Row>
          <br />
          <Row>
            <Col className="">
              <p className="font-weight-bold d-inline m-0">
                {drill_week_details && (
                  <>
                    {drill_week_details?.drills?.[0]?.plan}(
                    {drill_week_details?.drills?.[0]?.phase})- Week{" "}
                    {drill_week_details?.week}
                  </>
                )}
              </p>
              {/* <video src="/images/produ.mp4" className=" w-100 " controls /> */}
            </Col>
          </Row>
          <Row className="bg-white mt-3 ">
            <Col>
              <div className="d-flex  justify-content-between">
                <h6 style={{ fontWeight: "300" }}>Drill Contents</h6>
                <p
                  style={{ fontWeight: "400", fontSize: "12px" }}
                  className="text-success"
                >
                  {completePercentage}% Completed
                </p>
              </div>
              <ProgressBar
                now={completePercentage}
                variant="success"
                animated
                style={{ height: "5px" }}
                className="mb-2"
              />{" "}
              <section className="mt-4">
                {isFetching ? (
                  <div className="text-center">
                    <p>Loading...</p>
                    <p>
                      <Spinner />
                    </p>
                  </div>
                ) : drill_week_details &&
                  drill_week_details.drills.length > 0 ? (
                  <Accordion defaultActiveKey={["0"]} alwaysOpen>
                    {drill_week_details.drills.map((day, index) => (
                      <Accordion.Item key={index} eventKey={index.toString()}>
                        <Accordion.Header>
                          <h6 className="w-25">Day {day.day}</h6>
                          <div className="d-flex acc-head-cont">
                            <div>
                              <img src="/images/icon/playcircle.svg" />
                              <p> {day.activities.length} Drills</p>
                            </div>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          {day.activities.map((activity, activityIndex) => (
                            <div className="days-cont" key={activity._id}>
                              <div className="checkbox-wrapper-43">
                                <input
                                  type="checkbox"
                                  id={activity._id}
                                  checked={activity.isComplete}
                                />
                                <label
                                  htmlFor={activity._id}
                                  className="check d-inline"
                                  onClick={() =>
                                    handleLabelClick(
                                      activity,
                                      activityIndex,
                                      day.activities.length
                                    )
                                  }
                                >
                                  <svg
                                    width="18px"
                                    height="18px"
                                    viewBox="0 0 18 18"
                                  >
                                    <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                    <polyline points="1 9 7 14 15 4"></polyline>
                                  </svg>
                                  <p className="d-inline">
                                    {activity.activityName}
                                  </p>
                                </label>
                              </div>
                            </div>
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                ) : (
                  <p>No data available</p>
                )}
              </section>
            </Col>
          </Row>
        </div>
        <div
          className="drill-form"
          style={{
            backgroundColor: "white",
            height: "100%",
            width: "47%",
            borderRadius: "14px",
            padding: "20px",
          }}
        >
          {selectedActivity && (
            <DrillForm
              activity={
                selectedActivity ||
                drill_week_details?.drills?.[0]?.activities?.[0]
              }
              index={selectedIndex + 1 || 1}
              total={totalActivities || 6}
            />
          )}
        </div>
      </div>
    </DoctorMenu>
  );
};

export default Drill;
