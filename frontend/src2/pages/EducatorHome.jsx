import React from "react";
import { useNavigate } from "react-router-dom";
import EducatorNavbar from "../components/EducatorNavbar";
import { Outlet } from "react-router-dom";

export default function EducatorHome() {


  return (
    <div className="flex flex-col min-h-screen">
      <EducatorNavbar />
      <div className="flex-1 p-4">
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </div>
  );
}
