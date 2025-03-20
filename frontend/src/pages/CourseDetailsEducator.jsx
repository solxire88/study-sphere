import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { classes } from "../components/ClassesTable";
import { Hourglass, User, BriefcaseBusiness } from "lucide-react";
import { Tabs, Tab } from "@heroui/react";
import Documents from "../components/tabs/Documents";
import Chat from "../components/tabs/Chat";
import Chatbot from "../components/tabs/chatbot";
import Tests from "../components/tabs/Tests";
import Students from "../components/tabs/Students";
import About from "../components/tabs/About";

const CourseDetailsEducator = () => {
  const { id } = useParams();
  const courseId = parseInt(id);
  const selectedCourse = classes.find((course) => course.id === courseId);
  const [selectedTab, setSelectedTab] = useState("documents");

  const renderTabContent = () => {
    switch (selectedTab) {
      case "documents":
        return <Documents chapters={selectedCourse.chapters} />;
      case "chat":
        return <Chat />;
      case "chatbot":
        return <Chatbot />;
      case "tests":
        return <Tests courseId={courseId} />;
      case "students":
        return <Students totalStudents={selectedCourse.totalStudents} />;
      case "about":
        return <About totalStudents={selectedCourse.totalStudents} schedule={selectedCourse.schedule} />;
      default:
        return <div>Select a tab</div>;
    }
  };

  if (!selectedCourse) {
    return <div>Course not found!</div>;
  }

  return (
    <div className="pt-32 p-8 text-white flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl sm:text-6xl font-bold mb-8" style={{ color: "#A6E1FA" }}>
        <span className="inline-block transition-all duration-300 hover:scale-[1.02] hover:text-blue-200 hover:drop-shadow-[0_0_8px_#A6E1FA]">
          {selectedCourse.title}
        </span>
      </h1>

      <div className="flex flex-col items-center space-y-4 text-lg sm:text-xl mb-16">
        <p className="flex items-center space-x-2 group">
          <Hourglass className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 transform group-hover:scale-125 group-hover:rotate-[20deg]" />
          <span className="group-hover:text-blue-300 transition-colors">
            <span className="font-semibold">Schedule:</span> {selectedCourse.schedule}
          </span>
        </p>

        <p className="flex items-center space-x-2 group">
          <User className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 transform group-hover:scale-125 group-hover:-rotate-[20deg]" />
          <span className="group-hover:text-blue-300 transition-colors">
            <span className="font-semibold">Total Students:</span> {selectedCourse.totalStudents}
          </span>
        </p>

        <p className="flex items-center space-x-2 group">
          <BriefcaseBusiness className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 transform group-hover:scale-125 group-hover:rotate-[20deg]" />
          <span className="group-hover:text-blue-300 transition-colors">
            <span className="font-semibold">Educator:</span> Dr. John Doe
          </span>
        </p>
      </div>

      <div className="w-full max-w-6xl px-4 sm:px-0 flex justify-center">
        <div className="flex justify-center w-full">
          <Tabs
            aria-label="Course Tabs"
            size="lg"
            variant="underlined"
            color="primary"
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key)}
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
      </div>

      <div className="mt-8 w-full">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CourseDetailsEducator;