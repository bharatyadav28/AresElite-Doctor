import * as React from "react";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { BiMessageDetail as DetailIcon } from "react-icons/bi";
import { IconButton } from "@mui/material";

import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

import { IoIosArrowDown as ArrowIcon } from "react-icons/io";
import { GoDotFill as DotIcon } from "react-icons/go";
import { IsoToNormal } from "../utils/dates";
import NormalCase from "../utils/NormalCase";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 15,
    maxWidth: 500,
  },
}));

function DrillItem({ drill, index, creationTime, units }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const inputValues = drill?.inputValues || {};
  const creationDate = drill?.createdAt
    ? IsoToNormal(drill?.createdAt)
    : IsoToNormal(creationTime);

  const itemLabel = (input) => {
    let result = "";
    units.forEach((item) => {
      if (item.alias === input) {
        result = item?.label;
      }
    });
    return result;
  };
  console.log("Input values", inputValues);

  const displayValue = (input) => {
    let unit = "";
    const enteredValue = inputValues[input];

    units.forEach((item) => {
      if (item.alias === input) {
        unit = item.unit;
      }
    });

    if (Array.isArray(enteredValue)) {
      return enteredValue.map((val) => val + " " + unit).join(" , ");
    }

    return enteredValue + " " + unit;
  };

  function truncateString(input) {
    if (input.length <= 10) {
      return input;
    }
    return input.slice(0, 10) + "...";
  }

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        style={{
          boxShadow:
            "0px 2px 1px -1px rgba(0, 0, 0, 0.12), 0px 1px 1px 0px rgba(0, 0, 0, 0.12), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          className="d-flex align-items-center"
        >
          <Typography style={{ color: "#3C3F53" }}>
            Drill {index + 1}{" "}
          </Typography>
          {!expanded && (
            <div style={{ color: "#3C3F53" }} className="d-flex">
              <DotIcon className=" ms-3 my-auto me-1" size={10} />
              <div> {creationDate}</div>
            </div>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column">
                <div style={{ color: "#3C3F53CC", fontSize: "0.9rem" }}>
                  Drill name
                </div>
                <div style={{ color: "#010628", fontSize: "1.1rem" }}>
                  {drill?.drillName}
                </div>
              </div>
              <div className="d-flex flex-column align-items-end">
                <div style={{ color: "#3C3F53CC", fontSize: "0.9rem" }}>
                  Date
                </div>
                <div style={{ color: "#010628", fontSize: "1.1rem" }}>
                  {creationDate}
                </div>
              </div>
            </div>

            <div>
              <div className="mt-4" style={{ color: "#3C3F53" }}>
                Drill details
              </div>
              <div className="d-flex flex-wrap gap-4 mt-2">
                {Object.keys(inputValues).map((input, index) => (
                  <div className="d-flex flex-column" key={index}>
                    <div
                      className="d-flex gap-1"
                      style={{ color: "#3C3F53", fontSize: "0.9rem" }}
                    >
                      {/* {itemLabel(input)} */}
                      <div> {NormalCase(input)} </div>

                      {input === "notes" && (
                        <LightTooltip title={displayValue(input)}>
                          <IconButton
                            sx={{
                              margin: 0,
                              padding: 0,
                              marginBottom: "0.3rem",
                            }}
                          >
                            <DetailIcon size={15} />
                          </IconButton>
                        </LightTooltip>
                      )}
                    </div>
                    <div
                      className="text-center p-2 "
                      style={{ backgroundColor: "#F4F4F4" }}
                    >
                      {input !== "notes"
                        ? displayValue(input)
                        : truncateString(displayValue(input))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default DrillItem;
