import { Download } from 'lucide-react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { CirclePlus } from 'lucide-react';

export default function Documents({ chapters }) {
  const handleEdit = (chapter) => console.log("Edit chapter:", chapter);
  const handleDelete = (chapter) => console.log("Delete chapter:", chapter);

  return (
    <div className="p-4 rounded-lg" style={{ backgroundColor: "#04091C" }}>
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-on-click:active { animation: bounce 0.3s ease; }
      `}</style>

      <div className="overflow-x-auto flex justify-center mt-12 md:mt-0 overflow-hidden" style={{ paddingTop: "2rem" }}>
        <table style={{ width: "60%" }} className="text-white border-collapse">
          <tbody>
            {chapters.map((chapter, index) => (
              <tr
                key={index}
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
                    <div className="flex flex-col md:grid md:grid-cols-[1fr_auto_auto] md:gap-12 items-center justify-between py-3 px-4">
                      {/* Chapter Title */}
                      <div className={`text-center md:text-left animate-fade-in ${index === 0 ? "rounded-t-lg" : ""}`}>
                        <span
                          className="inline-block hover:translate-x-2 hover:scale-105 transition-transform duration-300 hover:text-[#A6E1FA]"
                          style={{ fontSize: "1.25rem", fontWeight: "500" }}
                        >
                          {chapter.title}
                        </span>
                      </div>

                      {/* Schedule Date */}
                      <div className="text-center md:text-left animate-fade-in delay-100">
                        <span
                          className="inline-block hover:translate-x-2 hover:scale-105 transition-transform duration-300 hover:text-[#A6E1FA]"
                          style={{ fontSize: "1.25rem", fontWeight: "500" }}
                        >
                          {chapter.date}
                        </span>
                      </div>

                      {/* Download Button */}
                      <div className={`text-center md:text-left animate-fade-in delay-200 ${index === chapters.length - 1 ? "rounded-b-lg" : ""}`}>
                        <button className="p-1 bg-transparent text-white hover:text-blue-300 transition-all duration-200 group active:scale-90 active:opacity-80 animate-bounce-on-click">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}