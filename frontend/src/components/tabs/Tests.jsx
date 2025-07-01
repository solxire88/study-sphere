import React, { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { CirclePlus, Trash2, Edit } from "lucide-react";
import TestModal from "./TestModal";
import TestFormModal from "./TestFormModal";
import axios from "axios";
import { ACCESS_TOKEN } from "../../constants";

export default function Tests({ courseId }) {
  const [tests, setTests] = useState([]);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isAddTestModalOpen, setIsAddTestModalOpen] = useState(false);
  const [isEditTestModalOpen, setIsEditTestModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [testToDelete, setTestToDelete] = useState(null);
  const [currentTest, setCurrentTest] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const token = localStorage.getItem(ACCESS_TOKEN);

  // 1) Fetch existing tests
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/tests/list/?class_id=${courseId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTests(res.data);
      } catch (err) {
        console.error("Error fetching tests:", err);
      }
    };
    fetchTests();
  }, [courseId, token]);

  // 2) Open modals
  const openViewModal = (test) => {
    const shaped = {
      ...test,
      questions: test.questions.map((q) => {
        const choices = q.answer_options.map((opt) => opt.text);
        const correctAnswer = q.answer_options.findIndex((opt) => opt.is_correct);
        return { question: q.text, choices, correctAnswer };
      }),
    };
    setCurrentTest(shaped);
    setModalMode("view");
    setIsTestModalOpen(true);
  };

  const openEditModal = (test) => {
    // reshape to match TestFormModal’s expected shape:
    const shapedForForm = {
      id: test.id,
      title: test.title,
      description: test.description || "",
      questions: test.questions.map((q) => {
        const choices = q.answer_options.map(opt => opt.text);
        const correctAnswer = q.answer_options.findIndex(opt => opt.is_correct);
        return {
          question: q.text,
          choices,
          correctAnswer,
        };
      }),
    };
    setCurrentTest(shapedForForm);
    setModalMode("edit");
    setIsEditTestModalOpen(true);
  };

  const addNewTest = () => {
    setCurrentTest(null);
    setIsAddTestModalOpen(true);
  };
  const closeViewModal = () => setIsTestModalOpen(false);

  // 3) Create a new test
  const handleAddTestSubmit = async formData => {
    // formData.questions: [{ question, choices: [], correctAnswer }, …]
    const payload = {
      title: formData.title,
      description: formData.description || "",
      class_obj: courseId,
      questions: formData.questions.map((q, idx) => ({
        text: q.question,
        order: idx,
        answer_options: q.choices.map((choiceText, ci) => ({
          text: choiceText,
          is_correct: ci === q.correctAnswer,
        })),
      })),
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/tests/create/`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTests(prev => [...prev, res.data]);
      setIsAddTestModalOpen(false);
    } catch (err) {
      console.error("Failed to add test:", err.response?.data || err.message);
    }
  };

  // 4) Edit (client-side stub)
  const handleEditTestSubmit = updated => {
    setTests(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    setIsEditTestModalOpen(false);
  };

  // 5) Delete
  const confirmDelete = t => {
    setTestToDelete(t);
    setIsDeleteDialogOpen(true);
  };
  const deleteTest = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/tests/delete/${testToDelete.id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTests(prev => prev.filter(t => t.id !== testToDelete.id));
      setIsDeleteDialogOpen(false);
    } catch (err) {
      console.error("Failed to delete test:", err);
    }
  };

  return (
    <div className="p-4 rounded-lg bg-transparent">
      {/* --- Tests List --- */}
      <div className="overflow-x-auto flex justify-center mt-12">
        <table className="text-white border-collapse w-full max-w-3xl">
          <tbody>
            {tests.map(test => (
              <tr key={test.id} className="block md:table-row mb-4">
                <td className="block md:table-cell p-0">
                  <div className="rounded-lg bg-[#04091C]/20 border border-[#004493] hover:border-[#A6E1FA] mb-4">
                    <div className="flex justify-between items-center py-3 px-4">
                      <span
                        className="text-lg font-medium hover:text-[#A6E1FA] cursor-pointer"
                        onClick={() => openViewModal(test)}
                      >
                        {test.title}
                      </span>
                      <div className="flex gap-2">
                        {/* <Button
                          color="primary"
                          variant="bordered"
                          className="rounded-full "
                          onClick={() => openEditModal(test)}
                        >
                          <Edit  className="w-5 h-5 text-white" />
                        </Button> */}
                        <Button
                        color="danger"
                          variant="bordered"
                          className="rounded-full hover:text-red-500"
                          onClick={() => confirmDelete(test)}
                        >
                          <Trash2 className="w-5 h-5" />
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

{/* --- Delete Confirmation --- */}
{isDeleteDialogOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div
      className="w-[90%] max-w-sm bg-[#04091C] rounded-2xl shadow-lg border border-[#004493] overflow-hidden animate-fade-in"
      style={{ animationDuration: "200ms" }}
    >
      {/* Header with icon */}
      <div className="flex items-center bg-[#004493] p-4">
        <Trash2 className="w-5 h-5 text-red-400 mr-2" />
        <h3 className="text-lg font-semibold text-white">
          Confirm Deletion
        </h3>
      </div>

      {/* Body */}
      <div className="p-6 text-center">
        <p className="text-white mb-6">
          Are you sure you want to delete<br/>
          <span className="font-medium text-[#A6E1FA]">“{testToDelete?.title}”</span>?
        </p>
        <div className="flex justify-center gap-4">
          <Button
            color="primary"
            variant="bordered"
            className="px-4 py-2 border-[#004493] hover:border-[#A6E1FA] text-sm"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            className="px-4 py-2 text-sm"
            onClick={deleteTest}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  </div>
)}


      {/* --- “New Test” Button --- */}
      <div className="flex justify-center mt-4">
        <Button
          color="primary"
          variant="bordered"
          onClick={addNewTest}
          className="border-[#004493] text-white hover:border-[#A6E1FA]"
        >
          <CirclePlus className="w-5 h-5 mr-2" /> New Test
        </Button>
      </div>

      {/* --- Modals --- */}
      <TestModal
        isOpen={isTestModalOpen}
        onRequestClose={closeViewModal}
        test={currentTest}
        mode={modalMode}
      />
      <TestFormModal
        isOpen={isAddTestModalOpen}
        onRequestClose={() => setIsAddTestModalOpen(false)}
        onSubmit={handleAddTestSubmit}
        mode="add"
      />
      <TestFormModal
        isOpen={isEditTestModalOpen}
        onRequestClose={() => setIsEditTestModalOpen(false)}
        onSubmit={handleEditTestSubmit}
        test={currentTest}
        mode="edit"
      />
    </div>
  );
}
