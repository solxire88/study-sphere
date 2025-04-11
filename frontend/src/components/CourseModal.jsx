import { useEffect } from "react";
import { Card, CardHeader, CardBody, Button, ScrollShadow } from "@heroui/react";
import { Hourglass, Clock, User, BookOpen } from "lucide-react";

export default function CourseModal({ isOpen, onClose, course, modalClassName }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !course) return null;

  const syllabus = [
    "Introduction to Quantum Potato Farming",
    "Spud-Based Algorithms",
    "Growing Potatoes in Zero Gravity",
  ];

  const courseTags = ["Physics", "Agriculture"];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
      <Card
        className={`relative p-6 border-2 border-[#004493] w-[450px] h-[600px] shadow-[0_0_20px_#004493] bg-[#04091C] ${modalClassName} max-sm:w-[80vw] max-sm:h-[80vw] max-sm:max-h-[80vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        <ScrollShadow className="w-full h-full scrollbar-custom">
          <CardHeader className="pb-4 pt-2 px-4 flex-col items-start">
            <h3 className="text-3xl font-bold text-[#A6E1FA] mb-2">{course.title}</h3>

            <div className="flex gap-2 mb-4">
              {courseTags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm text-[#A6E1FA] border border-[#004493] rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-3">
              <p className="text-gray-200 flex items-center text-base">
                <User className="w-5 h-5 mr-2 text-[#A6E1FA]" />
                {course.instructor}
              </p>

              <span className="text-gray-400">|</span>

              <p className="text-gray-300 flex items-center text-base">
                <Hourglass className="w-5 h-5 mr-2 text-[#A6E1FA]" />
                {course.duration}
              </p>
            </div>

            <p className="text-gray-300 mb-3 flex items-center text-base">
              <Clock className="w-5 h-5 mr-2 text-[#A6E1FA]" />
              {course.schedule}
            </p>
          </CardHeader>

          <CardBody className="py-4 px-4 text-white">
            <h4 className="text-xl font-semibold text-[#A6E1FA] mb-2">Description</h4>
            <div className="pr-4">
              <p className="text-white">
                Learn the basics of quantum potato farming and spud-based algorithms in this fun and engaging course.
              </p>
            </div>
          </CardBody>

          <CardBody className="py-4 px-4 text-white">
            <h4 className="text-xl font-semibold text-[#A6E1FA] mb-2 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-[#A6E1FA]" />
              Syllabus
            </h4>
            <div className="pr-4">
              <ul className="list-disc list-inside text-white">
                {syllabus.map((topic, index) => (
                  <li key={index} className="mb-1">
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </CardBody>

          <div className="flex justify-center mt-4 gap-4">
            <Button
              color="primary"
              variant="solid"
              className="w-1/2 text-white bg-[#1F9BA6] border-[#1F9BA6] hover:shadow-md transition-shadow duration-200"
            >
              Join Course
            </Button>
            <Button
              color="primary"
              variant="solid"
              className="w-1/2 text-white bg-[#1F9BA6] border-[#1F9BA6] hover:shadow-md transition-shadow duration-200"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </ScrollShadow>
      </Card>
    </div>
  );
}