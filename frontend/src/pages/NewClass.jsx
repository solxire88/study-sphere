import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
  Textarea,
} from "@heroui/react";

const daysOfWeek = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
];

const tags = [
  { key: "coding", label: "Coding" },
  { key: "languages", label: "Languages" },
  { key: "mathematics", label: "Mathematics" },
  { key: "excel", label: "Excel" },
  { key: "physics", label: "Physics" },
  { key: "other", label: "Other" },
];

export default function NewClass() {
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [selectedDay, setSelectedDay] = React.useState(null);

  const handleTagClick = (tagKey) => {
    if (selectedTags.includes(tagKey)) {
      setSelectedTags(selectedTags.filter((key) => key !== tagKey));
    } else {
      setSelectedTags([...selectedTags, tagKey]);
    }
  };

  return (
    <div className="pt-12 p-4 sm:p-0 min-h-screen bg-[#04091C] text-white flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl font-bold mt-8 sm:mt-24 sm:mb-12 text-center" style={{ color: '#A6E1FA' }}>
        New Class
      </h1>

      <div className="mb-8 sm:mb-10 w-full sm:w-[600px]">
        <label className="block text-lg font-medium mb-3 text-center" style={{ color: '#A6E1FA' }}>
          Title
        </label>
        <Input
          placeholder="Enter class title"
          type="text"
          variant="bordered"
          size="lg"
          className="rounded-lg bg-transparent text-white w-full hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="mb-8 sm:mb-10 w-full sm:w-[600px]">
        <label className="block text-lg font-medium mb-3 text-center" style={{ color: '#A6E1FA' }}>
          Tags
        </label>
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          {tags.map((tag) => (
            <Button
              key={tag.key}
              color="primary"
              variant={selectedTags.includes(tag.key) ? "solid" : "bordered"}
              onClick={() => handleTagClick(tag.key)}
              className="rounded-full px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base !text-white !border-[#004493] hover:scale-105 transition-transform duration-300"
            >
              {tag.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-8 sm:mb-10 w-full sm:w-[600px]">
        <label className="block text-lg font-medium mb-3 text-center" style={{ color: '#A6E1FA' }}>
          Schedule
        </label>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
          <div className="w-full sm:flex-1">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  size="md"
                  className="rounded-2xl bg-transparent mb-2 text-white w-full h-12 text-base flex items-center justify-between hover:scale-105 transition-transform duration-300"
                >
                  {selectedDay ? selectedDay.label : "Select a day"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Days of the Week"
                className="bg-[#04091C] rounded-2xl text-white"
                variant="bordered"
              >
                {daysOfWeek.map((day) => (
                  <DropdownItem
                    key={day.key}
                    className="text-white hover:bg-[#004493] hover:scale-105 transition-transform duration-300"
                    onClick={() => setSelectedDay(day)}
                  >
                    {day.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="w-full sm:flex-1">
            <Input
              size="lg"
              placeholder="Enter time"
              type="text"
              variant="bordered"
              className="rounded-2xl bg-transparent text-white w-full h-14 text-lg px-4 flex items-center hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      <div className="mb-8 sm:mb-10 w-full sm:w-[600px]">
        <label className="block text-lg font-medium mb-3 text-center" style={{ color: '#A6E1FA' }}>
          Description
        </label>
        <Textarea
          placeholder="Enter class description"
          variant="bordered"
          className="rounded-2xl bg-transparent text-white w-full hover:scale-105 transition-transform duration-300"
          style={{ height: '100px' }}
        />
      </div>

      <div className="mb-8 sm:mb-10 w-full sm:w-[600px]">
        <label className="block text-lg font-medium mb-3 text-center" style={{ color: '#A6E1FA' }}>
          Syllabus
        </label>
        <Textarea
          placeholder="Enter syllabus details"
          variant="bordered"
          className="rounded-2xl bg-transparent text-white w-full hover:scale-105 transition-transform duration-300"
          style={{ height: '100px' }}
        />
      </div>

      <div className="flex justify-center mt-8 sm:mt-12 w-full sm:w-[600px]">
        <Button
          color="primary"
          variant="bordered"
          className="rounded-2xl text-lg px-6 py-3 sm:px-8 sm:py-4 w-full hover:scale-105 transition-transform duration-300"
        >
          Create Class
        </Button>
      </div>
    </div>
  );
}