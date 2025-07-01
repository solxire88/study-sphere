import React from "react";
import { ContactRound, Star, CalendarCheck } from "lucide-react";

export default function About({ totalStudents, schedule }) {
  const averageRating = (Math.random() * 1.5 + 3.5).toFixed(1);

  return (
    <div className="flex justify-center w-full">
      <div
        className="rounded-lg p-6 w-full sm:w-auto backdrop-blur-md bg-opacity-20 bg-gradient-to-br from-[#04091C] to-[#0A0F24] border border-[#1E90FF]/30 shadow-lg transform transition-all duration-500 hover:scale-102 hover:shadow-[0_0_20px_#1E90FF]/30 animate-float"
        style={{ maxWidth: "700px" }}
      >
        <div className="flex justify-center w-full pl-8 sm:pl-0">
          <table className="text-white border-collapse w-full lg:w-3/4">
            <thead>
              <tr>
                <th className="py-3 px-4 text-center text-lg font-semibold whitespace-nowrap border-b border-[#1E90FF]/30">
                  Metric
                </th>
                <th className="py-3 px-4 text-center text-lg font-semibold whitespace-nowrap border-b border-[#1E90FF]/30">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-[#0A0F24] transition-all duration-300 animate-fade-in">
                <td className="py-3 px-4 text-center whitespace-nowrap">
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <ContactRound className="w-6 h-6 mb-1 transition-transform duration-300 hover:-translate-y-1 hover:text-[#1E90FF] animate-float-icon" />
                    <span className="inline-block text-base hover:translate-x-2 hover:scale-105 transition-transform duration-300 hover:text-[#1E90FF]">
                      Number of Students
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center animate-fade-in delay-100 whitespace-nowrap">
                  <span className="inline-block text-base hover:translate-x-2 hover:scale-105 transition-transform duration-300 hover:text-[#1E90FF]">
                    {totalStudents}
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-[#0A0F24] transition-all duration-300 animate-fade-in">
                <td className="py-3 px-4 text-center whitespace-nowrap">
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <Star className="w-6 h-6 mb-1 transition-transform duration-300 hover:-translate-y-1 hover:text-[#1E90FF] animate-float-icon" />
                    <span className="inline-block text-base hover:translate-x-2 hover:scale-105 transition-transform duration-300 hover:text-[#1E90FF]">
                      Average Rating
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center animate-fade-in delay-100 whitespace-nowrap">
                  <span className="inline-block text-base hover:translate-x-2 hover:scale-105 transition-transform duration-300 hover:text-[#1E90FF]">
                    {averageRating} / 5.0
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-[#0A0F24] transition-all duration-300 animate-fade-in">
                <td className="py-3 px-4 text-center whitespace-nowrap">
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <CalendarCheck className="w-6 h-6 mb-1 transition-transform duration-300 hover:-translate-y-1 hover:text-[#1E90FF] animate-float-icon" />
                    <span className="inline-block text-base hover:translate-x-2 hover:scale-105 transition-transform duration-300 hover:text-[#1E90FF]">
                      Class Schedule
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center animate-fade-in delay-100 whitespace-nowrap">
                  <span className="inline-block text-base hover:translate-x-2 hover:scale-105 transition-transform duration-300 hover:text-[#1E90FF]">
                    {schedule}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <style>
        {`
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float { animation: float 4s ease-in-out infinite; }

          @keyframes float-icon {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .animate-float-icon { animation: float-icon 3s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
}