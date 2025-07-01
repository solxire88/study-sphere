import React, { useState } from "react";
import { Button } from "@heroui/react";
import TestModal from "./TestModal";
import testData from "../../data/enrolledTests.json";

export default function Tests({ courseId }) {
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);
  const [modalMode, setModalMode] = useState("view");

  const courseTests = testData.tests.find((course) => course.courseId === courseId)?.tests || [];

  const openModal = (test, mode) => {
    setCurrentTest(test);
    setModalMode(mode);
    setIsTestModalOpen(true);
  };

  const closeModal = () => {
    setIsTestModalOpen(false);
    setCurrentTest(null);
  };

  return (
    <div className="p-4 rounded-lg" style={{ backgroundColor: "transparent" }}>
      <div className="overflow-x-auto flex justify-center mt-12 md:mt-0 overflow-hidden" style={{ paddingTop: "2rem" }}>
        <table style={{ width: "60%" }} className="text-white border-collapse">
          <tbody>
            {courseTests.map((test, index) => (
              <tr
                key={test.id}
                className="block md:table-row mb-8 md:mb-8"
                style={{ position: "relative", zIndex: 1 }}
              >
                <td colSpan="3" className="block md:table-cell p-0">
                  <div
                    className="rounded-lg transition-all transform hover:scale-105 hover:shadow-[0_0_15px_#004493] backdrop-blur-md bg-opacity-20 bg-[#04091C] border border-[#004493] hover:border-[#A6E1FA]"
                    style={{
                      transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <div className="flex flex-col md:grid md:grid-cols-[1fr_auto] md:gap-0 items-center justify-between py-2 px-3">
                      <div className={`text-center md:text-left animate-fade-in ${index === 0 ? "rounded-t-lg" : ""}`}>
                        <span
                          className="inline-block hover:translate-x-2 hover:scale-105 transition-transform duration-300 hover:text-[#A6E1FA]"
                          style={{ fontSize: "1.25rem", fontWeight: "500" }}
                        >
                          {test.title}
                        </span>
                      </div>
                      <div className="relative text-center md:text-left animate-fade-in delay-100">
                        <Button
                          variant="bordered"
                          className="rounded-2xl bg-transparent text-white hover:scale-105 transition-transform duration-300 border-transparent hover:border-[#A6E1FA]"
                          onClick={() => openModal(test, "view")}
                        >
                          Take Test
                        </Button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TestModal
        isOpen={isTestModalOpen}
        onRequestClose={closeModal}
        test={currentTest}
        mode={modalMode}
      />
    </div>
  );
}