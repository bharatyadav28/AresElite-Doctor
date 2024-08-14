import React from "react";
import { Col } from "react-bootstrap";

const ProfileContent = ({ children }) => {
  return (
    <Col sm={9}>
      <div>
        <div className=" p-0">
          <main>{children}</main>
        </div>
      </div>
    </Col>
  );
};

export default ProfileContent;
