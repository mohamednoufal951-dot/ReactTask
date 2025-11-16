import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Button } from '@mui/material';
import { MdEditNote } from "react-icons/md";
import { Link,useNavigate } from 'react-router-dom';


export const MyTeams = () => {
  const [playersList, setPlayersList] = useState([]);
  const [Team1, setTeam1] = useState([]);
  const [Team2, setTeam2] = useState([]);

  const navigate = useNavigate();

  const localData = JSON.parse(localStorage.getItem('upcomingMatches')) || [];

  
  useEffect(() => {
    const storedTeam1 = JSON.parse(localStorage.getItem('Team1')) || [];
    const storedTeam2 = JSON.parse(localStorage.getItem('Team2')) || [];
    setTeam1(storedTeam1);
    setTeam2(storedTeam2);
  }, []);

  // Fetch players
  useEffect(() => {
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
    fetchPlayers();
  }, []);

  return (
    <div className="pb-10">
      <h1 className="text-[40px] font-bold text-center mt-4">Selected Players</h1>
       
    

      <div className="flex flex-row justify-center gap-4 mt-4">

        <div className="flex flex-col items-center w-[75%]">
         <div className="flex flex-row items-center justify-center gap-2">
             <h2 className="font-bold w-[200px] text-3xl sm:w-[300px] text-center">
                        {localData[0]?.t2_name || 'Team 1'}
              </h2>
        <Button
  variant="contained"
  sx={{ backgroundColor: 'green', minWidth: '50px', padding: '6px',marginLeft:10 }}
  onClick={() => {
    console.log('Edit Team 1 clicked');
    navigate('/pick-players');
  }}
>
  <MdEditNote size={25} />
</Button>
               </div>

          <div className="flex flex-wrap gap-4 justify-center  mt-5">
            {playersList
              .filter((p) => Team1.includes(p.player_id))
              .map((player) => (
                <div
                  key={player.player_id}
                  className="bg-white shadow-lg rounded-xl p-4 w-[300px] hover:shadow-2xl transition-all"
                >
                 <div className="text-sm text-gray-600 text-center">
  {localStorage.getItem("captain") === player.player_id && <p className='text-green-800 text-xl font-bold mb-4'>Captain</p>}
  {localStorage.getItem("vicecaptain") === player.player_id && <p className='text-green-800 text-xl font-bold mb-4'>Vice Captain</p>}
</div>

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
                </div>
              ))}
          </div>
        </div>

        <div className="bg-gray-200 w-[1px]"></div>

        <div className="flex flex-col items-center w-[75%] ">
          <div className="flex flex-row items-center justify-center gap-2">
             <h2 className="font-bold w-[200px] text-3xl sm:w-[300px] text-center">
       {localData[0]?.t1_name || 'Team 1'}
              </h2>
        <Button
  variant="contained"
  sx={{ backgroundColor: 'green', minWidth: '50px', padding: '6px',marginLeft:10 }}
  onClick={() => {
    console.log('Edit Team 1 clicked');
    navigate('/pick-players');

  }}
>
  <MdEditNote size={25} />
</Button>
               </div>
          <div className="flex flex-wrap gap-4 justify-center mt-5">
            {playersList
              .filter((p) => Team2.includes(p.player_id))
             .map((player) => (
          <div
            key={player.player_id}
            className="bg-white shadow-lg rounded-xl p-4 w-[300px] hover:shadow-2xl transition-all"
            >

                   <div className="text-sm text-gray-600 text-center">
  {localStorage.getItem("Team2Captain") === player.player_id && <p className='text-green-800 text-xl font-bold mb-4'>Captain</p>}
  {localStorage.getItem("Team2vicecaptain") === player.player_id && <p className='text-green-800 text-xl font-bold mb-4'>Vice Captain</p>}
</div>
                  
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
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
