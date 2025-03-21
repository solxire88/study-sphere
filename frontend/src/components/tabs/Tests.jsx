import React, { useState } from "react";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { CirclePlus, MoreVertical } from "lucide-react";
import TestModal from "./TestModal";
import AddTestModal from "./AddTestModal";
import testData from "../../data/tests.json";

export default function Tests({ courseId }) {
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isAddTestModalOpen, setIsAddTestModalOpen] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);
  const [modalMode, setModalMode] = useState("view");

  const courseTests = testData.tests.find((course) => course.courseId === courseId)?.tests || [];

  const addNewTest = () => setIsAddTestModalOpen(true);

  const handleAddTestSubmit = (newTest) => {
    // Add the new test to the list (update JSON or state here)
    setIsAddTestModalOpen(false);
  };

  const deleteTest = (id) => {
    // Delete the test (update JSON or state here)
  };

  const openModal = (test, mode) => {
    setCurrentTest(test);
    setModalMode(mode);
    setIsTestModalOpen(true);
  };

  const closeModal = () => {
    setIsTestModalOpen(false);
    setCurrentTest(null);
  };

  const dropdownItems = [
    { key: "view", label: "View" },
    { key: "delete", label: "Delete" },
  ];

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
                      <div className="text-center md:text-left animate-fade-in">
                        <span
                          className="inline-block hover:translate-x-2 hover:scale-105 transition-transform duration-300 hover:text-[#A6E1FA]"
                          style={{ fontSize: "1.25rem", fontWeight: "500" }}
                        >
                          {test.title}
                        </span>
                      </div>

                      <div className="relative text-center md:text-left animate-fade-in delay-100">
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              variant="bordered"
                              className="rounded-2xl bg-transparent text-white hover:scale-105 transition-transform duration-300 border-transparent hover:border-[#A6E1FA]"
                            >
                              <MoreVertical className="w-6 h-6" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            aria-label="Test Actions"
                            items={dropdownItems}
                            className="backdrop-blur-md bg-[#04091C] border border-[#004493] rounded-lg shadow-lg min-w-[120px] p-1"
                          >
                            {(item) => (
                              <DropdownItem
                                key={item.key}
                                className={`${
                                  item.key === "delete" ? "text-danger" : "text-white"
                                } hover:bg-gray-500/20 focus:bg-gray-500/20 transition-all duration-200 rounded-md px-3 py-2 text-sm`}
                                color={item.key === "delete" ? "danger" : "default"}
                                onClick={() => {
                                  if (item.key === "view") {
                                    openModal(test, "view");
                                  } else if (item.key === "delete") {
                                    deleteTest(test.id);
                                  }
                                }}
                              >
                                {item.label}
                              </DropdownItem>
                            )}
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-8">
        <Button
          color="primary"
          variant="bordered"
          onClick={addNewTest}
          className="backdrop-blur-md bg-opacity-20 bg-[#04091C] border border-[#004493] hover:border-[#A6E1FA] hover:scale-105 transition-transform duration-300"
        >
          <CirclePlus className="w-4 h-4 mr-2" />
          New Test
        </Button>
      </div>

      <TestModal
        isOpen={isTestModalOpen}
        onRequestClose={closeModal}
        test={currentTest}
        mode={modalMode}
      />

      <AddTestModal
        isOpen={isAddTestModalOpen}
        onRequestClose={() => setIsAddTestModalOpen(false)}
        onSubmit={handleAddTestSubmit}
      />
    </div>
  );
}