import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@heroui/react";
import { Download } from 'lucide-react';
import { ACCESS_TOKEN } from "../../constants";

export default function Documents({ classId }) {
  const [documents, setDocuments] = useState([]);
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
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        setDocuments(data);
      } catch (err) {
        console.error(err);
        setError(err.response?.statusText || err.message);
      } finally {
        setLoading(false);
      }
    };
    if (classId) fetchDocs();
  }, [classId, token]);


  const handleDownload = async (filename, title) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/documents/${filename}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // create blob link for download
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', title || filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed', err);
      alert('Failed to download file');
    }
  };

  if (loading) return <p className="text-white p-4">Loading documents…</p>;
  if (error) return <p className="text-red-400 p-4">Error: {error}</p>;

  return (
    <div className="p-4 rounded-lg bg-[#04091C]">
      {documents.length > 0 ? (
        <div className="overflow-x-auto flex justify-center">
          <table className="text-white border-collapse w-full max-w-3xl">
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="block md:table-row mb-4">
                  <td className="block md:table-cell p-0">
                    <div className="rounded-lg transition-all border border-[#004493] hover:border-[#A6E1FA] mb-4">
                      <div className="flex flex-col md:grid md:grid-cols-[1fr_auto] items-center justify-between py-3 px-4 gap-2">
                        <div className="text-left">
                          <span className="text-lg font-medium">
                            {doc.title}
                            <div className="text-gray-400 text-sm mt-0.5">
                              {doc.file_type?.toUpperCase()} • {doc.file_size}
                            </div>
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-300 text-lg font-medium">
                            {doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString() : '--'}
                          </span>
                          <Button
                            variant="light"
                            className="p-1 text-white hover:text-blue-300 transition-all duration-200"
                            onClick={() => handleDownload(doc.file.split('/').pop(), doc.title)}
                          >
                            <Download className="w-5 h-5" />
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
      ) : (
        <p className="text-gray-400">No documents available.</p>
      )}
    </div>
  );
}
