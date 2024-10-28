import React, { useEffect, useState } from "react";
import { FormControl, InputGroup, Spinner } from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import BootstrapModal from "../components/layout/Components/BootstrapModal";
import DoctorMenu from "../components/layout/DoctorMenu";
import {
  GetProfileDetails,
  UpdatePassword,
  UpdateProfilePic,
} from "../features/apiCall";
import { logOut } from "../features/authSlice";
import "../styles/profile.css";

const successToastOptions = {
  position: "top-center",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};
// import { FaCamera } from "react-icons/fa";

const DoctorProfile = () => {
  const defaultPic =
    "https://icon-library.com/images/icon-user/icon-user-15.jpg";

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const token = localStorage.getItem("userToken");
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const handleToggle = () => setIsChecked(!isChecked);
  const [isUploading, setIsUploading] = useState(false);
  const [user, setUser] = useState([]);
  const handleLogout = async () => {
    await dispatch(logOut());
  };
  const { isFetching, userName, userEmail, phone } = useSelector(
    (state) => state.auth
  );
  const [image, setImage] = useState(defaultPic);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      const data = await GetProfileDetails(dispatch);
      console.log("Dataaa", data.user.profilePic);
      if (data && data.user.profilePic && data.user.profilePic !== "picture") {
        setImage(data.user.profilePic);
      }
      console.log("No data");
    };
    fetchProfileDetails();
  }, [dispatch]);
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("profilePic", file);

      try {
        const result = await UpdateProfilePic(dispatch, {
          formData,
          userId: userEmail,
        });

        if (result) {
          setImage(result?.profilePicUrl);
          localStorage.setItem("profilePic", result.profilePicUrl);
          // toast.success("Profile picture updated successfully", successToastOptions);
        } else {
          // toast.error("Failed to upload image", ErrorToastOptions);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        // toast.error("An error occurred while uploading the image", ErrorToastOptions);
      } finally {
        setIsUploading(false);
      }
    }
  };

  console.log("IMage", image);
  // console.log("profile", profilePic)
  return (
    <DoctorMenu>
      <div className="m-4 profile">
        <section
          className="p-4  "
          style={{
            backgroundColor: "white",
            margin: "auto",
            height: "95vh",
            overflowY: "scroll",
          }}
        >
          <h4> Profile</h4>
          <div
            className="p-4 prof-cont"
            style={{ alignItems: "center", backgroundColor: "#F4F4F4" }}
          >
            <div className="d-flex flex-md-row flex-column  align-items-center">
              <div
                className="profile-picture-container"
                style={{ marginRight: "40px", position: "relative" }}
              >
                {isUploading ? (
                  <div className="upload-spinner">
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : (
                  <>
                    <img
                      src={image}
                      alt="Profile"
                      className="profile-picture"
                    />
                    <label className="camera-icon">
                      <i
                        className="fa-solid fa-camera"
                        style={{ color: "var(--main-dark)" }}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={isUploading}
                      />
                    </label>
                  </>
                )}
              </div>
              <div className="mt-md-0 mt-2">
                <ReactPlaceholder
                  type="text"
                  color="#F0F0F0"
                  showLoadingAnimation
                  rows={1}
                  style={{ width: "30%" }}
                  ready={!isFetching}
                >
                  <h5>{userName}</h5>
                  <div style={{ color: "rgb(134 131 131)" }}>
                    <p>{userEmail}</p>
                    <p>{phone}</p>
                  </div>
                </ReactPlaceholder>
              </div>
            </div>
            <div>
              <img
                src="/images/icon/svg.svg"
                height={30}
                style={{ borderRadius: "50%", marginRight: "40px" }}
              />
            </div>
          </div>
          <Link to="/doctor/dashboard/edit-profile">
            <div className=" prof-cont">
              <div>
                <p>Edit Profile</p>
                <span>you can edit you all information from here</span>
              </div>
              <div>
                <img src="/images/icons/arrow-left.svg" />
              </div>
            </div>
          </Link>
          <Link onClick={() => setShowModal(true)}>
            {" "}
            <div className="prof-cont">
              <div>
                <p>Change Password</p>
                <span>Change password to login to your account.</span>
              </div>
              <div>
                <img src="/images/icons/arrow-left.svg" />
              </div>
            </div>
          </Link>

          <Link to="/privacy-policy">
            <div className="prof-cont">
              <div>
                <p>Privacy Policy</p>
                <span>View the privacy policy </span>
              </div>
              <div>
                <img src="/images/icons/arrow-left.svg" />
              </div>
            </div>
          </Link>
          <Link to="/terms-of-use">
            <div className="prof-cont">
              <div>
                <p>Terms of use</p>
                <span>View the terms of use </span>{" "}
              </div>
              <div>
                <img src="/images/icons/arrow-left.svg" />
              </div>
            </div>
          </Link>
          <div className="pl-4 ">
            <button className="text-danger p-0" onClick={handleLogout}>
              <svg
                width="110"
                height="16"
                viewBox="0 0 147 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 7L12.6 8.4L14.2 10H6V12H14.2L12.6 13.6L14 15L18 11L14 7ZM2 4H9V2H2C0.9 2 0 2.9 0 4V18C0 19.1 0.9 20 2 20H9V18H2V4Z"
                  fill="#FF2222"
                />
                <path
                  d="M37.027 16.236V18H29.539V5.04H31.645V16.236H37.027ZM41.8843 8.676C42.5623 8.676 43.1743 8.787 43.7203 9.009C44.2723 9.231 44.7403 9.546 45.1243 9.954C45.5143 10.362 45.8143 10.857 46.0243 11.439C46.2343 12.021 46.3393 12.675 46.3393 13.401C46.3393 14.127 46.2343 14.781 46.0243 15.363C45.8143 15.945 45.5143 16.443 45.1243 16.857C44.7403 17.265 44.2723 17.58 43.7203 17.802C43.1743 18.024 42.5623 18.135 41.8843 18.135C41.2003 18.135 40.5823 18.024 40.0303 17.802C39.4843 17.58 39.0163 17.265 38.6263 16.857C38.2363 16.443 37.9363 15.945 37.7263 15.363C37.5163 14.781 37.4113 14.127 37.4113 13.401C37.4113 12.675 37.5163 12.021 37.7263 11.439C37.9363 10.857 38.2363 10.362 38.6263 9.954C39.0163 9.546 39.4843 9.231 40.0303 9.009C40.5823 8.787 41.2003 8.676 41.8843 8.676ZM41.8843 16.623C42.7123 16.623 43.3273 16.347 43.7293 15.795C44.1373 15.237 44.3413 14.442 44.3413 13.41C44.3413 12.378 44.1373 11.583 43.7293 11.025C43.3273 10.461 42.7123 10.179 41.8843 10.179C41.0443 10.179 40.4203 10.461 40.0123 11.025C39.6043 11.583 39.4003 12.378 39.4003 13.41C39.4003 14.442 39.6043 15.237 40.0123 15.795C40.4203 16.347 41.0443 16.623 41.8843 16.623ZM51.4042 13.329C52.0042 13.329 52.4542 13.176 52.7542 12.87C53.0542 12.564 53.2042 12.165 53.2042 11.673C53.2042 11.169 53.0542 10.77 52.7542 10.476C52.4542 10.182 52.0042 10.035 51.4042 10.035C50.8102 10.035 50.3602 10.182 50.0542 10.476C49.7542 10.77 49.6042 11.169 49.6042 11.673C49.6042 11.913 49.6432 12.135 49.7212 12.339C49.7992 12.543 49.9132 12.72 50.0632 12.87C50.2132 13.014 50.3992 13.128 50.6212 13.212C50.8492 13.29 51.1102 13.329 51.4042 13.329ZM54.0952 18.45C54.0952 18.246 54.0352 18.084 53.9152 17.964C53.8012 17.838 53.6452 17.742 53.4472 17.676C53.2492 17.604 53.0182 17.553 52.7542 17.523C52.4902 17.487 52.2082 17.463 51.9082 17.451C51.6142 17.433 51.3112 17.418 50.9992 17.406C50.6932 17.388 50.3962 17.358 50.1082 17.316C49.8202 17.466 49.5832 17.646 49.3972 17.856C49.2172 18.066 49.1272 18.309 49.1272 18.585C49.1272 18.765 49.1722 18.933 49.2622 19.089C49.3582 19.245 49.5022 19.38 49.6942 19.494C49.8922 19.608 50.1412 19.698 50.4412 19.764C50.7472 19.83 51.1132 19.863 51.5392 19.863C52.3912 19.863 53.0302 19.731 53.4562 19.467C53.8822 19.203 54.0952 18.864 54.0952 18.45ZM56.0392 9.153V9.873C56.0392 10.113 55.8952 10.26 55.6072 10.314L54.6892 10.467C54.8452 10.815 54.9232 11.202 54.9232 11.628C54.9232 12.078 54.8332 12.486 54.6532 12.852C54.4792 13.218 54.2362 13.53 53.9242 13.788C53.6122 14.046 53.2402 14.244 52.8082 14.382C52.3762 14.52 51.9082 14.589 51.4042 14.589C51.2122 14.589 51.0232 14.58 50.8372 14.562C50.6572 14.538 50.4802 14.508 50.3062 14.472C50.1322 14.574 50.0032 14.682 49.9192 14.796C49.8352 14.91 49.7932 15.027 49.7932 15.147C49.7932 15.345 49.8802 15.492 50.0542 15.588C50.2282 15.684 50.4562 15.753 50.7382 15.795C51.0262 15.837 51.3532 15.864 51.7192 15.876C52.0852 15.888 52.4572 15.909 52.8352 15.939C53.2132 15.969 53.5852 16.02 53.9512 16.092C54.3172 16.158 54.6412 16.272 54.9232 16.434C55.2112 16.59 55.4422 16.803 55.6162 17.073C55.7902 17.343 55.8772 17.694 55.8772 18.126C55.8772 18.522 55.7782 18.909 55.5802 19.287C55.3822 19.665 55.0942 20.001 54.7162 20.295C54.3442 20.589 53.8882 20.823 53.3482 20.997C52.8082 21.177 52.1932 21.267 51.5032 21.267C50.8192 21.267 50.2222 21.201 49.7122 21.069C49.2082 20.937 48.7852 20.757 48.4432 20.529C48.1072 20.307 47.8552 20.049 47.6872 19.755C47.5252 19.461 47.4442 19.155 47.4442 18.837C47.4442 18.405 47.5792 18.036 47.8492 17.73C48.1252 17.424 48.4972 17.184 48.9652 17.01C48.7132 16.89 48.5092 16.725 48.3532 16.515C48.2032 16.305 48.1282 16.029 48.1282 15.687C48.1282 15.417 48.2272 15.135 48.4252 14.841C48.6232 14.547 48.9202 14.298 49.3162 14.094C48.8602 13.842 48.5002 13.509 48.2362 13.095C47.9722 12.675 47.8402 12.186 47.8402 11.628C47.8402 11.172 47.9272 10.761 48.1012 10.395C48.2812 10.029 48.5302 9.717 48.8482 9.459C49.1662 9.201 49.5412 9.003 49.9732 8.865C50.4112 8.727 50.8882 8.658 51.4042 8.658C52.1962 8.658 52.8862 8.823 53.4742 9.153H56.0392ZM61.3785 8.676C62.0565 8.676 62.6685 8.787 63.2145 9.009C63.7665 9.231 64.2345 9.546 64.6185 9.954C65.0085 10.362 65.3085 10.857 65.5185 11.439C65.7285 12.021 65.8335 12.675 65.8335 13.401C65.8335 14.127 65.7285 14.781 65.5185 15.363C65.3085 15.945 65.0085 16.443 64.6185 16.857C64.2345 17.265 63.7665 17.58 63.2145 17.802C62.6685 18.024 62.0565 18.135 61.3785 18.135C60.6945 18.135 60.0765 18.024 59.5245 17.802C58.9785 17.58 58.5105 17.265 58.1205 16.857C57.7305 16.443 57.4305 15.945 57.2205 15.363C57.0105 14.781 56.9055 14.127 56.9055 13.401C56.9055 12.675 57.0105 12.021 57.2205 11.439C57.4305 10.857 57.7305 10.362 58.1205 9.954C58.5105 9.546 58.9785 9.231 59.5245 9.009C60.0765 8.787 60.6945 8.676 61.3785 8.676ZM61.3785 16.623C62.2065 16.623 62.8215 16.347 63.2235 15.795C63.6315 15.237 63.8355 14.442 63.8355 13.41C63.8355 12.378 63.6315 11.583 63.2235 11.025C62.8215 10.461 62.2065 10.179 61.3785 10.179C60.5385 10.179 59.9145 10.461 59.5065 11.025C59.0985 11.583 58.8945 12.378 58.8945 13.41C58.8945 14.442 59.0985 15.237 59.5065 15.795C59.9145 16.347 60.5385 16.623 61.3785 16.623ZM75.4327 8.82V18H74.2627C74.0047 18 73.8397 17.877 73.7677 17.631L73.6237 16.776C73.4317 16.98 73.2277 17.166 73.0117 17.334C72.8017 17.502 72.5767 17.646 72.3367 17.766C72.0967 17.886 71.8387 17.979 71.5627 18.045C71.2927 18.111 71.0017 18.144 70.6897 18.144C70.1857 18.144 69.7417 18.06 69.3577 17.892C68.9737 17.724 68.6497 17.487 68.3857 17.181C68.1277 16.875 67.9327 16.509 67.8007 16.083C67.6687 15.651 67.6027 15.177 67.6027 14.661V8.82H69.5377V14.661C69.5377 15.279 69.6787 15.759 69.9607 16.101C70.2487 16.443 70.6837 16.614 71.2657 16.614C71.6917 16.614 72.0877 16.518 72.4537 16.326C72.8257 16.128 73.1737 15.858 73.4977 15.516V8.82H75.4327ZM80.7255 18.144C79.9635 18.144 79.3755 17.931 78.9615 17.505C78.5535 17.073 78.3495 16.467 78.3495 15.687V10.341H77.3415C77.2335 10.341 77.1405 10.308 77.0625 10.242C76.9845 10.17 76.9455 10.065 76.9455 9.927V9.144L78.4305 8.928L78.8535 6.273C78.8835 6.171 78.9345 6.09 79.0065 6.03C79.0785 5.964 79.1745 5.931 79.2945 5.931H80.2845V8.946H82.8315V10.341H80.2845V15.552C80.2845 15.882 80.3655 16.134 80.5275 16.308C80.6895 16.482 80.9055 16.569 81.1755 16.569C81.3255 16.569 81.4545 16.551 81.5625 16.515C81.6705 16.473 81.7635 16.431 81.8415 16.389C81.9195 16.341 81.9855 16.299 82.0395 16.263C82.0995 16.221 82.1565 16.2 82.2105 16.2C82.3185 16.2 82.4055 16.26 82.4715 16.38L83.0475 17.325C82.7475 17.589 82.3935 17.793 81.9855 17.937C81.5775 18.075 81.1575 18.144 80.7255 18.144Z"
                  fill="#FF2222"
                />
              </svg>
            </button>
            <br />
            <span>Log out from this device.</span>
          </div>
        </section>
      </div>
      <BootstrapModal
        showModal={showModal}
        handleClose={handleClose}
        modalTitle={""}
        modalContent={
          <ModalContent handleClose={handleClose} email={user?.email} />
        }
      />
    </DoctorMenu>
  );
};

