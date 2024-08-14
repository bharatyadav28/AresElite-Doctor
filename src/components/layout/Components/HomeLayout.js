import React from "react";
import DoctorMenu from "../../layout/DoctorMenu";
import DoctorTodayAppointment from "../../layout/DoctorTodayAppointment";

const HomeLayout = ({ children }) => {
  return (
    <DoctorMenu>
      <div
        className="d-flex Doctor-home  flex-wrap "
        style={{ justifyContent: "space-evenly" }}
      >
        <div
          className="tablet-child"
          style={{
            backgroundColor: "white",
            height: "100%",
            width: "47%",
            borderRadius: "20px",
          }}
        >
          <img
            src="/images/icon/bubbleacent.svg"
            width={80}
            alt="logo"
            id="img-1-home"
          />

          {children}
          <img
            src="/images/icon/svg.svg"
            width={70}
            alt="logo"
            id="img-2-home"
          />
        </div>

        <DoctorTodayAppointment />
      </div>
    </DoctorMenu>
  );
};

export default HomeLayout;
