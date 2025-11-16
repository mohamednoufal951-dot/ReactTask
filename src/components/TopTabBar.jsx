import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";
import CustomButton from './CustomButton';
import { RxAvatar } from "react-icons/rx";


const tabs = [
  { to: '/', label: 'Upcoming' },
  // { to: '/pick-players', label: 'Pick Players' },
  { to: '/my-teams', label: 'My Teams' },
  { to: '/pick-captain', label: 'Pick Captain' },
];


export const TopTabBar = () => {
  return (
    <nav className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 p-5 text-white text-center rounded-b-lg">
      

      <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-5 gap-4 sm:gap-0">
        

        <div className="flex flex-row items-center gap-3">
          <RxAvatar size={50} color='#000'/>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left">
            MOHAMED NOUFAL
          </h2>
        </div>


        <div className="flex flex-row items-center gap-4">
          <div className="text-center sm:text-right">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">Rs.12,017</h2>
            <h2 className="text-sm text-gray-600">Balance</h2>
          </div>

          <CustomButton
            label={<IoMdAdd size={25} className="text-black" />}
            bgColor="white"
            hoverColor="#e5e7eb"
            onClick={() => alert("Item Added!")}
          />
        </div>
      </div>

      <div className="w-full border-t border-gray-300">
        <div className="flex gap-2 overflow-x-auto whitespace-nowrap px-3 sm:px-5 py-2 sm:justify-center">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-md font-medium text-sm sm:text-base transition-colors 
                 ${
                   isActive
                     ? 'bg-orange-100 text-orange-700'
                     : 'text-gray-700 hover:bg-gray-100'
                 }`
              }
            >
              {t.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
