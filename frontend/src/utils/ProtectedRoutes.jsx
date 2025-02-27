import { Outlet, Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState, useEffect } from "react";

const ProtectedRoutes = ({ allowedRoles , children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    try {
      const response = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      auth()
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpired = decoded.exp;
    const now = Date.now() / 1000;
    if (tokenExpired < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token && allowedRoles) {
    const decoded = jwtDecode(token);
    if (!allowedRoles.includes(decoded.role)) {
      return <Navigate to="/not-authorized" replace />;
    }
  }

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }
  console.log("is auth : ", isAuthorized);

  return isAuthorized ? children || <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
