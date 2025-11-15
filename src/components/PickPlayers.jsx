import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert } from '@mui/material';

export const PickPlayers = () => {
  const [playersList, setPlayersList] = useState([]);
  
  // Initialize from localStorage or default to empty array
  const [Team1, setTeam1] = useState(() => {
    return JSON.parse(localStorage.getItem('Team1')) || [];
  });
  const [Team2, setTeam2] = useState(() => {
    return JSON.parse(localStorage.getItem('Team2')) || [];
  });

  const localData = JSON.parse(localStorage.getItem('upcomingMatches')) || [];

  // Fetch players once
  useEffect(() => {
    fetchPlayers();
  }, []);

  // Update localStorage whenever teams change
  useEffect(() => {
    localStorage.setItem('Team1', JSON.stringify(Team1));
    console.log("Team1",Team1);
  }, [Team1]);

  useEffect(() => {
    localStorage.setItem('Team2', JSON.stringify(Team2));
    console.log("Team2",Team2);
  }, [Team2]);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(
        'https://leaguex.s3.ap-south-1.amazonaws.com/task/fantasy-sports/Get_All_Players_of_match.json'
      );
      setPlayersList(response.data);
    } catch (error) {
      console.log(error);
      Alert(error);
    }
  };

  return (
    <div>
      <h1 className="text-[40px] font-bold text-center mt-4">Players List</h1>

      <div className="flex flex-row justify-center gap-4 mt-4">
        {/* Team 1 */}
        <div className="flex flex-col items-center">
          <h2 className='font-bold w-[200px] text-3xl sm:w-[300px] text-center'>{localData[0]?.t2_name}</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {playersList
              .filter((p) => p.team_name === 'Perth Scorchers')
              .map((player) => (
                <div
                  key={player.player_id}
                  className="bg-white shadow-lg rounded-xl p-4 w-[300px] hover:shadow-2xl transition-all"
                >
                  <input
                    type="checkbox"
                    value={player.player_id}
                    checked={Team1.includes(player.player_id)}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (Team1.includes(value)) {
                        setTeam1(Team1.filter((id) => id !== value));
                      } else {
                        setTeam1([...Team1, value]);
                      }
                    }}
                    className="float-right"
                  />
                  <div className="flex justify-center mb-3">
                    <img
                      src={player.team_logo}
                      alt={player.team_short_name}
                      className="w-16 h-16 rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 text-center">{player.name}</h3>
                  <p className="text-sm text-gray-600 text-center">
                    {player.role} • {player.country}
                  </p>
                  <p className="text-md font-semibold text-blue-700 text-center mt-1">
                    {player.team_name} ({player.team_short_name})
                  </p>
                  <div className="flex justify-between mt-4 px-2">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Points</p>
                      <p className="font-bold text-gray-800">{player.event_total_points}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Credit</p>
                      <p className="font-bold text-gray-800">{player.event_player_credit}</p>
                    </div>
                  </div>
                  <p
                    className={`mt-4 font-semibold text-center ${
                      player.is_playing ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {player.is_playing ? '✔ Playing' : '✖ Not Playing'}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Divider */}
       <div className="bg-gray-200 w-[1px]"></div>

        {/* Team 2 */}
        <div className="flex flex-col items-center">
          <h2 className='font-bold w-[200px] text-3xl sm:w-[300px] text-center'>{localData[0]?.t1_name}</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {playersList
              .filter((p) => p.team_name === 'Melbourne Stars')
              .map((player) => (
                <div
                  key={player.player_id}
                  className="bg-white shadow-lg rounded-xl p-4 w-[300px] hover:shadow-2xl transition-all"
                >
                  <input
                    type="checkbox"
                    value={player.player_id}
                    checked={Team2.includes(player.player_id)}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (Team2.includes(value)) {
                        setTeam2(Team2.filter((id) => id !== value));
                      } else {
                        setTeam2([...Team2, value]);
                      }
                    }}
                    className="float-right"
                  />
                  <div className="flex justify-center mb-3">
                    <img
                      src={player.team_logo}
                      alt={player.team_short_name}
                      className="w-16 h-16 rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 text-center">{player.name}</h3>
                  <p className="text-sm text-gray-600 text-center">
                    {player.role} • {player.country}
                  </p>
                  <p className="text-md font-semibold text-blue-700 text-center mt-1">
                    {player.team_name} ({player.team_short_name})
                  </p>
                  <div className="flex justify-between mt-4 px-2">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Points</p>
                      <p className="font-bold text-gray-800">{player.event_total_points}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Credit</p>
                      <p className="font-bold text-gray-800">{player.event_player_credit}</p>
                    </div>
                  </div>
                  <p
                    className={`mt-4 font-semibold text-center ${
                      player.is_playing ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {player.is_playing ? '✔ Playing' : '✖ Not Playing'}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
