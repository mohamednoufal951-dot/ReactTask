import { Routes, Route } from 'react-router-dom';
import {HomeScreen} from './Screens/HomeScreen';
import {PickPlayers} from './components/PickPlayers';
import {MyTeams} from './components/MyTeams';
import {PickCaptain} from './components/PickCaptain';

function App() {
  return (
    
    <Routes>
      
      <Route path="/" element={<HomeScreen />} />
       <Route path="/pick-players" element={<PickPlayers />} />
        <Route path="/my-teams" element={<MyTeams />} />
        <Route path="/pick-captain" element={<PickCaptain />} />
      
    </Routes>
  );
}

export default App;