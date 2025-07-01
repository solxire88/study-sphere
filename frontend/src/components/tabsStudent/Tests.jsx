// src/components/tabsStudent/Tests.jsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@heroui/react";
import { CirclePlus } from "lucide-react";
import TestModal from "./TestModal";
import { ACCESS_TOKEN } from "../../constants";

export default function Tests({ classId }) {
  // alias to match your API param
  const courseId = classId;

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);

  const token = localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    if (!courseId) return;

    const fetchTests = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/tests/list/`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { class_id: courseId },
            timeout: 10_000,
          }
        );
        // transform so TestModal works
        const enriched = res.data.map((t) => ({
          ...t,
          questions: t.questions.map((q) => {
            console.log("q", q);
            console.log("t", t);
            const choices = q.answer_options.map((opt) => opt.text);
            const correctAnswer = q.answer_options.findIndex((opt) => opt.is_correct);
            return {
              question: q.text,
              choices,
              correctAnswer,
            };
          }),
        }));
        setTests(enriched);
      } catch (err) {
        console.error("Error fetching tests:", err);
        setError(err.response?.data?.detail || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [courseId, token]);

  const openModal = (test) => {
    setCurrentTest(test);
    setIsTestModalOpen(true);
  };

  const closeModal = () => {
    setIsTestModalOpen(false);
    setCurrentTest(null);
  };

  return (
    <div className="p-4 rounded-lg bg-transparent">
      {loading && <p className="text-white">Loading tests…</p>}
      {error && <p className="text-red-400">Error: {error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto flex justify-center mt-12 md:mt-0">
          <table className="text-white border-collapse w-full max-w-3xl">
            <tbody>
              {tests.map((test) => (
                <tr key={test.id} className="block md:table-row mb-4">
                  <td className="block md:table-cell p-0">
                    <div className="rounded-lg bg-[#04091C]/20 border border-[#004493] hover:border-[#A6E1FA] mb-4">
                      <div className="flex justify-between items-center py-3 px-4">
                        <span
                          className="text-lg font-medium hover:text-[#A6E1FA] cursor-pointer"
                          onClick={() => openModal(test)}
                        >
                          {test.title}
                        </span>
                        <Button
                          variant="bordered"
                          className="rounded-2xl bg-transparent text-white hover:scale-105 transition-transform duration-300 border-transparent hover:border-[#A6E1FA]"
                          onClick={() => openModal(test)}
                        >
                          Take Test
                        </Button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <TestModal
        isOpen={isTestModalOpen}
        onRequestClose={closeModal}
        test={currentTest}
        mode="view"
      />
    </div>
  );
}
