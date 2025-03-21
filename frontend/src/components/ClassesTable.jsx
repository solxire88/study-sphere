import React from "react";
import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

export const classes = [
  {
    id: 1,
    title: "ML & Data Science",
    schedule: "Mon, Wed - 13:00 ~ 14:00",
    totalStudents: 20,
    chapters: [
      { title: "Chapter 1 - Introduction to ML & Data Science", date: "12-10-2025" },
      { title: "Chapter 2 - Data Preprocessing and Analysis", date: "23-10-2025" },
      { title: "Chapter 3 - Machine Learning Algorithms", date: "23-11-2025" },
    ],
  },
  {
    id: 2,
    title: "Engineering",
    schedule: "Mon, Wed - 13:00 ~ 14:00",
    totalStudents: 11,
    chapters: [
      { title: "Chapter 1 - Engineering Fundamentals", date: "12-10-2025" },
      { title: "Chapter 2 - Systems Design", date: "23-10-2025" },
      { title: "Chapter 3 - Advanced Engineering Concepts", date: "23-11-2025" },
    ],
  },
  {
    id: 3,
    title: "Cybersecurity",
    schedule: "Mon, Wed - 13:00 ~ 14:00",
    totalStudents: 7,
    chapters: [
      { title: "Chapter 1 - Introduction to Cybersecurity", date: "12-10-2025" },
      { title: "Chapter 2 - Network Security", date: "23-10-2025" },
      { title: "Chapter 3 - Ethical Hacking", date: "23-11-2025" },
    ],
  },
  {
    id: 4,
    title: "Low-Level Programming",
    schedule: "Mon, Wed - 13:00 ~ 14:00",
    totalStudents: 16,
    chapters: [
      { title: "Chapter 1 - Introduction to Low-Level Programming", date: "12-10-2025" },
      { title: "Chapter 2 - Memory Management", date: "23-10-2025" },
      { title: "Chapter 3 - Assembly Language", date: "23-11-2025" },
    ],
  },
];

const ClassesTable = () => {
  const navigate = useNavigate();

  const handleViewCourse = (courseId) => {
    navigate(`/educator/class/${courseId}`);
  };

  return (
    <div className="bg-navy-900 rounded-lg border border-navy-800 overflow-hidden mt-8 w-full transition-transform transform hover:scale-105 hover:shadow-[0_0_15px_#004493]">
      <div className="p-6 overflow-x-auto">
        <table className="w-full min-w-[600px] sm:min-w-full">
          <thead>
            <tr className="text-left border-b border-transparent">
              <th className="text-white font-bold text-xl pb-4 px-4 sm:px-2">Title</th>
              <th className="text-white font-bold text-xl pb-4 px-4 sm:px-2">Schedule</th>
              <th className="text-white font-bold text-xl pb-4 px-4 sm:px-2">Total Students</th>
              <th className="text-white font-bold text-xl pb-4 px-4 sm:px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls, index) => (
              <tr key={index} className="border-b border-transparent last:border-b-0">
                <td className="py-3 text-white px-4 sm:px-2">{cls.title}</td>
                <td className="py-3 text-white px-4 sm:px-2">{cls.schedule}</td>
                <td className="py-3 text-white px-4 sm:px-2">{cls.totalStudents}</td>
                <td className="py-3 text-white px-4 sm:px-2">
                  <button
                    onClick={() => handleViewCourse(cls.id)}
                    className="text-blue-500 hover:text-blue-400 hover:bg-navy-800 p-1 rounded-full transition-all transform hover:scale-110 active:scale-95 active:bg-navy-700 active:text-blue-300"
                  >
                    View Course
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