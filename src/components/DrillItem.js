import * as React from "react";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import { IoIosArrowDown as ArrowIcon } from "react-icons/io";
import { GoDotFill as DotIcon } from "react-icons/go";

function DrillItem() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

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
          <Typography style={{ color: "#3C3F53" }}>Drill 1 </Typography>
          {!expanded && (
            <div style={{ color: "#3C3F53" }} className="d-flex">
              <DotIcon className=" ms-3 my-auto me-1" size={10} />
              <div> 7/26/24</div>
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
                  Virtual Reality-Neurotainer-G.U.S.T
                </div>
              </div>
              <div className="d-flex flex-column align-items-end">
                <div style={{ color: "#3C3F53CC", fontSize: "0.9rem" }}>
                  Date
                </div>
                <div style={{ color: "#010628", fontSize: "1.1rem" }}>
                  7/26/24
                </div>
              </div>
            </div>

            <div>
              <div className="mt-4" style={{ color: "#3C3F53" }}>
                Drill details
              </div>
              <div className="d-flex gap-4 mt-2">
                <div className="d-flex flex-column">
                  <div style={{ color: "#3C3F53", fontSize: "0.9rem" }}>
                    Bonus Score
                  </div>
                  <div
                    className="text-center p-2 "
                    style={{ backgroundColor: "#F4F4F4" }}
                  >
                    10
                  </div>
                </div>

                <div className="d-flex flex-column">
                  <div style={{ color: "#3C3F53", fontSize: "0.9rem" }}>
                    Headcheck Score
                  </div>
                  <div
                    className="text-center p-2 "
                    style={{ backgroundColor: "#F4F4F4" }}
                  >
                    118
                  </div>
                </div>

                <div className="d-flex flex-column">
                  <div style={{ color: "#3C3F53", fontSize: "0.9rem" }}>
                    Paddle acivation
                  </div>
                  <div
                    className="text-center p-2 "
                    style={{ backgroundColor: "#F4F4F4" }}
                  >
                    2
                  </div>
                </div>

                <div className="d-flex flex-column">
                  <div style={{ color: "#3C3F53", fontSize: "0.9rem" }}>
                    Pass Accuracy
                  </div>
                  <div
                    className="text-center p-2 "
                    style={{ backgroundColor: "#F4F4F4" }}
                  >
                    90
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default DrillItem;
