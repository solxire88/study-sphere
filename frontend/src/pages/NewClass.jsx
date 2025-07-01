import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Input,
  Textarea,
} from "@heroui/react";
import { ACCESS_TOKEN } from "../constants";

const tagsList = [
  { key: "Web Development", label: "Web Development" },
  { key: "Maths", label: "Maths" },
  { key: "Engineering", label: "Engineering" },
  { key: "Cybersecurity", label: "Cybersecurity" },
  { key: "ML & Data Science", label: "ML & Data Science" },
  { key: "Low-Level Programming", label: "Low-Level Programming" },
  { key: "UI/UX & Product Design", label: "UI/UX & Product Design" },
  { key: "Others", label: "Others" },
];

const durations = [
  { label: "1 Week", value: "1 week" },
  { label: "2 Weeks", value: "2 weeks" },
  { label: "4 Weeks (1 Month)", value: "4 weeks" },
  { label: "6 Weeks", value: "6 weeks" },
  { label: "8 Weeks (2 Months)", value: "8 weeks" },
  { label: "12 Weeks (3 Months)", value: "12 weeks" },
  { label: "16 Weeks (4 Months)", value: "16 weeks" },
];

// New single-choice difficulty options
const difficultyLevels = [
  { value: "beginner", label: "Begginer" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export default function NewClass() {
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("");          // ← new
  const [description, setDescription] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem(ACCESS_TOKEN);

  const handleTagClick = (tagKey) => {
    setSelectedTags((prev) =>
      prev.includes(tagKey)
        ? prev.filter((t) => t !== tagKey)
        : [...prev, tagKey]
    );
  };

  const handleSubmit = async () => {
    setError(null);
    const schedule = duration;
    try {
      await axios.post(
        `http://localhost:8000/class/classes/`,
        {
          title,
          tags: selectedTags,
          schedule,
          difficulty,              
          description,
          syllabus,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsCreated(true);
    } catch (err) {
      console.error(err);
      setError(err.response?.data || err.message);
    }
  };

  const handleCreateAnother = () => {
    setTitle("");
    setSelectedTags([]);
    setDuration("");
    setDifficulty("");           // ← reset
    setDescription("");
    setSyllabus("");
    setIsCreated(false);
    setError(null);
  };

  if (isCreated) {
    return (
      <div className="pt-12 p-4 sm:p-0 min-h-screen bg-[#04091C] text-white flex flex-col items-center justify-center">
        <div className="text-center p-8 rounded-2xl border border-[#004493] max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#A6E1FA" }}>
            Class Created Successfully
          </h2>
          <p className="mb-6 text-gray-300">
            Your class "{title}" has been created.
          </p>
          <Button
            color="primary"
            variant="solid"
            className="rounded-xl py-3 text-base font-medium"
            onClick={handleCreateAnother}
          >
            Create Another Class
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-12 p-4 sm:p-0 min-h-screen bg-[#04091C] text-white flex flex-col items-center">
      <h1
        className="text-2xl sm:text-3xl font-bold mt-8 sm:mt-24 sm:mb-12 text-center"
        style={{ color: "#A6E1FA" }}
      >
        New Class
      </h1>

      {error && <p className="text-red-400 mb-4">{JSON.stringify(error)}</p>}

      {/* Title */}
      <div className="mb-8 w-full sm:w-[600px]">
        <label className="block text-lg font-medium mb-3 text-center" style={{ color: "#A6E1FA" }}>
          Title
        </label>
        <Input
          placeholder="Enter class title"
          type="text"
          variant="bordered"
          size="lg"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
          }
          className="rounded-lg bg-transparent text-white w-full hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Tags */}
      <div className="mb-8 w-full sm:w-[600px]">
        <label className="block text-lg font-medium mb-3 text-center" style={{ color: "#A6E1FA" }}>
          Tags (select one or more)
        </label>
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          {tagsList.map((tag) => (
            <Button
              key={tag.key}
              color="primary"
              variant={selectedTags.includes(tag.key) ? "solid" : "bordered"}
              onClick={() => handleTagClick(tag.key)}
              className="rounded-full px-3 py-1 text-sm !text-white !border-[#004493] hover:scale-105 transition-transform duration-300"
            >
              {tag.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Difficulty (single choice) */}
      <div className="mb-8 w-full sm:w-[600px]">
        <label className="block text-lg font-medium mb-3 text-center" style={{ color: "#A6E1FA" }}>
          Difficulty Level
        </label>
        <div className="flex justify-center gap-4">
          {difficultyLevels.map((lvl) => (
            <Button
              key={lvl.value}
              color="primary"
              variant={difficulty === lvl.value ? "solid" : "bordered"}
              onClick={() => setDifficulty(lvl.value)}
              className="rounded-full px-4 py-1 text-sm !text-white !border-[#004493] hover:scale-105 transition-transform duration-300"
            >
              {lvl.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="mb-8 w-full sm:w-[600px]">
        <label className="block text-lg font-medium mb-3 text-center" style={{ color: "#A6E1FA" }}>
          Duration
        </label>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="rounded-2xl bg-transparent text-white w-full h-14 text-lg px-4 hover:scale-105 transition-transform duration-300 border border-gray-300"
        >
          <option value="" disabled>Select course duration</option>
          {durations.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div className="mb-8 w-full sm:w-[600px]">
        <label className="block text-lg font-medium mb-3 text-center" style={{ color: "#A6E1FA" }}>
          Description
        </label>
        <Textarea
          placeholder="Enter class description"
          variant="bordered"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-2xl bg-transparent text-white w-full hover:scale-105 transition-transform duration-300"
          style={{ height: "100px" }}
        />
      </div>

      {/* Syllabus */}
      <div className="mb-8 w-full sm:w-[600px]">
        <label className="block text-lg font-medium mb-3 text-center" style={{ color: "#A6E1FA" }}>
          Syllabus
        </label>
        <Textarea
          placeholder="Enter syllabus details"
          variant="bordered"
          value={syllabus}
          onChange={(e) => setSyllabus(e.target.value)}
          className="rounded-2xl bg-transparent text-white w-full hover:scale-105 transition-transform duration-300"
          style={{ height: "100px" }}
        />
      </div>

      {/* Submit */}
      <div className="flex justify-center mt-8 w-full sm:w-[600px]">
        <Button
          color="primary"
          variant="bordered"
          className="rounded-2xl text-lg px-6 py-3 w-full hover:scale-105 transition-transform duration-300"
          onClick={handleSubmit}
          disabled={!title || !duration || !difficulty || selectedTags.length === 0}
        >
          Create Class
        </Button>
      </div>
    </div>
  );
}
