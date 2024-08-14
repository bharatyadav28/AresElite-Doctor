import { jwtDecode as jwt_decode } from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { logOut } from "../features/authSlice";

const ProtectedRoute = () => {
  const { isFetching, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        const decodedToken = jwt_decode(token);
        if (decodedToken.exp < Date.now() / 1000) {
          dispatch(logOut());
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    checkToken();
  }, [token, navigate]);

  if (!token && !isFetching) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
