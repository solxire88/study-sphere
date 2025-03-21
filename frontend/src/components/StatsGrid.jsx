import React, { useState } from 'react';
import StatsCard from './StatsCard';

const StatsGrid = () => {
  const [statsData] = useState([
    { title: "Total Classes", subtitle: "Your Classes", value: "4", iconClass: "BookOpenText" },
    { title: "Students", subtitle: "Enrolled Students", value: "9", iconClass: "GraduationCap" },
    { title: "Sentiment Analysis", subtitle: "Overall Sentiment", value: "1.3", iconClass: "Drama" },
    { title: "Average Rating", subtitle: "Student Feedback", value: "4", iconClass: "Star" },
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          subtitle={stat.subtitle}
          value={stat.value}
          iconClass={stat.iconClass}
        />
      ))}
    </div>
  );
};

export default StatsGrid;