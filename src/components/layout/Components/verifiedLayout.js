import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DoctorMenu from "../DoctorMenu";
import DoctorTodayAppointment from "../DoctorTodayAppointment"; // Importing DoctorTodayAppointment if not already imported
import { useLocation } from "react-router-dom";
import { GetAthProfileDetails } from "../../../features/apiCall";

const VerifiedLayout = ({ children }) => {
  const defaultPic =
    "https://icon-library.com/images/icon-user/icon-user-15.jpg";

  const dispatch = useDispatch();
  const [image, setImage] = useState(defaultPic);
  useEffect(() => {
    const fetchProfileDetails = async () => {
      const data = await GetAthProfileDetails(dispatch);

      if (data && data.user.profilePic) {
        if (data.user.profilePic === "picture") {
          setImage(defaultPic);
        } else {
          setImage(data.user.profilePic);
        }
      }
      console.log("No data");
    };
    fetchProfileDetails();
  }, [dispatch]);
  const navigate = useNavigate();
  const name = localStorage.getItem("ath-fname");
  const email = localStorage.getItem("ath-email");
  const location = useLocation();
  // console.log(fname, lname, email,location.pathname);
  const handleGoBack = () => {
    console.log("Going back");
    if (location.pathname === "/doctor/dashboard/doctor-service-selection") {
      localStorage.removeItem("client_id");
      localStorage.removeItem("ath-fname");
      localStorage.removeItem("ath-email");

      navigate("/doctor/dashboard");
    } else {
      navigate(-1);
    }
  };

  return (
    <DoctorMenu>
      <>
        <button onClick={handleGoBack} className="m-2 p-0 mb-4" id="back_bt">
          <img src="/images/icons/backdark.svg" alt="back" width={30} />
        </button>

        <div
          className="d-flex Doctor-home  flex-wrap "
          style={{ justifyContent: "space-evenly" }}
        >
          <div
            style={{
              backgroundColor: "white",
              height: "100%",
              width: "47%",
              borderRadius: "20px",
            }}
            className="verified-ipad"
          >
            <div
              style={{
                alignItems: "center",
                height: "120px",
                backgroundColor: "var(--main-dark)",
                borderRadius: "20px 20px 0px 0px",
              }}
              className="w-100 d-flex justify-content-center flex-row text-left gap-3"
            >
              <img
                src={image}
                width={55}
                height={55}
                style={{ borderRadius: "50%" }}
                alt="Pic"
              />
              )
              <div className="text-light ml-3">
                <h5>{`${name}`}</h5>
                <p style={{ fontSize: "12px" }} className="m-0 p-0">
                  {email}
                </p>
              </div>
            </div>
            <img
              src="/images/icons/bublewhite.svg"
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
      </>
    </DoctorMenu>
  );
};

export default VerifiedLayout;
