// src/components/About.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ContactRound, Star, CalendarCheck } from "lucide-react";
import { ACCESS_TOKEN } from "../../constants";

export default function About({ classId, totalStudents, schedule }) {
  const [averageRating, setAverageRating] = useState(null);
  const [averageSentiment, setAverageSentiment] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    if (!classId) return;

    const fetchMetrics = async () => {
      try {
        // 1) Average rating
        const [{ data: ratingData }, { data: sentimentData }] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_API_URL}/stats/class/${classId}/average/`,
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          axios.get(
            `${import.meta.env.VITE_API_URL}/stats/class/${classId}/sentiment/`,
            { headers: { Authorization: `Bearer ${token}` } }
          ),
        ]);

        setAverageRating(ratingData.average ?? 0);
        console.log("Average Rating:", ratingData.average);
        console.log("Average Sentiment:", sentimentData.average);
        setAverageSentiment(sentimentData.average ?? 0);
      } catch (err) {
        console.error(err);
        setError("Failed to load metrics");
      }
    };

    fetchMetrics();
  }, [classId, token]);

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  return (
    <div className="flex justify-center w-full">
      <div
        className="rounded-lg p-6 w-full sm:w-auto backdrop-blur-md bg-opacity-20 bg-gradient-to-br from-[#04091C] to-[#0A0F24] border border-[#1E90FF]/30 shadow-lg transform transition-all duration-500 hover:scale-102 hover:shadow-[0_0_20px_#1E90FF]/30 animate-float"
        style={{ maxWidth: "700px" }}
      >
        <table className="text-white border-collapse w-full lg:w-3/4 mx-auto">
          <thead>
            <tr>
              <th className="py-3 px-4 text-center text-lg font-semibold border-b border-[#1E90FF]/30">
                Metric
              </th>
              <th className="py-3 px-4 text-center text-lg font-semibold border-b border-[#1E90FF]/30">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Number of Students */}
            <tr className="hover:bg-[#0A0F24] transition-all duration-300 animate-fade-in">
              <td className="py-3 px-4 text-center">
                <div className="flex flex-col items-center space-y-1">
                  <ContactRound className="w-6 h-6 text-[#1E90FF]" />
                  <span className="text-base">Number of Students</span>
                </div>
              </td>
              <td className="py-3 px-4 text-center">
                <span className="text-base">{totalStudents}</span>
              </td>
            </tr>

            {/* Average Rating */}
            <tr className="hover:bg-[#0A0F24] transition-all duration-300 animate-fade-in">
              <td className="py-3 px-4 text-center">
                <div className="flex flex-col items-center space-y-1">
                  <Star className="w-6 h-6 text-[#1E90FF]" />
                  <span className="text-base">Average Rating</span>
                </div>
              </td>
              <td className="py-3 px-4 text-center">
                <span className="text-base">
                  {averageRating !== null ? averageRating.toFixed(1) : "…"} / 5.0
                </span>
              </td>
            </tr>

            {/* Average Sentiment */}
            <tr className="hover:bg-[#0A0F24] transition-all duration-300 animate-fade-in">
              <td className="py-3 px-4 text-center">
                <div className="flex flex-col items-center space-y-1">
                  <Star className="w-6 h-6 text-[#1E90FF]" />
                  <span className="text-base">Average Sentiment</span>
                </div>
              </td>
              <td className="py-3 px-4 text-center">
                <span className="text-base">
                  {averageSentiment !== null
                    ? `${(averageSentiment * 100).toFixed(0)}%`
                    : "…"}
                </span>
              </td>
            </tr>

            {/* Class Schedule */}
            <tr className="hover:bg-[#0A0F24] transition-all duration-300 animate-fade-in">
              <td className="py-3 px-4 text-center">
                <div className="flex flex-col items-center space-y-1">
                  <CalendarCheck className="w-6 h-6 text-[#1E90FF]" />
                  <span className="text-base">Class Duration</span>
                </div>
              </td>
              <td className="py-3 px-4 text-center">
                <span className="text-base">{schedule}</span>
              </td>
            </tr>
          </tbody>
        </table>
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
        `}
      </style>
    </div>
  );
}
