// src/components/CourseList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";
import { ACCESS_TOKEN } from "../constants";

export default function CourseList({ searchValue = "", activeTag = null }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    const fetchAvailable = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/class/student/classes/available/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCourses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError(err.response?.statusText || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailable();
  }, [token]);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchValue.toLowerCase());

    const matchesTag = activeTag ? course.tags.includes(activeTag) : true;

    return matchesSearch && matchesTag;
  });

  if (loading) return <p className="text-white p-4">Loading classes…</p>;
  if (error) return <p className="text-red-400 p-4">Error: {error}</p>;

  return (
    <div className="mx-auto max-w-7xl px-4 flex justify-center">
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          {filteredCourses.map((course) => (
            <div key={course.id} className="w-full sm:w-auto">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No classes match your criteria.</p>
      )}
    </div>
  );
}
