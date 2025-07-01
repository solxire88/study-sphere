import React, { useEffect, useState } from 'react';
import EducatorNavbar from '../components/EducatorNavbar';
import StatsGrid from '../components/StatsGrid';
import ClassesTable from '../components/ClassesTable';
import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';

export default function EducatorClasses() {
  const [classesCount, setClassesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    const fetchClassesCount = async () => {
      try {
        const { data } = await axios.get(
          'http://127.0.0.1:8000/class/educator/classes/',
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setClassesCount(data.length);
      } catch (err) {
        console.error(err);
        setError(err.response?.statusText || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClassesCount();
  }, [token]);

  if (loading) return <p className="p-4 text-white">Loading…</p>;
  if (error) return <p className="p-4 text-red-400">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-900 to-navy-950 flex flex-col">
      <EducatorNavbar />
      
      <div className="flex-1 flex flex-col py-12 px-4 sm:px-8 mt-8 sm:mt-12">
        <div className="w-full max-w-7xl mx-auto space-y-16">
          {/* Page Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">Educator Portal</h1>
            <p className="text-gray-400">Interactive dashboard for managing your courses and students</p>
          </div>
          
          {/* Stats Section */}
          <div className="space-y-8">
            <StatsGrid classesCount={classesCount} />
          </div>
          
          {/* Table Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-4 w-4 rounded-full bg-cyan-400"></div>
              <h2 className="text-white text-xl font-bold">Your Courses</h2>
            </div>
            <ClassesTable />
          </div>
        </div>
      </div>
    </div>
  );
}
