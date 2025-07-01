"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, Check } from "lucide-react";
import PendingList from "./PendingList";
import AcceptedList from "./AcceptedList";
import { ACCESS_TOKEN } from "../../constants";

export default function Students({ students: initialStudents, classId }) {
  const [activeTab, setActiveTab] = useState("accepted");
  const [students, setStudents] = useState(initialStudents || []);
  const [showConfirm, setShowConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [progress, setProgress] = useState({ total_docs: 0, per_student: [] });

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem(ACCESS_TOKEN)
      : null;

  
    useEffect(() => {
  const token = localStorage.getItem(ACCESS_TOKEN);
   axios
     .get(`${import.meta.env.VITE_API_URL}/docs/${classId}/progress/`, {
       headers: { Authorization: `Bearer ${token}` },
     })
     .then((res) => setProgress(res.data))
     .catch(console.error);
  }, [classId]);
  console.log("Progress data:", progress);

  const filteredPending = students.filter((s) => s.status === "pending");
  const filteredAccepted = students.filter((s) => s.status === "accepted");

  const acceptStudent = async (id) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/class/enrollments/${id}/`,
        { status: "accepted" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: "accepted" } : s))
      );
    } catch (err) {
      console.error("Accept error:", err);
    }
  };

  const handleDeleteClick = (enrollment) => {
    setStudentToDelete(enrollment);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    const id = studentToDelete.id;
    try {
      // As educator, "decline" rather than delete
      await axios.patch(
        `http://127.0.0.1:8000/class/enrollments/${id}/`,
        { status: "declined" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // remove from UI
      setStudents((prev) => prev.filter((s) => s.id !== id));
      setShowConfirm(false);
      setStudentToDelete(null);
    } catch (err) {
      console.error("Decline error:", err);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setStudentToDelete(null);
  };

  return (
    <div className="flex flex-col items-center w-full relative">
      {/* Tab buttons */}
      <div className="flex mb-6 space-x-4">
        <button
          onClick={() => setActiveTab("accepted")}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
            activeTab === "accepted"
              ? "bg-[#1E90FF] text-white shadow-lg shadow-[#1E90FF]/30"
              : "bg-[#0A0F24] text-gray-300 hover:bg-[#1E90FF]/20"
          }`}
        >
          Accepted
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
            activeTab === "pending"
              ? "bg-[#1E90FF] text-white shadow-lg shadow-[#1E90FF]/30"
              : "bg-[#0A0F24] text-gray-300 hover:bg-[#1E90FF]/20"
          }`}
        >
          Pending
        </button>
      </div>

      {/* Lists */}
      {activeTab === "accepted" ? (
        <AcceptedList
          students={filteredAccepted}
          onDeleteClick={handleDeleteClick}
          progress={progress}
           // Pass classId if needed for progress
        />
      ) : (
        <PendingList
          students={filteredPending}
          onAccept={acceptStudent}
          onDeleteClick={handleDeleteClick}
        />
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div
            className="p-6 rounded-lg"
            style={{
              background: "linear-gradient(145deg, #04091C, #0A0F24)",
              boxShadow: "0 4px 20px rgba(30, 144, 255, 0.5)",
              maxWidth: "400px",
              width: "90%",
            }}
          >
            <h3 className="text-lg font-medium text-white mb-4">
              Decline {studentToDelete?.student}?
            </h3>
            <p className="text-gray-400 mb-6">
              This will remove their enrollment request.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="flex items-center px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex items-center px-4 py-2 rounded-lg bg-red-900/80 text-red-300 hover:bg-red-900 transition-colors"
              >
                <Check className="w-4 h-4 mr-2" />
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(30, 144, 255, 0.3);
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(30, 144, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
