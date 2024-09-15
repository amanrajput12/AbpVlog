import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import ReactLoading from 'react-loading';
import toast, { Toaster } from 'react-hot-toast';

const Team = () => {
  const userId = Cookies.get('myid');
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch team data
  useEffect(() => {
    async function fetchTeam() {
      try {
        const response = await fetch(`/v1/user/team`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
          }),
        });
        
        const result = await response.json();
        console.log('team data', result);

        if (result.sucess) {
          setTeam(result.data);
         
          
        } else {
          setError(result.message || 'Failed to fetch team data');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching team data:', err);
        setError('Error fetching team data');
        setLoading(false);
      }
    }

    fetchTeam();
  }, []);

  if (loading) {
    return <p className="text-center text-lg font-medium text-gray-700">Loading team data...</p>;
  }

  if (error) {
    return <p className="text-center text-lg font-medium text-red-500 min-h-screen flex justify-center items-center">{error}</p>;
  }

  
  return (
    <div className="flex items-center justify-center min-h-[88vh]">
      <div className="team-container w-full xl:w-[50vw] p-8 bg-gradient-to-b from-neutral-300 to-zinc-950 shadow-orange rounded-lg flex flex-col justify-center items-center xl:h-[60vh]">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Your Team</h2>

        {team && team.length > 0 ? (
          <div className="w-full space-y-4">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 text-center text-lg font-semibold text-gray-700"
              >
                <p>{member}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No team data available</p>
        )}

        {/* Placeholder for any additional animations */}
        <div className="wallet relative w-40 h-24 bg-gray-800 rounded-lg overflow-hidden mt-8">
          <div className="card card1 absolute w-32 h-20 bg-gradient-to-tr from-teal-800 to-neutral-950 rounded-lg transform transition-transform duration-200 ease-in-out animate-slideOut"></div>
          <div className="card card2 absolute w-32 h-20 bg-gradient-to-br from-red-300 to-yellow-950 rounded-lg transform transition-transform duration-200 ease-in-out animate-slideIn"></div>
          <div className="card card3 absolute w-32 h-20 bg-gradient-to-bl from-green-300 to-teal-950 rounded-lg transform transition-transform duration-700 ease-in-out animate-move"></div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Team;
