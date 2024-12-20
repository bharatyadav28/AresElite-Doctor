import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { IoIosArrowBack as BackIcon } from "react-icons/io";
import {
  FaArrowLeft as LeftArrow,
  FaArrowRight as RightArrow,
} from "react-icons/fa";
import Select from "react-select";
import { Row, Col } from "react-bootstrap";

import CustomDropdown from "../components/layout/Components/CustomDropdown";
import { submitSessionDrills } from "../features/apiCall";

function SeasonForm({ open, handleClose, filledDrills, columns }) {
  const data = useSelector((state) => state.offlineDrills);
  const formData = data?.submittedFormData;
  const drills = formData?.drills;
  const [newData, setNewData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { clientId, appointmentId } = useParams();
  const dispatch = useDispatch();

  const drillNames = newData?.map((drill, index) => {
    return {
      // label: `Drill  ${index + 1}. ${drill?.drillName}`,
      label: drill?.drillName,
      value: drill?.drillName,
    };
  });

  const [selectedDrill, setSelectedDrill] = useState(0);

  const handleDrillChange = (value) => {
    newData?.map((drill, index) => {
      if (drill.drillName === value) {
        setSelectedDrill(index);
      }
    });
  };
  const handleNewDataChange = (name, value) => {
    const tempData = [...newData];
    const result = tempData.map((item, index) => {
      if (index === selectedDrill) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setNewData(result);
  };

  const handleInputValueChange = (name, value) => {
    const tempData = [...newData];
    const result = tempData.map((item, index) => {
      if (index === selectedDrill) {
        return { ...item, inputs: { ...item.inputs, [name]: value } };
      }
      return item;
    });
    setNewData(result);
  };

  useEffect(() => {
    if (drills) {
      const tempDrills = drills.map((drill, index) => {
        return {
          ...drill,
          drillName: `Drill  ${index + 1}. ${drill.drillName}`,
        };
      });
      setNewData(tempDrills);
    }
  }, [drills]);

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

  function removeDrillPrefix(str) {
    return str?.replace(/Drill\s+\d+\./g, "").trim();
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const formattedDrills = newData.map((item) => {
      const { drill, drillName, inputs, ...columnValues } = item;
      return {
        drill: item.drill,
        drillName: removeDrillPrefix(item.drillName),
        inputValues: item?.inputs || [],
        columnValues,
      };
      setIsSubmitting(false);
    });

    const formattedData = {
      client: clientId,
      appointment: appointmentId,
      sessions: [
        {
          session: formData?.session,
          drills: formattedDrills,
        },
      ],
    };

    await submitSessionDrills(dispatch, formattedData, clientId, appointmentId);
    handleClose();
    navigate(-1);
  };

  const incomingSelectedDrill = data?.offlineDrillData?.drills?.find((item) => {
    if (
      item.drillName === removeDrillPrefix(newData[selectedDrill]?.drillName)
    ) {
      return true;
    }
    return false;
  });
  const drillInputsParams = incomingSelectedDrill?.inputs;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} style={{ overflowY: "auto" }}>
        <div className="d-flex align-items-center gap-2">
          <div>
            <IconButton
              sx={{
                margin: 0,
                padding: 0,
              }}
              onClick={handleClose}
            >
              <BackIcon size={17} />
            </IconButton>
          </div>
          <div style={{ fontSize: "1.2rem" }} className="fw-semibold">
            Session Details
          </div>
        </div>

        <Row className="mt-3  ">
          <Col xs={12} md={6} className="mb-3 pe-md-5">
            <div>
              <CustomDropdown
                menuData={drillNames}
                value={newData[selectedDrill]?.drillName || ""}
                handleSelect={handleDrillChange}
                width="100%"
                titleWidth={"90%"}
                menuWidth="max-Content"
              />

              <div className="d-flex flex-column gap-1 mt-4">
                <div className="drill-box mt-2">
                  {columns?.map((input, index) => {
                    if (input) {
                      const val = newData[selectedDrill]?.[input?.alias];
                      return (
                        <div className="drill-item" key={index}>
                          <div style={{ fontSize: "0.7rem" }}>
                            {" "}
                            {input.columnName}{" "}
                          </div>
                          <CustomDropdown
                            menuData={input?.data}
                            value={val ? val : ""}
                            handleSelect={(value) => {
                              handleNewDataChange(input?.alias, value);
                            }}
                            width="100%"
                            menuWidth=""
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </Col>

          <Col xs={12} md={6} className="  border-radius-10 ml-5 ">
            <div className="p-4" style={{ backgroundColor: "#F4F4F4" }}>
              <div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                {" "}
                Drill details
              </div>
              <div className="drill-box mt-2">
                {drillInputsParams?.map((input, index) => (
                  <div className="drill-item" key={index}>
                    {input.type === "text" && (
                      <>
                        <div style={{ fontSize: "0.7rem" }}>
                          {" "}
                          {input.label} {input.unit && `(${input.unit})`}
                        </div>
                        <input
                          type="text"
                          // value={newData?.input?.alias}
                          value={
                            newData?.[selectedDrill]?.inputs?.[input.alias] ||
                            ""
                          }
                          onChange={(event) => {
                            handleInputValueChange(
                              input.alias,
                              event.target.value
                            );
                          }}
                          style={{
                            height: "40px",
                            border: "none",
                            width: "100%",
                            paddingLeft: "0.4rem",
                          }}
                          placeholder={`Enter ${input.label}`}
                        />
                      </>
                    )}
                    {input.type === "checkBox" && (
                      <>
                        <div style={{ fontSize: "0.7rem" }}>
                          {" "}
                          {input.label} {input.unit && `(${input.unit})`}
                        </div>
                        <CustomDropdown
                          menuData={input?.options?.map((item) => {
                            return {
                              label: item,
                              value: item,
                            };
                          })}
                          bgColor="#fff"
                          value={
                            newData?.[selectedDrill]?.inputs?.[input.alias] ||
                            ""
                          }
                          handleSelect={(value) => {
                            handleInputValueChange(input.alias, value);
                          }}
                          width="100%"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
              {drillInputsParams?.map(
                (input) =>
                  input.type === "multipleChoice" && (
                    <>
                      <div style={{ fontSize: "0.7rem" }} className="mt-2">
                        {" "}
                        {input.label} {input.unit && `(${input.unit})`}
                      </div>

                      <Select
                        isMulti
                        options={input.options?.map((option, index) => ({
                          value: option,
                          label: option,
                        }))}
                        value={
                          newData?.[selectedDrill]?.inputs?.[input.alias]?.map(
                            (value) => ({
                              value,
                              label: value,
                            })
                          ) || []
                        }
                        onChange={(selectedOptions) => {
                          const selectedValues = selectedOptions.map(
                            (option) => option.value
                          );
                          handleInputValueChange(input.alias, selectedValues);
                        }}
                        className="drill-mcq"
                      />
                    </>
                  )
              )}

              <div className="mt-4 d-flex flex-column gap-1 drill-notes">
                <div style={{ fontSize: "0.7rem" }}> Notes </div>
                <textarea
                  value={newData?.[selectedDrill]?.inputs?.["notes"] || ""}
                  onChange={(event) => {
                    handleInputValueChange("notes", event.target.value);
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
                  style={{
                    padding: 0,
                    height: "2.5rem",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                  }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  Submit Drill data
                </button>

                <div className="d-flex gap-2 ">
                  <button
                    style={{
                      backgroundColor: "#EAE6FF",
                      color: "var(--main-dark)",
                      width: isMobile ? "7rem" : "8rem",
                      cursor: selectedDrill < 1 ? "not-allowed" : "pointer",
                    }}
                    disabled={selectedDrill < 1}
                    onClick={() => {
                      if (selectedDrill >= 1) {
                        setSelectedDrill((prev) => {
                          if (prev >= 1) return prev - 1;
                          return prev;
                        });
                      }
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
                      color: "var(--main-dark)",
                      width: isMobile ? "7rem" : "8rem",
                      cursor:
                        selectedDrill >= drills?.length - 1
                          ? "not-allowed"
                          : "pointer",
                    }}
                    disabled={selectedDrill >= drills?.length - 1}
                    onClick={() => {
                      if (selectedDrill < drills?.length - 1) {
                        setSelectedDrill((prev) => {
                          if (prev <= drills.length - 1) return prev + 1;
                          return prev;
                        });
                      }
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
          </Col>
        </Row>
      </Box>
    </Modal>
  );
}

export default SeasonForm;
