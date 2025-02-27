import React from "react";
import { useNavigate } from "react-router-dom";

export default function StudentHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">Student Home Page</h1>
      {/* Add more content for the student home page here */}
      <button 
        onClick={handleLogout}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
