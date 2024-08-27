import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MdDelete as DeleteIcon } from "react-icons/md";

import DoctorMenu from "../components/layout/DoctorMenu";
import CustomDropdown from "../components/layout/Components/CustomDropdown";
import SeasonForm from "./SeasonForm";
import { getofflineDrillsData } from "../features/apiCall.js";
import { submittedFormData } from "../features/offlineDrillsSlice.js";
import Loader from "../components/layout/Components/Loader.js";
import { IconButton } from "@mui/material";

const initialAvailableSessions = [
  { value: "Session 1", label: "Session 1" },
  { value: "Session 2", label: "Session 2" },
  { value: "Session 3", label: "Session 3" },
  { value: "Session 4", label: "Session 4" },
  { value: "Session 5", label: "Session 5" },
  { value: "Session 6", label: "Session 6" },
  { value: "Session 7", label: "Session 7" },
  { value: "Session 8", label: "Session 8" },
];

const InitialDrillForm = () => {
  const [initialData, setInitialData] = useState({});
  const [drills, setDrills] = useState([initialData]);
  const [session, setSession] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [availableSessions, setAvailableSessions] = useState(
    initialAvailableSessions
  );

  const { clientId, appointmentId } = useParams();

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.offlineDrills);

  const columns = data?.offlineDrillData?.columns?.map((column) => ({
    alias: column.alias,
    columnName: column.columnName,
    data: column.values?.map((v) => ({
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

  const handleDrillsDelete = (index) => {
    const updatedDrills = drills?.filter((drill, i) =>
      i === index ? false : true
    );
    setDrills(updatedDrills);
  };

  const handleDrillsChange = (index, name, value) => {
    const isDrillName = name === "drillName";
    let drillId = "";
    data?.offlineDrillData?.drills?.forEach((item) => {
      if (item.drillName === value) {
        drillId = item._id;
      }
    });
    const updatedDrills = drills?.map((drill, i) =>
      i === index
        ? {
            ...drill,
            [name]: value,
            drill: isDrillName ? drillId : drill.drill,
          }
        : drill
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
    getofflineDrillsData(dispatch, clientId, appointmentId).then(() => {});
  }, [dispatch, clientId, appointmentId]);

  useEffect(() => {
    if (Array.isArray(availableSessions) && availableSessions.length > 0) {
      setSession(availableSessions[0].value);
    }
  }, [availableSessions]);

  useEffect(() => {
    const createdSessions = data?.offlineDrillData?.createdSessions || [];
    setAvailableSessions((prev) =>
      prev?.filter((item) => !createdSessions?.includes(item?.label))
    );
  }, [data?.offlineDrillData?.createdSessions]);

  useEffect(() => {
    setInitialData({ drill: "", drillName: "", ...data?.initialDrillData });
  }, [data.initialDrillData]);

  useEffect(() => {
    setDrills([initialData]);
  }, [initialData]);
  return (
    <DoctorMenu>
      <div
        style={{
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
        }}
        // className="main-wrapper"
      >
        <div
          className="m-3 py-3 px-2 mx-auto  d-flex flex-column  "
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "1rem",
            height: "94vh",
            overflowY: "auto",
            width: "97%",
          }}
        >
          <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center px-2 ">
            <div style={{ fontSize: "1.2rem" }} className="fw-semibold">
              In-office training mode
            </div>

            <div className="d-flex flex-wrap gap-3" style={{ width: "30rem" }}>
              <button
                className="purple-button col start-session-btn"
                style={{
                  padding: 0,
                }}
                onClick={handleDrillSubmit}
              >
                Start Session
              </button>

              <div className="col">
                <CustomDropdown
                  menuData={availableSessions}
                  value={session}
                  handleSelect={handleSession}
                  width="100%"
                />
              </div>
            </div>
          </div>

          {!data.isFetching ? (
            <div className="mt-5 drill-table-box ">
              <Table className="drill-table ">
                <thead>
                  <tr>
                    <th
                      className="p-1 sno-value"
                      style={{ maxWidth: "0.5rem" }}
                    >
                      {" "}
                      S.no{" "}
                    </th>
                    <th
                      className="p-1 drill-name"
                      style={{ maxWidth: "0.5rem" }}
                    >
                      Drill name
                    </th>
                    {columnNames?.map((columnName, index) => (
                      <th
                        key={index}
                        className="p-1 other-values"
                        style={{ maxWidth: "0.5rem" }}
                      >
                        {columnName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {drills?.map((drill, rowIndex) => (
                    <tr
                      key={rowIndex}
                      onMouseEnter={() => setDeleteIndex(rowIndex + 1)}
                      onMouseLeave={() => setDeleteIndex(-1)}
                      style={{ position: "relative" }}
                    >
                      <td
                        className="p-1 pt-2 sno-value fw-medium"
                        style={{ width: "2rem" }}
                      >
                        {rowIndex + 1}
                        {deleteIndex === rowIndex + 1 && (
                          <IconButton
                            style={{
                              borderRadius: "0.5rem",
                              width: "max-content",
                              padding: 0,
                              margin: 0,
                              position: "absolute",
                              top: "20%",
                              left: 0,
                              zIndex: 100,
                              backgroundColor: "#FFCCCB",
                            }}
                            onClick={() => handleDrillsDelete(rowIndex)}
                          >
                            <DeleteIcon color="red" />
                          </IconButton>
                        )}
                      </td>

                      <td
                        key={"drill name"}
                        className="p-1 drill-name"
                        style={{ width: "11rem", maxWidth: "11rem" }}
                      >
                        <CustomDropdown
                          menuData={drillNames}
                          value={drill["drillName"] || ""}
                          handleSelect={(value) => {
                            handleDrillsChange(rowIndex, "drillName", value);
                          }}
                          width="100%"
                          menuWidth={"maxContent"}
                          // titleWidth="90%"
                        />
                      </td>
                      {columns?.map((column, index) => (
                        <td
                          key={index}
                          className="p-1 other-values"
                          style={{ width: "4rem", maxWidth: "4rem" }}
                        >
                          <CustomDropdown
                            menuData={column?.data}
                            value={drill[column.alias] || ""}
                            handleSelect={(value) => {
                              handleDrillsChange(rowIndex, column.alias, value);
                            }}
                            width="100%"
                            menuWidth={"maxContent"}
                            // titleWidth="90%"
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
        columns={columns}
        columnNames={columnNames}
      />
    </DoctorMenu>
  );
};

export default InitialDrillForm;
