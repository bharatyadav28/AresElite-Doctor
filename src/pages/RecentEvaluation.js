import React from "react";
import { Link } from "react-router-dom";
import DoctorMenu from "../components/layout/DoctorMenu";

const RecentEvaluation = () => {
  return (
    <DoctorMenu>
      <div
        className="d-flex align-items-center w-100 vh-100"
        style={{ backgroundColor: "#DBEAF1" }}
      >
        <div className="recent-eval scroll">
          <div className="p-3" style={{ backgroundColor: "white" }}>
            <button className="bt-2 bt-3">Recent Evaluatidon</button>
            <button className="bt-2"> Evaluation Requests</button>
          </div>
          <section className="d-flex flex-row justify-content-between align-items-center p-4">
            <div className="d-flex flex-column">
              <h6 className="font-weight-bold">Anita K. Sharma</h6>
              <p>charu@gmail.com</p>

              <span>
                <i class="fa-solid fa-clock mr-2" />
                Tuesday,24 Oct’23 12:10 PM
              </span>
            </div>
            <div>
              <Link>
                <button className="bt-1">Select Plan</button>
              </Link>
              <Link>
                <button className="bt-1">View Evaluation</button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </DoctorMenu>
  );
};

export default RecentEvaluation;
