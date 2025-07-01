import React, { useEffect, useState } from "react";
import { Card, Button } from "@heroui/react";
import { X, Save, Upload, File } from "lucide-react";
import axios from "axios";
import { ACCESS_TOKEN } from "../../constants";

export default function DocumentModal({
  isOpen,
  onClose,
  classId,
  documentToEdit,
  onUploaded,
}) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (documentToEdit) {
      setTitle(documentToEdit.title || "");
      setFileName(documentToEdit.fileName || "");
      setIsEditMode(true);
    } else {
      setTitle("");
      setFile(null);
      setFileName("");
      setIsEditMode(false);
    }
  }, [documentToEdit]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file_type", fileName.split('.').pop());
    formData.append("file_size", `${(file.size / 1024 / 1024).toFixed(2)}MB`);
    formData.append("file", file);

    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const res = await axios.post(
        `http://127.0.0.1:8000/docs/${classId}/upload/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (onUploaded) onUploaded(res.data);
      onClose();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload document: " + (err.response?.data || err.message));
    }
  };

  const removeFile = () => {
    setFile(null);
    setFileName("");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <Card
        className="relative p-4 border-2 border-[#004493] w-[400px] max-w-[85vw] shadow-[0_0_20px_#004493] bg-[#04091C] mx-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-[#A6E1FA]">
            {isEditMode ? "Edit Document" : "Upload New Document"}
          </h3>
          <Button
            isIconOnly
            variant="light"
            onClick={onClose}
            className="text-[#A6E1FA] hover:bg-[#004493]/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {/* Title Input */}
          <div className="flex flex-col items-start w-full">
            <label className="text-[#A6E1FA] text-sm font-medium mb-1 w-full text-left">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#04091C] border border-[#004493] rounded-md px-3 py-2 text-white text-sm
                         focus:border-[#A6E1FA] focus:outline-none focus:ring-1 focus:ring-[#A6E1FA]/30
                         hover:border-[#A6E1FA] transition-all duration-200 w-full"
              placeholder="Enter document title"
            />
          </div>

          {/* File Upload */}
          <div className="flex flex-col items-start w-full">
            <label className="text-[#A6E1FA] text-sm font-medium mb-1 w-full text-left">
              Document File {isEditMode && "(Leave unchanged to keep current file)"}
            </label>
            {!file && !fileName ? (
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-[#004493] border-dashed rounded-lg cursor-pointer bg-[#04091C]/50 hover:bg-[#04091C]/70 transition-colors duration-200">
                <div className="flex flex-col items-center justify-center pt-3 pb-4">
                  <Upload className="w-6 h-6 mb-2 text-[#A6E1FA]" />
                  <p className="mb-1 text-xs text-[#A6E1FA]">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">PDF, DOCX, PPT (MAX. 10MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                />
              </label>
            ) : (
              <div className="flex items-center justify-between w-full p-2 border border-[#004493] rounded-lg bg-[#04091C]/50">
                <div className="flex items-center">
                  <File className="w-4 h-4 mr-2 text-[#A6E1FA]" />
                  <span className="text-xs text-white truncate max-w-[180px]">{fileName}</span>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button
              variant="flat"
              onClick={onClose}
              className="text-[#A6E1FA] border border-[#004493] hover:bg-[#004493]/20 text-xs px-3 py-1"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={handleSave}
              endContent={<Save className="w-3 h-3" />}
              className="bg-[#004493] text-white hover:bg-[#0056b3] hover:shadow-[0_0_10px_#004493] 
                         text-xs px-3 py-1 transition-all"
              isDisabled={!title.trim() || !file}
            >
              {isEditMode ? "Save" : "Upload Document"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
