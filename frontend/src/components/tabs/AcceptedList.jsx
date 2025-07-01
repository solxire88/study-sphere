import React from "react";
import { User, Trash } from "lucide-react";
import { Progress } from "@heroui/react";

const AcceptedList = ({ students, onDeleteClick, progress }) => {
  if (!students.length) {
    return (
      <div className="text-gray-400 text-center py-4">
        No accepted students
      </div>
    );
  }

  return (
    <div
      className="p-6 rounded-lg"
      style={{
        background: "linear-gradient(145deg, #04091C, #0A0F24)",
        boxShadow: "0 4px 20px rgba(30, 144, 255, 0.2)",
        maxWidth: "700px",
        width: "90%",
        maxHeight: "60vh",
      }}
    >
      <div className="overflow-y-auto" style={{ maxHeight: "calc(60vh - 48px)" }}>
        <ul className="space-y-3">
          {students.map((enrollment) => {
            const entry = progress.per_student.find(
              (p) => p.student === enrollment.student
            );
            const pct = entry ? entry.percentage : 0;

            return (
              <li
                key={enrollment.id}
                className="flex items-center justify-between py-3 px-4 hover:bg-[#0A0F24] space-x-10 rounded transition-colors duration-200"
              >
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-3 text-[#1E90FF]" />
                  <span className="text-white">{enrollment.student}</span>
                </div>

                <div className="flex items-center space-x-6 ">
                  <Progress
                    value={pct}
                    aria-label="Downloading..."
                    className="max-w-md w-full w-full sm:w-40 md:w-48 lg:w-60 xs:w-2"
                    striped={true}
                    animated={true}
                    classNames={'w-full'}
                    color="success"
                    showValueLabel={true}
                    size="md"
                    // style={{ backgroundColor: "#1E90FF" }}
                  />
                  <button
                    onClick={() => onDeleteClick(enrollment)}
                    className="flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-900/50 text-red-300 hover:bg-red-900/70 transition-colors"
                  >
                    <Trash className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AcceptedList;
