import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../features/apiCall";
import AuthLayout from "./AuthLayout";

const SignIn = () => {
  const { isFetching, error, errMsg, token } = useSelector(
    (state) => state.auth
  );
  const [PasswordError, setPasswordError] = useState("");

  const [isLoogedIn, setIsLoogedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ErrorToastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false, // Added state for toggling password visibility
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleTogglePassword = () => {
    setValues((prevValues) => ({
      ...prevValues,
      showPassword: !prevValues.showPassword,
    }));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (token) {
      navigate("/doctor/dashboard");
    }
  }, [navigate, token, error, isFetching, isLoogedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    await login(dispatch, { email, password });
    setIsLoogedIn(true);
  };
  // useEffect(() => {
  //   if (error && !isFetching && isLoogedIn) {
  //     toast.error(errMsg || "Unknown error occurred", ErrorToastOptions);
  //     setIsLoogedIn(false);
  //   }
  // }, [error, isFetching, isLoogedIn, errMsg]);
  return (
    <AuthLayout>
      <div className="background-auth">
        <section className="illustration-container d-none ">
          <img
            src="images/UpdatePassword.png"
            className="illustration"
            style={{ width: "auto", height: "200px" }}
          />
        </section>
        <h6 className="text-secondary">Welcome !</h6>
        <Form onSubmit={handleSubmit} style={{ width: "407px" }}>
          <h3 className="mb-5 font-weight-bold">Log in for Ares Elite</h3>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email ID</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={values.email}
              className="mb-3 mt-2"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={values.showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                value={values.password}
                className="mb-3 mt-2"
              />

              <NavLink className="password-eye" onClick={handleTogglePassword}>
                {values.showPassword ? (
                  <i className="fa-solid fa-eye" />
                ) : (
                  <i className="fa fa-eye-slash " />
                )}
              </NavLink>
            </InputGroup>
          </Form.Group>
          <div style={{display:"flex",justifyContent:"flex-end"}} >
          <NavLink
            className="d-block  mb-2 text-decoration-none purple-text"
            to="/forgot-password"
          >
            Forgot Password ?
          </NavLink>
          </div>
          {/* <FormCheck
          type="checkbox"
          id="default-checkbox"
          label={
            <span style={{ fontSize: "12px" }}>
              By signing up, you agree to our{" "}
              <span className="purple-text">Terms</span> and have read and
              acknowledge the{" "}
              <span className="purple-text"> Privacy Policies.</span>
            </span>
          }
          className="mb-4 mt-4"
        /> */}

          {isFetching ? (
            <Button type="submit" className="purple-button w-100 mt-4">
              <Spinner animation="border" variant="light" />
            </Button>
          ) : (
            <Button type="submit" className="purple-button w-100 mt-4">
              Login
            </Button>
          )}
          {/* <Link to="/signup">
          <p
            className="position-relative bottom text-center"
            style={{ top: "20vh" }}
          >
            Don’t have an account?{" "}
            <span className="color-purple font-weight-bold">{"  "}Sign up</span>
          </p>{" "}
        </Link> */}
        </Form>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
