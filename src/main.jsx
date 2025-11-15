import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";  // ✅ Must import Tailwind styles
import { BrowserRouter } from "react-router-dom";
import { TopTabBar } from "./components/TopTabBar.jsx";

const tabs = [
  { key: 'upcoming', label: 'Upcoming Matches' },
  { key: 'pick', label: 'Pick Players' },
  { key: 'teams', label: 'My Teams' },
  { key: 'captain', label: 'Pick Captain' },
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
   <TopTabBar tabs={tabs}/>  
    <App />
  </BrowserRouter>
);
