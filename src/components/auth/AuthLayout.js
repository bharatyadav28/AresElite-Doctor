import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div id="logo">
          <img
            src="/images/DoctorMenuLogo.png"
            alt="logo"
            width={130}
            className="menu-logo"
          />
        </div>
        <main className="sign-in-container">{children}</main>
      </div>
    </div>
  );
};

export default AuthLayout;
