import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Button, ScrollShadow } from "@heroui/react";
import { BookOpen } from "lucide-react";
import axios from "axios";
import { ACCESS_TOKEN, USERNAME } from "../constants";

export default function CourseModal({ isOpen, onClose, course, modalClassName }) {
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState(null);
  const [activeTag, setActiveTag] = useState(null);

  const username = localStorage.getItem(USERNAME);
  const token = localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (!course || !token) return;

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/class/class/my-enrollments/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const enrolledClassTitles = response.data.map(cls => cls.class_obj);
        console.log("Enrolled Class IDs:", enrolledClassTitles);
        // console.log(response.data);
        if (enrolledClassTitles.includes(course.title)) {
          setEnrolled(true);
        } else {
          setEnrolled(false);
        }
      } catch (err) {
        console.error("Failed to check enrollment:", err);
      }
    };

    checkEnrollment();
  }, [course, token]);


  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !course) return null;

  const handleJoinCourse = async () => {
    setEnrolling(true);
    setError(null);
    const url = `${import.meta.env.VITE_API_URL}/class/enroll/`;
    const payload = { class_id: course.id };

    try {
      const response = await axios({
        method: 'post',
        url,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setEnrolled(true);
    } catch (err) {
      console.error('Enroll failed', err.response?.data || err.message);
      setError(
        err.response?.data?.class_id
          ? err.response.data.class_id.join(', ')
          : err.response?.data?.detail || JSON.stringify(err.response?.data) || err.message
      );
    } finally {
      setEnrolling(false);
    }
  };

  console.log("enrolled", enrolled);
  console.log("enrolling", enrolling);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm" onClick={onClose}>
      <Card
        className={`relative p-6 border-2 border-[#004493] w-[400px] h-[500px] shadow-[0_0_20px_#004493] bg-[#04091C] ${modalClassName} max-sm:w-[80vw] max-sm:h-[80vh]`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <CardHeader className="pb-4 pt-2 px-4 flex-col items-start">
            <h3 className="text-2xl font-bold text-[#A6E1FA] mb-2">{course.title}</h3>
          </CardHeader>
          <div className="flex flex-row items-center flex-wrap gap-2">
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

          <ScrollShadow className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#004493] scrollbar-track-[#04091C] hover:scrollbar-thumb-[#1F9BA6]">
            
            <CardBody className="py-4 px-4 text-white">
              <h4 className="text-lg font-semibold text-[#A6E1FA] mb-2">Informations</h4>
              <div className="pr-4 gap-2 flex flex-col">
                <p className="text-white font-medium text-sm">{`Students : ${course.enrolled_students.length} ` || "No Students Enrolled."}</p>
                <p className="text-white font-medium text-sm">{`Duration : ${course.schedule}` || "No Students Enrolled."}</p>
                <p className="text-white font-medium text-sm">{`Difficulty : ${course.difficulty}` || "No Students Enrolled."}</p>


              </div>
            </CardBody>

            <CardBody className="py-4 px-4 text-white">
              <h4 className="text-lg font-semibold text-[#A6E1FA] mb-2">Description</h4>
              <div className="pr-4">
                <p className="text-white text-sm">{course.description || "No description provided."}</p>
              </div>
            </CardBody>

            <CardBody className="py-4 px-4 text-white">
              <h4 className="text-lg font-semibold text-[#A6E1FA] mb-2 flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-[#A6E1FA]" /> Syllabus
              </h4>
              <div className="pr-4">
                <ul className="list-disc list-inside text-white text-sm">
                  {course.syllabus?.split("\n").map((line, idx) => (
                    <li key={idx} className="mb-1">{line}</li>
                  )) || <li>No syllabus available.</li>}
                </ul>
              </div>
            </CardBody>
          </ScrollShadow>

          {error && <p className="text-red-400 text-center mt-2">Error: {error}</p>}

          <div className="flex justify-center mt-4 gap-4 pt-2">
            <Button
              color="primary"
              variant="solid"
              className="w-1/2 text-white bg-[#1F9BA6] border-[#1F9BA6] hover:shadow-md transition-shadow duration-200 text-sm"
              onClick={handleJoinCourse}
              isDisabled={enrolling || enrolled}
            >
              {enrolled ? "Enrolled" : enrolling ? "Enrolling..." : "Join Course"}
            </Button>
            <Button
              color="primary"
              variant="solid"
              className="w-1/2 text-white bg-[#1F9BA6] border-[#1F9BA6] hover:shadow-md transition-shadow duration-200 text-sm"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
