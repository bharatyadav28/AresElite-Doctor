import React from "react";
import { Container, Row } from "react-bootstrap";
// import image from "../../../public/images/profile_heading.png";
import AtheleteMenu from "./AtheleteMenu";
import ProfileContent from "./Components/ProfileContent";
import ProfileDetails from "./Components/ProfileDetails";
import ProfileNavigation from "./Components/ProfileNavigation";

const AtheProfileLayout = ({ children }) => {
  return (
    <AtheleteMenu>
      <section style={{ width: "87vw", margin: " 20px" }}>
        {/* <img src="/images/profile_heading.png" /> */}
        <div className="profile-back"></div>
        <Container style={{ width: "90%" }}>
          <ProfileDetails />

          <Row
            className="justify-content-between"
            style={{
              gap: "20px",
              position: "relative",
              bottom: "50px",
              height: "70vh",
            }}
          >
            <ProfileNavigation />

            <ProfileContent>{children}</ProfileContent>
          </Row>
        </Container>
      </section>
    </AtheleteMenu>
  );
};

export default AtheProfileLayout;
