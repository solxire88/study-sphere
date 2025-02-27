import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { ACCESS_TOKEN } from "../constants";

const HomeRedirect = () => {
  const [redirectPath, setRedirectPath] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        // Check if token is expired
        if (decoded.exp < now) {
          setRedirectPath("/login");
        } else {
          // Redirect based on user role
          if (decoded.role === "student") {
            setRedirectPath("/student");
          } else if (decoded.role === "educator") {
            setRedirectPath("/educator");
          } else {
            setRedirectPath("/login");
          }
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setRedirectPath("/login");
      }
    } else {
      setRedirectPath("/login");
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return <Navigate to={redirectPath} />;
};

export default HomeRedirect;
