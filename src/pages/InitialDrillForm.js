import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DoctorMenu from "../components/layout/DoctorMenu";
import CustomDropdown from "../components/layout/Components/CustomDropdown";
import SeasonForm from "./SeasonForm";
import { getofflineDrillsData } from "../features/apiCall.js";
import { submittedFormData } from "../features/offlineDrillsSlice.js";
import Loader from "../components/layout/Components/Loader.js";

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
  const [session, setSession] = useState("Session 1");
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.offlineDrills);

  console.log("fData", data);
  const columns = data?.offlineDrillData?.columns?.map((column) => ({
    alias: column.alias,
    data: column.values.map((v) => ({
      value: v.value,
      label: v.value,
    })),
  }));

  const columnNames = data?.offlineDrillData?.columns?.map(
    (column) => column.columnName
  );

  const drillNames = data?.offlineDrillData?.drills?.map((drill) => ({
    value: drill.drillName,
    label: drill.drillName,
  }));

  const handleDrillsChange = (index, name, value) => {
    const updatedDrills = drills.map((drill, i) =>
      i === index ? { ...drill, [name]: value } : drill
    );
    setDrills(updatedDrills);
  };

  const handleSession = (selectedValue) => {
    setSession(selectedValue);
  };

  const addNewRow = () => {
    setDrills([...drills, { ...initialData }]);
  };

  const handleDrillSubmit = () => {
    dispatch(submittedFormData({ session: session, drills: [...drills] }));
    handleModalOpen();
  };

  useEffect(() => {
    getofflineDrillsData(dispatch);
  }, [dispatch]);
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
                    { value: "Session 1", label: "Session 1" },
                    { value: "Session 2", label: "Session 2" },
                    { value: "Session 3", label: "Session 3" },
                    { value: "Session 4", label: "Session 4" },
                    { value: "Session 5", label: "Session 5" },
                  ]}
                  value={session}
                  handleSelect={handleSession}
                  width="100%"
                />
              </div>
            </div>
          </div>

          {!data.isFetching ? (
            <div className="mt-5 drill-table-box">
              <Table className="drill-table">
                <thead>
                  <tr>
                    <th> S.no </th>
                    <th>Drill name</th>
                    {columnNames?.map((columnName, index) => (
                      <th key={index}>{columnName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {drills.map((drill, rowIndex) => (
                    <tr key={rowIndex}>
                      <td>{rowIndex + 1}</td>
                      <td key={"drill name"}>
                        <CustomDropdown
                          menuData={drillNames}
                          value={drill["drillName"]}
                          handleSelect={(value) => {
                            handleDrillsChange(rowIndex, "drillName", value);
                          }}
                          width="11rem"
                          menuWidth={"maxContent"}
                          titleWidth="90%"
                        />
                      </td>
                      {columns?.map((column, index) => (
                        <td key={index}>
                          <CustomDropdown
                            menuData={column?.data}
                            value={drill[column.alias]}
                            handleSelect={(value) => {
                              handleDrillsChange(rowIndex, column.alias, value);
                            }}
                            width={"3.4rem"}
                            menuWidth={"maxContent"}
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
          ) : (
            <div style={{ marginTop: "2rem" }}>
              {" "}
              <Loader />
            </div>
          )}
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
