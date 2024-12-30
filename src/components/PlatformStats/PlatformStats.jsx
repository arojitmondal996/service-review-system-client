import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';

const PlatformStats = () => {
  const [stats, setStats] = useState({
    users: 0,
    reviews: 0,
    services: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch stats from the backend
    fetch('http://localhost:3000/platform-stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching stats:', error));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Users Count */}
          <div className="bg-blue-100 p-4 rounded shadow text-center">
            <h2 className="text-2xl font-bold text-blue-500">Users</h2>
            <CountUp start={0} end={stats.users} duration={2.5} separator="," className="text-4xl font-bold" />
          </div>

          {/* Reviews Count */}
          <div className="bg-green-100 p-4 rounded shadow text-center">
            <h2 className="text-2xl font-bold text-green-500">Reviews</h2>
            <CountUp start={0} end={stats.reviews} duration={2.5} separator="," className="text-4xl font-bold" />
          </div>

          {/* Services Count */}
          <div className="bg-orange-100 p-4 rounded shadow text-center">
            <h2 className="text-2xl font-bold text-orange-500">Services</h2>
            <CountUp start={0} end={stats.services} duration={2.5} separator="," className="text-4xl font-bold" />
          </div>
        </>
      )}
    </div>
  );
};

export default PlatformStats;
