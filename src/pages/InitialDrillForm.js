import Table from "react-bootstrap/Table";
import { useState } from "react";

import DoctorMenu from "../components/layout/DoctorMenu";
import CustomDropdown from "../components/layout/Components/CustomDropdown";
import SeasonForm from "./SeasonForm";

const initialDrillInputs = [
  {
    type: "drillName",
    data: [
      {
        label: "Virtual Reality-Neurotainer-G.U.S.T",
        value: "Virtual Reality-Neurotainer-G.U.S.T",
      },
      {
        label: "Season 2",
        value: "season2",
      },
    ],
  },
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

const InitialDrillForm = () => {
  const [drills, setDrills] = useState([initialData]);
  const [season, setSeason] = useState("Season 1");
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const handleDrillsChange = (index, name, value) => {
    const updatedDrills = drills.map((drill, i) =>
      i === index ? { ...drill, [name]: value } : drill
    );
    setDrills(updatedDrills);
  };

  const handleSeason = (selectedValue) => {
    setSeason(selectedValue);
  };

  const addNewRow = () => {
    setDrills([...drills, { ...initialData }]);
  };

  const handleDrillSubmit = () => {
    console.log("Drills: ", drills);
    handleModalOpen();
  };
  return (
    <DoctorMenu>
      <div style={{ height: "100vh", overflowY: "auto", marginTop: "1rem" }}>
        <div
          className="m-3 py-3 px-2  d-flex flex-column  "
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "1rem",
          }}
        >
          <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center px-2 ">
            <div style={{ fontSize: "1.2rem" }} className="fw-semibold">
              In-office training mode
            </div>

            <div className="d-flex flex-wrap gap-3" style={{ width: "30rem" }}>
              <button
                className="purple-button col h-0"
                style={{ padding: 0, height: "2.5rem" }}
                onClick={handleDrillSubmit}
              >
                Start Session
              </button>

              <div className="col">
                {/* <SelectMenu
                  menuData={[
                    { value: "season1", label: "Season 1" },
                    { value: "season2", label: "Season 2" },
                  ]}
                  padding="0.5rem"
                  showTitle={true}
                /> */}
                <CustomDropdown
                  menuData={[
                    { value: "Season 1", label: "Season 1" },
                    { value: "Season 2", label: "Season 2" },
                  ]}
                  value={season}
                  handleSelect={handleSeason}
                  width="100%"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 drill-table-box">
            <Table className="drill-table">
              <thead>
                <tr>
                  <th> S.no </th>
                  <th>Drill name</th>
                  <th>Difficulty</th>
                  <th>Drill level</th>
                  <th>Color</th>
                  <th>Strobe mode</th>
                  <th>Strobe Frequency</th>
                  <th>Weighted Hands</th>
                  <th>Cardio Time</th>
                  <th>Cardio Activity</th>
                  <th>Hand Finger</th>
                  <th>Eye</th>
                  <th>Opposite</th>
                  <th>Broad Distrubtion</th>
                </tr>
              </thead>
              <tbody>
                {drills.map((drill, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{rowIndex + 1}</td>
                    {initialDrillInputs.map((input, index) => (
                      <td key={index}>
                        <CustomDropdown
                          menuData={input.data}
                          value={drill[input.type]}
                          handleSelect={(value) => {
                            handleDrillsChange(rowIndex, input.type, value);
                          }}
                          width={
                            input.type === "drillName" ? "11rem" : "3.4rem"
                          }
                          menuWidth={
                            input.type !== "drillName" ? "1rem" : "maxContent"
                          }
                          titleWidth="90%"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>

            <button
              className="purple-button col px-3 mt-5 ms-1 mb-5  "
              style={{ height: "2.5rem" }}
              onClick={addNewRow}
            >
              Add more Drills
            </button>
          </div>
        </div>
      </div>

      <SeasonForm
        open={openModal}
        handleClose={handleModalClose}
        filledDrills={drills}
      />
    </DoctorMenu>
  );
};

export default InitialDrillForm;
