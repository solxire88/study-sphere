import React from 'react';
import { Card } from '@heroui/react';
import { BookOpenText, Drama, Star } from 'lucide-react';

const StatsCard = ({ title, subtitle, value, iconClass }) => {
  const getIcon = (iconClass) => {
    switch (iconClass) {
      case 'BookOpenText':
        return <BookOpenText className="w-8 h-8 text-cyan-400" />;
      case 'Drama':
        return <Drama className="w-8 h-8 text-cyan-400" />;
      case 'Star':
        return <Star className="w-8 h-8 text-cyan-400" />;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-navy-900 border border-navy-800 rounded-lg p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-400 text-md font-medium">{title}</h3>
          <p className="text-white text-4xl font-bold mt-2">{value}</p>
        </div>
        <div className="bg-navy-800 p-3 rounded-lg">
          {getIcon(iconClass)}
        </div>
      </div>
      <p className="text-gray-400 text-sm">{subtitle}</p>
    </Card>
  );
};

export default StatsCard;
