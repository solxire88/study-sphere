import React from "react";
import { User } from "lucide-react";

const generateRandomNames = (count) => {
  const firstNames = ["John", "Jane", "Alice", "Bob", "Charlie", "Diana", "Eva", "Frank", "Grace", "Henry"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
  return Array.from({ length: count }, () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  });
};

const generateRandomJoiningDates = (count) => {
  const startDate = new Date(2020, 0, 1).getTime();
  const endDate = new Date().getTime();
  return Array.from({ length: count }, () => {
    const randomDate = new Date(startDate + Math.random() * (endDate - startDate));
    return randomDate.toLocaleDateString();
  });
};

export default function Students({ totalStudents }) {
  const studentNames = generateRandomNames(totalStudents);
  const joiningDates = generateRandomJoiningDates(totalStudents);

  return (
    <div
      className="p-6 rounded-lg flex justify-center animate-float"
      style={{
        backgroundColor: "#04091C",
        background: "linear-gradient(145deg, #04091C, #0A0F24)",
        boxShadow: "0 4px 20px rgba(30, 144, 255, 0.2)",
        maxWidth: "700px",
        maxHeight: "80vh",
        width: "90%",
        margin: "auto",
      }}
    >
      <div className="overflow-y-auto w-full pr-4" style={{ maxHeight: "70vh" }}>
        <table className="text-white border-collapse w-full">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left text-md font-semibold border-b border-[#1E90FF]/30">Student Name</th>
              <th className="py-3 px-6 text-left text-md font-semibold border-b border-[#1E90FF]/30">Joining Date</th>
            </tr>
          </thead>
          <tbody>
            {studentNames.map((name, index) => (
              <tr
                key={index}
                className="hover:bg-[#0A0F24] transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <td className="py-3 px-6 text-left">
                  <span className="inline-flex items-center hover:translate-x-2 hover:scale-105 transition-transform duration-300 hover:text-[#1E90FF]">
                    <User className="w-5 h-5 mr-2 transition-transform duration-300 hover:-translate-y-1 hover:text-[#1E90FF] animate-float-icon" />
                    {name}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span className="inline-block hover:translate-x-2 hover:scale-105 transition-transform duration-300 hover:text-[#1E90FF]">
                    {joiningDates[index]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>
        {`
          ::-webkit-scrollbar {
            width: 8px;
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(30, 144, 255, 0.3);
            border-radius: 10px;
            transition: background 0.3s ease-out;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(30, 144, 255, 0.5);
          }
          ::-webkit-scrollbar-track {
            background: transparent;
            margin: 8px;
          }
          ::-webkit-scrollbar-corner {
            background: transparent;
          }
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          @keyframes float-icon {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .animate-float-icon {
            animation: float-icon 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}