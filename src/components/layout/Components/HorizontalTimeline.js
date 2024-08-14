import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const HorizontalTimeline = ({ currentStep, totalSteps, labels, className }) => {
  return (
    <Container>
      <Row>
        <Col>
          <div
            className={`timeline-steps mt-2 ${className}`}
            style={{
              display: "flex",
              justifyContent: "center",
              // flexWrap: "wrap",
            }}
          >
            {labels.map((label, index) => (
              <div
                key={index}
                className={`timeline-step ${
                  index < currentStep ? "completed" : ""
                }`}
              >
                <div className="timeline-content">
                  <div
                    className={`inner-circle ${
                      index < currentStep ? "completed" : ""
                    }`}
                  >
                    {index < currentStep && (
                      <img
                        src="/images/icon/check.svg"
                        alt="tick"
                        style={{ width: "100%" }}
                      />
                    )}
                  </div>
                  <p className="h6 mt-2 mb-1">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HorizontalTimeline;
