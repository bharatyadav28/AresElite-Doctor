import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { GoDotFill as DotIcon } from "react-icons/go";
import { useDispatch } from "react-redux";

import DoctorMenu from "../components/layout/DoctorMenu";
import DrillItem from "../components/DrillItem";
import { getSessionDrills } from "../features/apiCall";
import Loader from "../components/layout/Components/Loader";

function SubmittedDrills() {
  const [sessionsData, setSessionsData] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState("Session 1");
  const [creationTime, setCreationTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const firstName = location?.state?.data?.firstName;
  const lastName = location?.state?.data?.lastName;

  const navigate = useNavigate();
  const isMobile = window.innerWidth < 576;

  const dispatch = useDispatch();

  const { clientId, appointmentId } = useParams();
  console.log("SessionsData", sessionsData);

  useEffect(() => {
    setIsLoading(true);
    getSessionDrills(dispatch, clientId, appointmentId).then((sessionsData) => {
      setSessionsData(sessionsData?.sessions);
      setCreationTime(sessionsData?.createdAt);
      setIsLoading(false);
    });
  }, [dispatch, clientId, appointmentId]);

  let selectedSessionData = {};

  sessionsData?.forEach((item) => {
    if (item.session === selectedSession) {
      selectedSessionData = item;
    }
  });

  useEffect(() => {
    const temp = [];
    for (let i = 1; i <= sessionsData?.length; i++) {
      temp.push(`Session ${i}`);
    }
    setSessions(temp);
  }, [sessionsData]);

  console.log("loading", isLoading);

  return (
    <DoctorMenu>
      <div
        style={{
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
        }}
      >
        <div
          className="m-3 py-5 px-4 mx-auto d-flex flex-column  "
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "1rem",
            height: "94vh",
            overflowY: "auto",
            width: "95%",
          }}
        >
          <div className="d-flex flex-wrap justify-content-between">
            <div className="d-flex gap-1 align-items-center fs-5 ">
              <p className="fw-semibold">
                Drills <DotIcon className="  my-auto me-1" size={10} />
              </p>
              <p style={{ color: "#3C3F53" }}>
                Mr. {firstName + " " + lastName}
              </p>
            </div>

            <button
              className="purple-button h-0 ms-auto "
              style={{ padding: 0, height: "2.5rem", width: "15rem" }}
              onClick={() => navigate("start-drill")}
            >
              Start Drill
            </button>
          </div>

          <div className="mt-4">
            <div
              className="d-flex "
              style={{
                borderBottom: isMobile ? "none" : "1px solid #E9EAF0",
                maxWidth: "100vw",

                overflow: "auto",
              }}
            >
              {isLoading && <Loader />}
              {!isLoading &&
                sessions.map((session) => (
                  <button
                    key={session}
                    className="py-3 px-4 fw-semibold fs-6"
                    style={{
                      color:
                        selectedSession === session ? "#7257FF" : "#8C90AA",
                      borderBottom: "1px solid #E9EAF0",
                      borderColor:
                        selectedSession === session ? "#7257FF" : "#E9EAF0",
                    }}
                    onClick={() => setSelectedSession(session)}
                  >
                    {session}
                  </button>
                ))}
            </div>

            <div className="d-flex flex-column mt-4 gap-1">
              {selectedSessionData?.drills?.map((drill, index) => (
                <DrillItem
                  drill={drill}
                  key={drill.drill}
                  index={index}
                  creationTime={creationTime}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DoctorMenu>
  );
}

export default SubmittedDrills;
