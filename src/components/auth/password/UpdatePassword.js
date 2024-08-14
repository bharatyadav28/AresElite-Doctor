import React, { useEffect, useState } from "react";
import { Form, FormControl, InputGroup, NavLink } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ResetPassword } from "../../../features/apiCall";
import AuthLayout from "../AuthLayout";
const ErrorToastOptions = {
  position: "bottom-center",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};
const UpdatePassword = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = location.state;
  useEffect(() => {
    if (!email) {
      // Navigate to forgot-password page if email is not available
      navigate("/forgot-password");
    }
  }, [email]);

  const [values, setValues] = useState({
    newPassword: "",
    confirmPassword: "",
    showPassword: false,
    showcnfmPassword: false,
  });
  const handlePwdChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { newPassword, confirmPassword } = values;

    if (newPassword.length < 8) {
      toast.error("Password must contain 8 characters.", ErrorToastOptions);
      return false;
    } else if (confirmPassword !== confirmPassword) {
      toast.error("Passwords do not match.", ErrorToastOptions);
      return false;
    }

    return true;
  };
  const handleTogglePassword = () => {
    setValues((prevValues) => ({
      ...prevValues,
      showPassword: !prevValues.showPassword,
    }));
  };
  const handleTogglecnfmPassword = () => {
    setValues((prevValues) => ({
      ...prevValues,

      showcnfmPassword: !prevValues.showcnfmPassword,
    }));
  };
  const handlePwdSubmit = async (e) => {
    e.preventDefault();

    const { newPassword, confirmPassword } = values;

    if (handleValidation()) {
      if (
        await ResetPassword(dispatch, { email, newPassword, confirmPassword })
      ) {
        navigate("/");
        setValues({
          newPassword: "",
          confirmPassword: "",
        });
      }
    }
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <AuthLayout>
      <section className="forgot-password background-auth-2">
        <button onClick={handleGoBack} className=" p-0 mb-4 ">
          <img src="/images/icon/back.svg" alt="back" width={30} />
        </button>
        <h3 className="mb-4 font-weight-bold">Change Password</h3>
        <p className="mb-1 mt-4 email ml-1">
          Set your New Password So you can access your data{" "}
        </p>
        <Form onSubmit={handlePwdSubmit} className="p-1 mt-3">
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <InputGroup>
              <FormControl
                type={values.showPassword ? "text" : "password"}
                onChange={handlePwdChange}
                name="newPassword"
                required
                value={values?.newPassword}
                className="form-control mb-3"
              />
              <NavLink className="password-eye" onClick={handleTogglePassword}>
                {values.showPassword ? (
                  <i className="fa-solid fa-eye" />
                ) : (
                  <i className="fa fa-eye-slash " />
                )}
              </NavLink>
            </InputGroup>
          </div>
          <div className="form-group">
            <label htmlFor="oldPassword">Confirm Password</label>
            <InputGroup>
              <Form.Control
                className="mb-3"
                type={values.showcnfmPassword ? "text" : "password"}
                onChange={handlePwdChange}
                name="confirmPassword"
                required
                value={values?.confirmPassword}
              />
              <NavLink
                className="password-eye"
                onClick={handleTogglecnfmPassword}
              >
                {values.showcnfmPassword ? (
                  <i className="fa-solid fa-eye" />
                ) : (
                  <i className="fa fa-eye-slash " />
                )}
              </NavLink>
            </InputGroup>
          </div>
          <button type="submit" className="purple-button w-100">
            Change Password{" "}
          </button>
        </Form>
      </section>
    </AuthLayout>
  );
};

export default UpdatePassword;
