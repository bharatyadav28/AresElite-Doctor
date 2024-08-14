import React from "react";
import { Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ProfileNavigation = () => {
  return (
    <Col sm={2} className="mt-3">
      <div className="list-group profile-ul">
        <NavLink
          to="/a-profile"
          className="list-group-item list-group-item-action"
        >
          Edit Profile
        </NavLink>
        <NavLink
          to="/a-security"
          className="list-group-item list-group-item-action"
        >
          Password & Security
        </NavLink>
        <NavLink
          to="/a-account"
          className="list-group-item list-group-item-action"
        >
          Account
        </NavLink>
      </div>
    </Col>
  );
};

export default ProfileNavigation;
