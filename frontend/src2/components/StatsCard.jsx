import React from 'react';
import { Card } from '@heroui/react';
import { BookOpenText, GraduationCap, Drama, Star } from 'lucide-react';

const StatsCard = ({ title, subtitle, value, iconClass }) => {
  const getIcon = (iconClass) => {
    switch (iconClass) {
      case "BookOpenText":
        return <BookOpenText className="w-12 h-12 text-[#A6E1FA]" />;
      case "GraduationCap":
        return <GraduationCap className="w-12 h-12 text-[#A6E1FA]" />;
      case "Drama":
        return <Drama className="w-12 h-12 text-[#A6E1FA]" />;
      case "Star":
        return <Star className="w-12 h-12 text-[#A6E1FA]" />;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-transparent border border-navy-800 rounded-lg p-6 flex flex-col h-[160px] transition-transform transform hover:scale-105 hover:shadow-[0_0_15px_#004493]">
      <div className="flex justify-between items-start">
        <h3 className="text-4xl font-bold text-[#A6E1FA]">{title}</h3>
        <div className="text-[#A6E1FA]">
          {getIcon(iconClass)}
        </div>
      </div>

      <div className="mt-auto flex justify-end items-end">
        <span className="text-5xl font-bold text-white w-full text-right">{value}</span>
      </div>
    </Card>
  );
};

export default StatsCard;