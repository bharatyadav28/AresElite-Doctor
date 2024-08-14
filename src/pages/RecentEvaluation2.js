import React, { useState } from "react";
import CompletedRequests from "../components/layout/CompletedRequests";
import DoctorMenu from "../components/layout/DoctorMenu";
import InQueueReuests from "../components/layout/InQueueReuests";

const RecentEvaluation2 = () => {
  const [activeTab, setActiveTab] = useState("InQueue");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <DoctorMenu>
      <div className="eval-cont">
        <div className=" evaluation-buttons-cont p-3 mt-2">
          <div className="frame">
            <div className="recent-booking-head">
              <div style={{ paddingLeft: "15px" }}>
                <h2 className="text-gradient text-uppercase">
                  Recent Evaluation
                </h2>
              </div>
              <div
                className="d-flex buttons-cont m-auto mt-4 "
                style={{ width: "100%", paddingLeft: "15px" }}
              >
                <div
                  style={{ paddingRight: "10px",cursor:"pointer" }}
                  className={`bt-2  ${
                    activeTab === "Completed" ? "active bt-3" : ""
                  }`}
                  onClick={() => handleTabChange("Completed")}
                >
                  Completed Requests
                </div>
                <div
                  style={{ paddingLeft: "10px",cursor:"pointer" }}
                  className={`bt-2 ${
                    activeTab === "InQueue" ? "active bt-3" : ""
                  }`}
                  onClick={() => handleTabChange("InQueue")}
                >
                  In-Queue Requests
                </div>
              </div>

              {activeTab === "InQueue" ? (
                <InQueueReuests />
              ) : (
                <CompletedRequests />
              )}
            </div>
          </div>
        </div>{" "}
      </div>
    </DoctorMenu>
  );
};

export default RecentEvaluation2;
