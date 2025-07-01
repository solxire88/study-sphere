import React, { useEffect, useState } from 'react';
import StatsCard from './StatsCard';
import axios from 'axios';
import { ACCESS_TOKEN, USER_ID } from '../constants';

const StatsGrid = ({ classesCount }) => {
  const [statsData, setStatsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem(ACCESS_TOKEN);
  const educatorId = localStorage.getItem(USER_ID);
  console.log(USER_ID);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch average rating
        const ratingRes = await axios.get(
          `http://127.0.0.1:8000/stats/educator/${educatorId}/average/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Fetch average sentiment
        const sentimentRes = await axios.get(
          `http://127.0.0.1:8000/stats/educator/${educatorId}/sentiment/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setStatsData([
          {
            title: 'Total Classes',
            subtitle: 'Your Classes',
            value: classesCount.toString(),
            icon: 'BookOpenText',
          },
          {
            title: 'Average Rating',
            subtitle: 'Student Feedback',
            value: ratingRes.data.average?.toFixed(1) || 'N/A',
            icon: 'Star',
          },
          {
            title: 'Overall Sentiment',
            subtitle: 'Student Sentiment',
            value: sentimentRes.data.average !== null
              ? `${(sentimentRes.data.average * 100).toFixed(0)}%`
              : 'N/A',
            icon: 'Drama',
          },
        ]);
      } catch (err) {
        console.error(err);
        setError(err.response?.statusText || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [classesCount, educatorId, token]);

  if (loading) return <p className="text-white p-4">Loading stats…</p>;
  if (error) return <p className="text-red-400 p-4">Error: {error}</p>;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-4 w-4 rounded-full bg-cyan-400" />
        <h2 className="text-white text-xl font-bold">Performance Metrics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statsData.map((stat, idx) => (
          <StatsCard
            key={idx}
            title={stat.title}
            subtitle={stat.subtitle}
            value={stat.value}
            iconClass={stat.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default StatsGrid;
