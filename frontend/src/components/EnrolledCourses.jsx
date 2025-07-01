import React, { useEffect, useState } from "react";
import axios from "axios";
import WideCourseCards from "./WideCourseCards";
import { ACCESS_TOKEN } from "../constants";

export default function StudentClasses({ searchValue, activeTag }) {
  const [accepted, setAccepted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    const fetchAccepted = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/class/student/classes/accepted/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAccepted(Array.isArray(res.data) ? res.data : []);
        console.log("accepted", res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.statusText || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccepted();
  }, [token]);

  const filteredCourses = accepted.filter((course) => {
    const matchesTag = activeTag ? course.tags?.includes(activeTag) : true;
    const matchesSearch = searchValue
      ? course.title?.toLowerCase().includes(searchValue.toLowerCase())
      : true;
    return matchesTag && matchesSearch;
  });

  if (loading) return <p className="text-white p-4">Loading enrolled classes…</p>;
  if (error) return <p className="text-red-400 p-4">Error: {error}</p>;

  return (
    <div className="course-list-container mx-auto max-w-7xl px-4 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Enrolled Classes</h2>
        {filteredCourses.length ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredCourses.map(course => (
              <WideCourseCards key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No classes match your search/filter.</p>
        )}
      </section>
    </div>
  );
}
