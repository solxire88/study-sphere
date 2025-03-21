import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { CirclePlus } from 'lucide-react';

export default function Documents({ chapters }) {
  const handleEdit = (chapter) => {
    console.log("Edit chapter:", chapter);
  };

  const handleDelete = (chapter) => {
    console.log("Delete chapter:", chapter);
  };

  return (
    <div className="p-4 rounded-lg" style={{ backgroundColor: "#04091C" }}>
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
                      <div className="text-center md:text-left animate-fade-in">
                        <span
                          className="inline-block hover:translate-x-2 hover:scale-105 transition-transform duration-300 hover:text-[#A6E1FA]"
                          style={{ fontSize: "1.25rem", fontWeight: "500" }}
                        >
                          {chapter.title}
                        </span>
                      </div>

                      <div className="text-center md:text-left animate-fade-in delay-100">
                        <span
                          className="inline-block hover:translate-x-2 hover:scale-105 transition-transform duration-300 hover:text-[#A6E1FA]"
                          style={{ fontSize: "1.25rem", fontWeight: "500" }}
                        >
                          {chapter.date}
                        </span>
                      </div>

                      <div className="text-center md:text-left animate-fade-in delay-200">
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              variant="bordered"
                              className="rounded-2xl bg-transparent text-white hover:scale-105 transition-transform duration-300 border-transparent hover:border-[#A6E1FA]"
                            >
                              <span className="text-xl">...</span>
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            aria-label="Chapter Actions"
                            className="backdrop-blur-md bg-[#04091C] border border-[#004493] rounded-lg shadow-lg min-w-[120px] p-1"
                          >
                            <DropdownItem
                              key="edit"
                              className="text-white hover:bg-gray-500/20 focus:bg-gray-500/20 transition-all duration-200 rounded-md px-3 py-2 text-sm"
                              onClick={() => handleEdit(chapter)}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              key="delete"
                              className="text-white hover:bg-gray-500/20 focus:bg-gray-500/20 transition-all duration-200 rounded-md px-3 py-2 text-sm"
                              onClick={() => handleDelete(chapter)}
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

      <div className="flex justify-center mt-8">
        <Button
          color="primary"
          variant="bordered"
          className="backdrop-blur-md bg-opacity-20 bg-[#04091C] border border-[#004493] hover:border-[#A6E1FA] hover:scale-105 transition-transform duration-300"
        >
          <CirclePlus className="w-4 h-4 mr-2" />
          New Document
        </Button>
      </div>
    </div>
  );
}