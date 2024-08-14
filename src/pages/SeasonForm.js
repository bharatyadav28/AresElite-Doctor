import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IoIosArrowBack as BackIcon } from "react-icons/io";
import {
  FaArrowLeft as LeftArrow,
  FaArrowRight as RightArrow,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import CustomDropdown from "../components/layout/Components/CustomDropdown";

const drillData = [
  {
    label: "Drill .1. Virtual Reality-Neurotainer-G.U.S.T",
    value: "Drill .1. Virtual Reality-Neurotainer-G.U.S.T",
  },
  {
    label: "Drill .2. Virtual Reality-Neurotainer2",
    value: "Drill .2. Virtual Reality-Neurotainer2",
  },
];

const drillName = [
  {
    label: " Virtual Reality-Neurotainer-G.U.S.T",
    value: " Virtual Reality-Neurotainer-G.U.S.T",
  },
  {
    label: " Virtual Reality-Neurotainer2",
    value: " Virtual Reality-Neurotainer2",
  },
];

const initialDrillInputs = [
  {
    type: "difficulty",
    data: [
      {
        label: "Pro",
        value: "pro",
      },
      {
        label: "Medium",
        value: "medium",
      },
    ],
  },
  {
    type: "drillLevel",
    data: [
      {
        label: "1",
        value: "1",
      },
      {
        label: "1.5",
        value: "1.5",
      },
    ],
  },
  {
    type: "color",
    data: [
      {
        label: "Black",
        value: "black",
      },
      {
        label: "orange",
        value: "Orange",
      },
    ],
  },
  {
    type: "strodeMode",
    data: [
      {
        label: "Ultra",
        value: "ultra",
      },
      {
        label: "orange",
        value: "Orange",
      },
    ],
  },
  {
    type: "strodeFrequency",
    data: [
      {
        label: "2",
        value: "2",
      },
      {
        label: "3",
        value: "3",
      },
    ],
  },
  {
    type: "weightedHands",
    data: [
      {
        label: "2",
        value: "2",
      },
      {
        label: "3",
        value: "3",
      },
    ],
  },
  {
    type: "cardioTime",
    data: [
      {
        label: "1 times",
        value: "1",
      },
      {
        label: "2 times",
        value: "2",
      },
    ],
  },
  {
    type: "cardioActivity",
    data: [
      {
        label: "Good",
        value: "good",
      },
      {
        label: "Average",
        value: "average",
      },
    ],
  },
  {
    type: "handFinger",
    data: [
      {
        label: "Good",
        value: "good",
      },
      {
        label: "Nice",
        value: "nice",
      },
    ],
  },
  {
    type: "eye",
    data: [
      {
        label: "1.5",
        value: "1.5",
      },
      {
        label: "2",
        value: "2",
      },
    ],
  },
  {
    type: "opposite",
    data: [
      {
        label: "Yes",
        value: "yes",
      },
      {
        label: "No",
        value: "no",
      },
    ],
  },
  {
    type: "broadDistribution",
    data: [
      {
        label: "Yes",
        value: "yes",
      },
      {
        label: "No",
        value: "no",
      },
    ],
  },
];

const evaluationInpputs = [
  "score",
  "Ball blocked",
  "Ball Blocked score",
  "Bombs doged",
  "Bombs doged score",
  "Multiplayer",
  "Bonus score",
];

const initialData = {
  drillName: "",
  difficulty: "",
  drillLevel: "",
  color: "",
  strodeMode: "",
  strodeFrequency: "",
  weightedHands: "",
  cardioTime: "",
  cardioActivity: "",
  handFinger: "",
  eye: "",
  opposite: "",
  broadDistribution: "",
};

function SeasonForm({ open, handleClose, filledDrills }) {
  const [drillType, setDrillType] = useState(
    "Drill .1. Virtual Reality-Neurotainer2"
  );
  const [newData, setNewData] = useState(initialData);
  const handleNewDataChange = (name, value) => {
    setNewData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const navigate = useNavigate();
  const isMobile = window.innerWidth < 576;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "97%",
    height: "96%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "15px",
  };

  const handleDrillsChange = (value) => {
    setDrillType(value);
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", newData);
    handleClose();
    navigate(-1);
  };

  useEffect(() => {
    evaluationInpputs?.map((item) => {
      initialData[item] = "";
    });
    initialData["notes"] = "";
  }, []);

  useEffect(() => {
    if (filledDrills) {
    }
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} style={{ overflowY: "auto" }}>
        <div className="d-flex items-center gap-2">
          <div>
            <BackIcon />
          </div>
          <div style={{ fontSize: "1.2rem" }} className="fw-semibold">
            Session Details
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row mt-3 gap-5">
          <div className="col d-flex flex-column gap-4 ">
            <CustomDropdown
              menuData={drillData}
              value={drillType}
              handleSelect={handleDrillsChange}
              width="100%"
            />

            <div className="d-flex flex-column gap-1 ">
              <div className="fw-medium" style={{ color: "#3C3F53" }}>
                Drill name
              </div>
              <CustomDropdown
                value={newData.drillName}
                handleSelect={(value) => {
                  handleNewDataChange("drillName", value);
                }}
                menuData={drillName}
                width="100%"
                bgColor="#7257FF14"
                textColor="#7257FF"
                titleSize="0.8rem"
              />
            </div>

            <div className="d-flex flex-column gap-1">
              <div className="fw-medium" style={{ color: "#3C3F53" }}>
                Drill name
              </div>

              <div className="drill-box mt-2">
                {initialDrillInputs.map((input, index) => (
                  <div className="drill-item">
                    <div style={{ fontSize: "0.7rem" }}> {input.type} </div>
                    <CustomDropdown
                      menuData={input.data}
                      value={newData[input.type]}
                      handleSelect={(value) => {
                        handleNewDataChange(input.type, value);
                      }}
                      width="100%"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="col p-4 border-radius-10"
            style={{ backgroundColor: "#F4F4F4" }}
          >
            <div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
              {" "}
              Drill details
            </div>
            <div className="drill-box mt-2">
              {evaluationInpputs.map((input) => (
                <div className="drill-item">
                  <div style={{ fontSize: "0.7rem" }}> {input} </div>
                  <input
                    type="text"
                    value={newData.input}
                    onChange={(event) => {
                      handleNewDataChange(input, event.target.value);
                    }}
                    style={{
                      height: "40px",
                      border: "none",
                      width: "100%",
                      paddingLeft: "0.4rem",
                    }}
                    placeholder={`Enter ${input}`}
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 d-flex flex-column gap-1 drill-notes">
              <div style={{ fontSize: "0.7rem" }}> Notes </div>
              <textarea
                value={newData.notes}
                onChange={(event) => {
                  handleNewDataChange("notes", event.target.value);
                }}
                style={{
                  height: "100px",
                  border: "none",
                  width: "100%",
                  paddingLeft: "0.4rem",
                  paddingTop: "0.4rem",
                }}
                placeholder={`Enter notes`}
              />
            </div>

            <div className="d-flex flex-wrap gap-2 mt-5">
              <button
                className="purple-button col h-0 flex-grow-1"
                style={{ padding: 0, height: "2.5rem" }}
                onClick={handleSubmit}
              >
                Submit Drill data
              </button>

              <div className="d-flex gap-2 ">
                <button
                  style={{
                    backgroundColor: "#EAE6FF",
                    color: "#7257FF",
                    width: isMobile ? "7rem" : "8rem",
                  }}
                >
                  <div className="d-flex justify-content-center align-items-center gap-2 ">
                    <LeftArrow />
                    <div>Previous</div>
                  </div>
                </button>

                <button
                  style={{
                    backgroundColor: "#EAE6FF",
                    color: "#7257FF",
                    width: isMobile ? "7rem" : "8rem",
                  }}
                >
                  <div className="d-flex justify-content-center align-items-center gap-2 ">
                    <div>Next</div>
                    <RightArrow />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default SeasonForm;
