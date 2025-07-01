import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Button, ScrollShadow } from "@heroui/react";
import { Hourglass, Star, User, Activity } from "lucide-react";
import CourseModal from "./CourseModal";
import axios from "axios";
import { ACCESS_TOKEN } from "../constants";

export default function CourseCard({ course }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [activeTag, setActiveTag] = useState(null);
  const token = localStorage.getItem(ACCESS_TOKEN);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/stats/class/${course.id}/average/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // DRF view returns { average: <number> }
        if (res.status === 200 && res.data.average != null) {
          setRating(res.data.average.toFixed(1));
        }
      } catch (err) {
        console.error("Could not fetch average rating", err);
      }
    };
    fetchRating();
  }, [course.id, token]);

  return (
    <>
      <Card className="py-3 bg-transparent border-3 border-[#004493] w-[340px] h-[275px] flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-[0_0_15px_#004493] hover:border-[#004493]">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h3 className="text-2xl font-bold text-[#A6E1FA] mb-2 leading-tight break-words">
            {course.title}
          </h3>
        </CardHeader>

        <CardBody className="py-1 px-2 flex flex-col items-start justify-end gap-3">
          <ScrollShadow
            hideScrollBar
            orientation="horizontal"
            className="flex flex-row mt-10 py-8 w-[320px] items-center gap-2"
          >
            {course.tags.map((tag) => (
              <span
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`zoom-button w-100% whitespace-nowrap rounded-full px-4 py-2 sm:px-4 sm:py-1 text-base sm:text-sm !border-[#004493] border cursor-pointer transition-colors ${
                  activeTag === tag
                    ? "!bg-[#004493] !text-white"
                    : "!text-white hover:bg-[#004493]"
                }`}
              >
                {tag}
              </span>
            ))}
          </ScrollShadow>

          <div className="flex flex-row items-center gap-8 whitespace-nowrap">
            <div className="w-full flex flex-col justify-between gap-2">
              <p className="text-gray-200 flex items-center text-lg">
                <User className="w-6 h-6 mr-2 text-[#A6E1FA]" />
                {course.author.charAt(0).toUpperCase() + course.author.slice(1)}
              </p>

              <p className="text-gray-300 flex items-center text-lg">
                <Star className="w-6 h-6 mr-2 text-[#A6E1FA]" />
                {rating}/5.0
              </p>
            </div>

            <div className="w-full flex flex-col justify-between gap-2">
              <p className="text-gray-200 flex items-center text-lg">
                <User className="w-6 h-6 mr-2 text-[#A6E1FA]" />
                {course.enrolled_students.length} Students
              </p>

              <p className="text-gray-300 flex items-center text-lg">
                <Hourglass className="w-6 h-6 mr-2 text-[#A6E1FA]" />
                {course.schedule}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              color="primary"
              variant="solid"
              className="w-36 text-sm text-white bg-[#1F9BA6] border-[#1F9BA6] transition-transform transform hover:scale-110 hover:bg-[#1A7F8A] hover:border-[#1A7F8A]"
              onClick={openModal}
            >
              Enroll Now
            </Button>
          </div>
        </CardBody>
      </Card>

      <CourseModal
        isOpen={isOpen}
        onClose={closeModal}
        course={course}
        modalClassName="fade-in-bounce"
      />
    </>
  );
}
