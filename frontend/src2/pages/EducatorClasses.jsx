import React from 'react';
import EducatorNavbar from '../components/EducatorNavbar';
import StatsGrid from '../components/StatsGrid';
import ClassesTable from '../components/ClassesTable';

export default function EducatorClasses() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <EducatorNavbar />

      <div className="flex-1 flex flex-col items-center justify-center py-8 space-y-12 px-4 sm:px-8 mt-16 sm:mt-32">
        <div className="w-full">
          <StatsGrid />
        </div>

        <div className="w-full">
          <ClassesTable />
        </div>
      </div>
    </div>
  );
}