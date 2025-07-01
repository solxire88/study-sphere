import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ACCESS_TOKEN, USER_ID, SALT } from "../constants";

const ClassesTable = () => {
  const navigate = useNavigate();
  const [classesData, setClassesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  // Retrieve your JWT (or token) however you store it
  const token = localStorage.getItem(ACCESS_TOKEN);
  const userId = localStorage.getItem(USER_ID);

  function encodeId(id) {
    return btoa(`${id}:${SALT}`);
  }
  console.log("Encoded User ID:", encodeId(userId));

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/class/educator/classes/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClassesData(data);
        console.log(data);
      } catch (err) {
        console.error(err);
        setError(err.response?.statusText || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [token]);

  const handleViewCourse = (courseId) => {
    navigate(`/educator/class/${encodeId(courseId)}`);
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axios.delete(
        `http://127.0.0.1:8000/class/classes/${encodeId(courseId)}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setClassesData((prev) => prev.filter((c) => c.id !== courseId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete course: " + (err.response?.statusText || err.message));
    }
  };

  if (loading) return <p>Loading classes…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-navy-900 rounded-lg border border-navy-800 overflow-hidden w-full transition-all duration-300">
      <div className="p-6 overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="text-left border-b border-navy-800">
              <th className="text-gray-400 font-medium text-md pb-4 px-4">Course</th>
              <th className="text-gray-400 font-medium text-md pb-4 px-4">Schedule</th>
              <th className="text-gray-400 font-medium text-md pb-4 px-4">Students</th>
              <th className="text-gray-400 font-medium text-md pb-4 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classesData.map((cls) => (
              <tr
                key={cls.id}
                className="border-b border-navy-800 hover:bg-navy-800/50 transition-colors duration-200 last:border-b-0"
              >
                <td className="py-5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-cyan-400"></div>
                    <span className="text-white font-medium">{cls.title}</span>
                  </div>
                </td>
                <td className="py-5 text-gray-300 px-4">{cls.schedule}</td>
                <td className="py-5 px-4">
                  <span className="text-white font-medium">
                    {cls.enrolled_students?.length ?? 0}
                  </span>
                </td>
                <td className="py-5 px-4 flex gap-2">
                  <button
                    onClick={() => handleViewCourse(cls.id)}
                    className="text-blue-400 hover:text-white hover:bg-blue-600/30 px-4 py-1.5 rounded-md transition-all border border-blue-600/30"
                  >
                    Manage
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(cls.id)}
                    className="text-red-400 hover:text-white hover:bg-red-600/30 px-4 py-1.5 rounded-md transition-all border border-red-600/30"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassesTable;
