import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { CirclePlus } from 'lucide-react';
import DocumentModal from "./DocumentModal";
import { ACCESS_TOKEN } from "../../constants";

export default function Documents({ classId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/docs/${classId}/list/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDocuments(Array.isArray(res.data) ? res.data : res.data.results || []);
      } catch (err) {
        console.error(err);
        setError(err.response?.statusText || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (classId) fetchDocs();
  }, [classId, token]);

  const handleAddDocument = () => {
    setCurrentDocument(null);
    setIsModalOpen(true);
  };

  const handleEditDocument = (doc) => {
    setCurrentDocument(doc);
    setIsModalOpen(true);
  };

  const handleUploaded = (newDoc) => {
    setDocuments((prev) => {
      const idx = prev.findIndex((d) => d.id === newDoc.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = newDoc;
        return updated;
      }
      return [...prev, newDoc];
    });
    setIsModalOpen(false);
    setCurrentDocument(null);
  };

  const handleDelete = async (docId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/docs/delete/${docId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDocuments((prev) => prev.filter((d) => d.id !== docId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete document");
    }
  };

  if (loading) return <p className="text-white p-4">Loading documents…</p>;
  if (error) return <p className="text-red-400 p-4">Error: {error}</p>;

  return (
    <div className="p-4 rounded-lg" style={{ backgroundColor: "#04091C" }}>
      <div className="pt-6">
        {documents.length > 0 ? (
          <div className="overflow-x-auto flex justify-center overflow-hidden">
            <table style={{ width: "50%" }} className="text-white border-collapse">
              <tbody>
                {documents.map((doc) => (
                  <tr
                    key={doc.id}
                    className="block md:table-row mb-4"
                    style={{ position: "relative", zIndex: 1 }}
                  >
                    <td colSpan="3" className="block md:table-cell p-0">
                      <div
                        className="rounded-lg transition-all border border-[#004493] hover:border-[#A6E1FA] group"
                        style={{ transition: "all 0.2s ease", marginBottom: "1rem" }}
                      >
                        <div className="flex flex-col md:grid md:grid-cols-[1fr_auto] items-center justify-between py-2 px-3 gap-2 relative">
                          <div className="text-left z-10">
                            <span
                              className="inline-block group-hover:translate-x-1 transition-transform duration-200 group-hover:text-[#A6E1FA]"
                              style={{ fontSize: "1.3rem", fontWeight: 500 }}
                            >
                              {doc.title}
                              <div className="text-gray-400 text-sm mt-0.5">
                                {doc.file_type?.toUpperCase()} • {doc.file_size}
                              </div>
                            </span>
                          </div>

                          <div className="flex items-center gap-1 z-10">
                            <span
                              className="text-gray-300 group-hover:text-[#A6E1FA] transition-colors duration-200"
                              style={{ fontSize: "1.3rem", fontWeight: 500 }}
                            >
                              {doc.uploaded_at
                                ? new Date(doc.uploaded_at).toLocaleDateString()
                                : '--'}
                            </span>

                            <Dropdown>
                              <DropdownTrigger>
                                <Button
                                  variant="bordered"
                                  className="rounded-xl bg-transparent text-white hover:scale-[1.05] transition-transform duration-200 border-transparent hover:border-[#A6E1FA] min-w-unit-8 h-unit-8"
                                >
                                  <span className="text-xl">...</span>
                                </Button>
                              </DropdownTrigger>
                              <DropdownMenu
                                aria-label="Document Actions"
                                className="bg-[#04091C] border border-[#004493] rounded-lg shadow-lg min-w-[100px] p-1"
                              >
                                <DropdownItem
                                  key="edit"
                                  className="text-white hover:bg-gray-500/20 focus:bg-gray-500/20 transition-all duration-150 rounded-md px-2 py-1 text-sm"
                                  onClick={() => handleEditDocument(doc)}
                                >
                                  Edit
                                </DropdownItem>
                                <DropdownItem
                                  key="delete"
                                  className="text-white hover:bg-gray-500/20 focus:bg-gray-500/20 transition-all duration-150 rounded-md px-2 py-1 text-sm"
                                  onClick={() => handleDelete(doc.id)}
                                >
                                  Delete
                                </DropdownItem>
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
        ) : (
          <p className="text-gray-400">No documents uploaded yet.</p>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <Button
          color="primary"
          variant="bordered"
          onClick={handleAddDocument}
          className="bg-opacity-20 bg-[#04091C] border border-[#004493] hover:border-[#A6E1FA] hover:scale-[1.03] transition-transform duration-200 text-base px-4 py-2"
        >
          <CirclePlus className="w-5 h-5 mr-2" />
          New Document
        </Button>
      </div>

      <DocumentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentDocument(null);
        }}
        classId={classId}
        documentToEdit={currentDocument}
        onUploaded={handleUploaded}
      />
    </div>
  );
}
