import React from "react";
import { useNavigate } from "react-router-dom";

export default function EducatorHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-green-800 mb-8">Educator Home Page</h1>
      {/* Add more content for the educator home page here */}
      <button 
        onClick={handleLogout}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
