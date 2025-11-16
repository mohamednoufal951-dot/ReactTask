import React, { useEffect,useState } from 'react';
import '../css/HomeScreen.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios';


export const HomeScreen = () => {
  const [upcomingMatches, setUpcomingMatches] = useState([]);

  useEffect(() => {
    fetchUpcomingMatches();
  }, []);

  const fetchUpcomingMatches=async()=>{

    const response=await axios.get('https://leaguex.s3.ap-south-1.amazonaws.com/task/fantasy-sports/Get_All_upcoming_Matches.json')
    const data=response?.data?.matches?.cricket;
    console.log("cnanka",data);
    setUpcomingMatches(data);
    localStorage.setItem('upcomingMatches', JSON.stringify(data));
  }

const getDateAndTime = (isDate) => {
  const dateObj = new Date(isDate);
  const istTime = new Date(dateObj.getTime() + (5.5 * 60 * 60 * 1000));

  const day = istTime.getDate();
  const monthName = istTime.toLocaleString("en-US", { month: "long" });
  const year = istTime.getFullYear();

  const hours = String(istTime.getHours()).padStart(2, "0");
  const minutes = String(istTime.getMinutes()).padStart(2, "0");
  const timeIST = `${hours}:${minutes}`;

  console.log(`${day} ${monthName} ${year} ${timeIST}`);

  return `${day} ${monthName} ${year} ${timeIST}`;
};


  return (
    <div className='HomeHeader'>


    <div className="flex flex-wrap justify-center mt-5 bg-gray-100 gap-6 p-6 min-h-screen ">
      {upcomingMatches.map((item) => (
        <Link to={`/pick-players`} key={item.id}>
        <div
          key={item.id}
          className="shadow-lg hover:shadow-2xl transition-all duration-300 p-4 bg-yellow-100 rounded-xl w-full sm:w-[300px] md:w-[350px] h-[auto] lg:w-[400px] h-[220px] flex flex-col items-center justify-between"
        >
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
            {item.event_name}
          </h1>

           <h4 className="text-2xl font-bold text-center text-gray-800 mb-3 w-[200px] ">
            {getDateAndTime(item.match_date)}
          </h4>

          <div className="flex items-center justify-between w-full px-6">
            <div className=''>
                     <img
                        src={item.t1_image}
                        alt={item.team1}
                        className="w-30 h-30 rounded-full object-cover"
                      />
                 <h3 className='text-lg font-semibold text-gray-800 text-center mt-2'>{item.t1_name}</h3>
            </div>
            <h2 className="text-md font-semibold text-gray-800 ml-4">VS</h2>
             <div className=''>
                     <img
                        src={item.t2_image}
                        alt={item.team1}
                        className="w-30 h-30 rounded-full object-cover"
                      />
                 <h3 className='text-lg font-semibold text-gray-800 text-center mt-2'>{item.t2_name}</h3>
            </div>
          </div>
           <div className='bg-red-500 p-2 rounded-lg mt-3  font-semibold '>
             <h3 className='text-white p-1 text-md'>{item.match_status}</h3>
          </div>

        </div>
        </Link>
      ))}
    </div>

    </div>
  );
};
