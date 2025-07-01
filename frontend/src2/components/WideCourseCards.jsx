import { Card, CardHeader, CardBody, Button } from "@heroui/react";
import { Hourglass, Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WideCourseCards({ course }) {
  const navigate = useNavigate();

  const handleEnterClass = () => {
    navigate(`/student/class/${course.id}`);
  };

  return (
    <Card className="py-3 bg-transparent border-3 border-[#004493] w-full flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-[0_0_15px_#004493] hover:border-[#004493]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h3 className="text-3xl font-bold text-[#A6E1FA] mb-4 leading-tight break-words">
          {course.title}
        </h3>
      </CardHeader>

      <CardBody className="py-2 px-4 flex flex-col items-start justify-end gap-3">
        <div className="w-full flex justify-between items-end">
          <div className="flex flex-col items-start gap-2">
            <p className="text-gray-200 flex items-center text-lg">
              <User className="w-6 h-6 mr-2 text-[#A6E1FA]" />
              {course.instructor}
            </p>

            <p className="text-gray-300 flex items-center text-lg">
              <Clock className="w-6 h-6 mr-2 text-[#A6E1FA]" />
              {course.schedule}
            </p>

            <div className="flex items-center gap-2">
              <Hourglass className="w-6 h-6 text-[#A6E1FA]" />
              <span className="text-gray-300 text-lg">
                {course.duration}
              </span>
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