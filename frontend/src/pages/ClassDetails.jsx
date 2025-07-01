// src/pages/ClassDetails.jsx
import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { BriefcaseBusiness, Hourglass, Clock, User, Star } from "lucide-react";
import { Tabs, Tab } from "@heroui/react";
import { Navigate } from "react-router-dom";
import { SALT } from "../constants";

import Documents from "../components/tabsStudent/Documents";
import Chat from "../components/tabsStudent/Chat";
import Tests from "../components/tabsStudent/Tests";
import Chatbot from "../components/tabsStudent/chatbot";
import Feedback from "../components/tabsStudent/Feedback";

export default function ClassDetails() { 
  const location = useLocation();
  const passedCourse = location.state?.course;
  const { hash } = useParams();
  let classId;
  try {
    // decode and verify salt
    const [rawId, salt] = atob(hash).split(":");
    if (salt !== SALT) throw new Error("Invalid");
    classId = rawId;
  } catch {
    // invalid or tampered URL → redirect away
    return <Navigate to="/not-authorized" replace />;
  }

  // If no course was passed, you might redirect or show an error here.
  if (!passedCourse) {
    return <p className="text-red-400 p-4">No course data provided!</p>;
  }

  const [selectedTab, setSelectedTab] = useState("documents");
  const course = passedCourse;

  return (
    <div className="pt-32 p-8 text-white flex flex-col items-center text-center">
      <h1 className="text-4xl sm:text-6xl font-bold mb-8" style={{ color: "#A6E1FA" }}>
        <span className="inline-block transition-all duration-300 hover:scale-[1.02] hover:text-blue-200 hover:drop-shadow-[0_0_8px_#A6E1FA]">
          {course.title}
        </span>
      </h1>

      <div className="flex flex-col items-center space-y-4 text-lg sm:text-xl mb-16">
        <p className="flex items-center space-x-2 group">
          <BriefcaseBusiness className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 transform group-hover:scale-125 group-hover:rotate-[20deg]" />
          <span className="group-hover:text-blue-300 transition-colors">
            <span className="font-semibold">Educator:</span>{" "}
            {course.author}
          </span>
        </p>
        <p className="flex items-center space-x-2 group">
          <Star className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 transform group-hover:scale-125 group-hover:rotate-[20deg]" />
          <span className="group-hover:text-blue-300 transition-colors">
            <span className="font-semibold">Average Rating:</span>{" "}
            {course.avg_rating || 0}/5
          </span>
        </p>
        <p className="flex items-center space-x-2 group">
          <User className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 transform group-hover:scale-125 group-hover:-rotate-[20deg]" />
          <span className="group-hover:text-blue-300 transition-colors">
            <span className="font-semibold">Total Students:</span>{" "}
            {course.enrolled_students.length}
          </span>
        </p>
        <p className="flex items-center space-x-2">
          <Hourglass className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="group-hover:text-blue-300 transition-colors" ><strong>Duration:</strong> {course.schedule}</span>
        </p>
        {/* <p className="flex items-center space-x-2">
          <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
          <span><strong>Duration:</strong> {course.schedule}</span>
        </p> */}
      </div>

      <div className="w-full max-w-6xl px-4 sm:px-0 flex justify-center">
        <Tabs
          aria-label="Class Tabs"
          size="lg"
          variant="underlined"
          color="primary"
          selectedKey={selectedTab}
          onSelectionChange={setSelectedTab}
          className="border-transparent"
        >
          <Tab key="documents" title="Documents" />
          <Tab key="chat" title="Chat" />
          <Tab key="tests" title="Tests" />
          <Tab key="chatbot" title="Chatbot" />
          <Tab key="feedback" title="Feedback" />
        </Tabs>
      </div>

      <div className="mt-8 w-full">
        {selectedTab === "documents" && <Documents classId={classId} />}
        {selectedTab === "chat" && <Chat classId={classId} />}
        {selectedTab === "tests" && <Tests classId={classId} />}
        {selectedTab === "chatbot" && <Chatbot />}
        {selectedTab === "feedback" && <Feedback classId={classId} />}
      </div>
    </div>
  );
}
