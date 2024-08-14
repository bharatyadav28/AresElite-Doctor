import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoDotFill as DotIcon } from "react-icons/go";

import DoctorMenu from "../components/layout/DoctorMenu";
import DrillItem from "../components/DrillItem";

const seasons = [
  "Season 1",
  "Season 2",
  "Season 3",
  "Season 4",
  "Season 5",
  "Season 6",
];

function SubmittedDrills() {
  const [selectedSeason, setSelectedSeason] = useState("Season 1");
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 576;

  return (
    <DoctorMenu>
      <div style={{ height: "100vh", overflowY: "auto", marginTop: "1rem" }}>
        <div
          className="m-3 py-5 px-4  d-flex flex-column  "
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "1rem",
          }}
        >
          <div className="d-flex flex-wrap justify-content-between">
            <div className="d-flex gap-1 align-items-center fs-5 ">
              <p className="fw-semibold">
                Drills <DotIcon className="  my-auto me-1" size={10} />
              </p>
              <p style={{ color: "#3C3F53" }}>Mr. Scott mctominay</p>
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
              {seasons.map((season) => (
                <button
                  key={season}
                  className="py-3 px-4 fw-semibold fs-6"
                  style={{
                    color: selectedSeason === season ? "#7257FF" : "#8C90AA",
                    borderBottom: "1px solid #E9EAF0",
                    borderColor:
                      selectedSeason === season ? "#7257FF" : "#E9EAF0",
                  }}
                  onClick={() => setSelectedSeason(season)}
                >
                  {season}
                </button>
              ))}
            </div>

            <div className="d-flex flex-column mt-4 gap-1">
              <DrillItem />
              <DrillItem />
              <DrillItem />
              <DrillItem />
              <DrillItem />
              <DrillItem />
              <DrillItem />
              <DrillItem />
            </div>
          </div>
        </div>
      </div>
    </DoctorMenu>
  );
}

export default SubmittedDrills;
