import { Outlet } from "react-router-dom";
import { useState } from "react";
import StudentNavbar from "../components/StudentNavbar";
import EnrolledCourses from "../components/EnrolledCourses";
import { Input } from "@heroui/react";
import { Search } from "lucide-react";
import "../styles/studentPage.css";
import { SALT } from "../constants";



export default function StudentHome() {
  const [searchValue, setSearchValue] = useState("");
  const [activeTag, setActiveTag] = useState(null);

  const handleTagClick = (tag) => {
    setActiveTag((prevTag) => (prevTag === tag ? null : tag));
  };

  function encodeId(id) {
    return btoa(`${id}:${SALT}`);
  }

  const tags = [
    "Web Development",
    "Maths",
    "Engineering",
    "Cybersecurity",
    "ML & Data Science",
    "Low-Level Programming",
    "UI/UX & Product Design",
    "Others",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <StudentNavbar />

      <div className="flex-1 pt-20 sm:pt-28 px-4">
        <div className="mb-8 sm:mb-16">
          <Input
            placeholder="Enter course name..."
            type="text"
            variant="underlined"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="search-input-wrapper white-text w-full max-w-md mx-auto sm:max-w-2xl"
            startContent={<Search className="text-gray-500" />}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {tags.map((tag) => (
            <div
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`zoom-button rounded-full px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg !border-[#004493] border cursor-pointer transition-colors ${
                activeTag === tag
                  ? "!bg-[#004493] !text-white"
                  : "!text-white hover:bg-[#004493]"
              }`}
            >
              {tag}
            </div>
          ))}
        </div>

        <EnrolledCourses searchValue={searchValue} activeTag={activeTag} />
      </div>

      <div className="h-[500px] bg-transparent"></div>

      <footer className="bg-[#04091C] text-white py-6 mt-2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
          <p className="text-sm mt-0">Made by.....</p>
        </div>
      </footer>
    </div>
  );
}