import React from "react";
import { Row } from "react-bootstrap";

const ProfileDetails = () => {
  return (
    <Row>
      <div
        className="d-flex justify-content-between "
        style={{ position: "relative", bottom: "60px" }}
      >
        <div className="d-flex " sm={6}>
          <img
            src="/images/sample.svg"
            style={{ border: "3px solid purple", borderRadius: "50%" }}
          />
          <div className="d-flex align-self-end flex-column m-5">
            <h2 style={{ color: "#083A50" }}>Mobina Mirbagheri</h2>
            {/* <p>Your account is ready</p> */}
          </div>
        </div>
        <div className="d-flex align-self-center justify-content-end" sm={6}>
          <img src="/images/icon/share.svg" />
        </div>
      </div>
    </Row>
  );
};

export default ProfileDetails;