export default DoctorProfile;

const ModalContent = ({ handleClose, email }) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    newPassword: "",
    oldPassword: "",
    showNewPassword: false,
    showOldPassword: false,
  });

  const handlePwdChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const ErrorToastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleTogglePassword = (passwordType) => {
    setValues((prevValues) => ({
      ...prevValues,
      [`show${passwordType}`]: !prevValues[`show${passwordType}`],
    }));
  };

  const handleValidation = () => {
    const { newPassword, oldPassword } = values;

    if (newPassword.length < 8) {
      toast.error("Password must contain 8 characters.", ErrorToastOptions);
      return false;
    } else if (oldPassword !== oldPassword) {
      toast.error("Passwords do not match.", ErrorToastOptions);
      return false;
    }

    return true;
  };

  const handlePwdSubmit = async (e) => {
    e.preventDefault();
    const { newPassword, oldPassword } = values;

    if (handleValidation()) {
      try {
        const data = await UpdatePassword(dispatch, {
          email,
          newPassword,
          oldPassword,
        });
        if (data) {
          setValues({
            newPassword: "",
            oldPassword: "",
          });
          handleClose();
        }
      } catch (error) {
        console.error("Error updating password:", error);
        // Handle error logic here if needed
      }
    }
  };

  return (
    <>
      <section className="forgot-password p-4">
        <h3 className="mb-4 font-weight-bold">Change Password</h3>
        <p className="mb-1 mt-4 email ml-1">
          Set your New Password So you can access your data
        </p>
        <form className="p-1 mt-3">
          <label htmlFor="newPassword">New Password</label>
          <InputGroup>
            <FormControl
              type={values.showNewPassword ? "text" : "password"}
              onChange={handlePwdChange}
              name="newPassword"
              required
              value={values?.newPassword}
              className="form-control mb-3"
            />
            <NavLink
              className="password-eye"
              onClick={() => handleTogglePassword("NewPassword")}
            >
              {values.showNewPassword ? (
                <i className="fa-solid fa-eye" />
              ) : (
                <i className="fa fa-eye-slash " />
              )}
            </NavLink>
          </InputGroup>
          <br />
          <label htmlFor="oldPassword">Old Password</label>
          <InputGroup>
            <FormControl
              type={values.showOldPassword ? "text" : "password"}
              onChange={handlePwdChange}
              name="oldPassword"
              required
              value={values?.oldPassword}
              className="form-control mb-3"
            />
            <NavLink
              className="password-eye"
              onClick={() => handleTogglePassword("OldPassword")}
            >
              {values.showOldPassword ? (
                <i className="fa-solid fa-eye" />
              ) : (
                <i className="fa fa-eye-slash " />
              )}
            </NavLink>
          </InputGroup>
          <button
            onClick={handlePwdSubmit}
            className="purple-button w-100 mt-4"
            style={{ height: "55px" }}
          >
            Change Password
          </button>
        </form>
      </section>
    </>
  );
};
