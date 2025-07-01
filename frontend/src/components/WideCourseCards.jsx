import React from "react";
import { Card, CardHeader, CardBody, Button } from "@heroui/react";
import { Hourglass, Star, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SALT } from "../constants"; 
import axios from "axios";
import { ACCESS_TOKEN } from "../constants";

export default function WideCourseCards({ course }) {
  const [activeTag, setActiveTag] = React.useState(null);
    const [avgRating, setAvgRating] = React.useState(null);
  const navigate = useNavigate();


    React.useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/stats/class/${course.id}/average/`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        // your view returns { average: X }
        setAvgRating(res.data.average ?? 0);
      })
      .catch((err) => {
        console.error("Failed to load avg rating:", err);
        setAvgRating(0);
      });
  }, [course.id]);

  const ratingDisplay =
    avgRating !== null ? avgRating.toFixed(1) : course.avg_rating?.toFixed(1) ?? "0.0";
  // Use the real enrolled student count, or fallback to 0
  const studentCount = course.enrolled_students?.length ?? 0;

  console.log(course.tags);

  function encodeId(id) {
    return btoa(`${id}:${SALT}`);
  }

    const handleEnterClass = () => {
      navigate(
      `/student/class/${encodeId(course.id)}`,
      { state: { course } }
      );
    }; 

  return (
    <Card className="py-3 bg-transparent border-3 border-[#004493] w-full flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-[0_0_15px_#004493] hover:border-[#004493]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h3 className="text-3xl font-bold text-[#A6E1FA] mb-4 leading-tight break-words">
          {course.title}
        </h3>
      </CardHeader>

      <CardBody className="py-2 px-4 flex flex-col items-start justify-end gap-3">

        <div className="flex flex-row items-center gap-2">
          {course.tags.map((tag, index) => (
            <span
              key={index}
              className={`zoom-button rounded-full px-4 py-2 sm:px-4 sm:py-1 text-base sm:text-md !border-[#004493] border cursor-pointer transition-colors ${
                activeTag === tag
                  ? "!bg-[#004493] !text-white"
                  : "!text-white hover:bg-[#004493]"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="w-full flex flex-row justify-between items-end">
        <div className="flex flex-row items-center gap-8">
          <div className="flex flex-col items-start gap-2">
            <p className="text-gray-200 flex items-center text-lg">
              <User className="w-6 h-6 mr-2 text-[#A6E1FA]" />
              {course.author /* or instructor field */}
            </p>

            <p className="text-gray-300 flex items-center text-lg">
              <Star className="w-6 h-6 mr-2 text-[#A6E1FA]" />
              {avgRating}/5.0
            </p>
        </div>
        <div className="flex flex-col items-start gap-2">

            <p className="text-gray-300 flex items-center text-lg">
              <User className="w-6 h-6 mr-2 text-[#A6E1FA]" />
              {studentCount} Students
            </p>

            <div className="flex items-center gap-2">
              <Hourglass className="w-6 h-6 text-[#A6E1FA]" />
              <span className="text-gray-300 text-lg">{course.schedule}</span>
            </div>
          </div>
        </div>

          <Button
            color="primary"
            variant="solid"
            className="w-36 text-sm text-white bg-[#1F9BA6] border-[#1F9BA6] transition-transform transform hover:scale-110"
            onClick={handleEnterClass}
          >
            Enter Class
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
