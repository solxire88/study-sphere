"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Hourglass, User, BriefcaseBusiness, Star } from "lucide-react";
import { Tabs, Tab } from "@heroui/react";
import { Navigate } from "react-router-dom";

import Documents from "../components/tabs/Documents";
import Chat from "../components/tabs/Chat";
import Chatbot from "../components/tabs/chatbot";
import Tests from "../components/tabs/Tests";
import Students from "../components/tabs/Students";
import About from "../components/tabs/About";

import { ACCESS_TOKEN, SALT } from "../constants";

export default function CourseDetailsEducator() {
  // const { id } = useParams();
  // const courseId = parseInt(id, 10);

  const [course, setCourse] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("documents");
  const { hash } = useParams();
  let courseId;
  try {
      // decode and verify salt
      const [rawId, salt] = atob(hash).split(":");
      if (salt !== SALT) throw new Error("Invalid");
      courseId = rawId;
    } catch {
      // invalid or tampered URL → redirect away
      return <Navigate to="/not-authorized" replace />;
    }

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem(ACCESS_TOKEN)
      : null;

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        // Fetch course details
        const courseRes = await axios.get(
          `http://127.0.0.1:8000/class/classes/${courseId}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCourse(courseRes.data);

        // Fetch enrollments for this class
        const enrollRes = await axios.get(
          `http://127.0.0.1:8000/class/classes/${courseId}/enrollments/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEnrollments(enrollRes.data);
        console.log("Enrollments:", enrollRes.data);
        

      } catch (err) {
        console.error("Error loading course or enrollments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, token]);

  if (loading) return <p>Loading course…</p>;
  if (!course) return <p>Course not found!</p>;
  console.log("Enrollments:", enrollments);

  const randomAverage = (Math.random() * 4 + 1).toFixed(1);

  const renderTabContent = () => {
    switch (selectedTab) {
      case "documents":
        return <Documents classId={courseId} />;
      case "chat":
        return <Chat classId={courseId} />;
      case "chatbot":
        return <Chatbot />;
      case "tests":
        return <Tests courseId={courseId} />;
      case "students":
        return <Students students={enrollments} classId={courseId} />;
      case "about":
        return (
          <About
            classId={courseId}
            totalStudents={enrollments.length}
            schedule={course.schedule}
          />
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="pt-32 p-8 text-white flex flex-col items-center justify-center text-center">
      <h1
        className="text-4xl sm:text-6xl font-bold mb-8"
        style={{ color: "#A6E1FA" }}
      >
        <span className="inline-block transition-all duration-300 hover:scale-[1.02] hover:text-blue-200 hover:drop-shadow-[0_0_8px_#A6E1FA]">
          {course.title}
        </span>
      </h1>

      <div className="flex flex-col items-center space-y-4 text-lg sm:text-xl mb-16">
        <p className="flex items-center space-x-2 group">
          <Star className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 transform group-hover:scale-125 group-hover:rotate-[20deg]" />
          <span className="group-hover:text-blue-300 transition-colors">
            <span className="font-semibold">Average Rating:</span>{" "}
            {randomAverage}/5
          </span>
        </p>
        <p className="flex items-center space-x-2 group">
          <User className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 transform group-hover:scale-125 group-hover:-rotate-[20deg]" />
          <span className="group-hover:text-blue-300 transition-colors">
            <span className="font-semibold">Total Students:</span>{" "}
            {enrollments.length}
          </span>
        </p>
        <p className="flex items-center space-x-2 group">
          <BriefcaseBusiness className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 transform group-hover:scale-125 group-hover:rotate-[20deg]" />
          <span className="group-hover:text-blue-300 transition-colors">
            <span className="font-semibold">Educator:</span>{" "}
            {course.author}
          </span>
        </p>
      </div>

      <div className="w-full max-w-6xl px-4 sm:px-0 flex justify-center">
        <Tabs
          aria-label="Course Tabs"
          size="lg"
          variant="underlined"
          color="primary"
          selectedKey={selectedTab}
          onSelectionChange={setSelectedTab}
          className="border-transparent"
        >
          <Tab key="documents" title="Documents" />
          <Tab key="chat" title="Chat" />
          <Tab key="chatbot" title="Chatbot" />
          <Tab key="tests" title="Tests" />
          <Tab key="students" title="Students" />
          <Tab key="about" title="About" />
        </Tabs>
      </div>

      <div className="mt-8 w-full">{renderTabContent()}</div>
    </div>
  );
}
