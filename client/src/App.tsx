import React from 'react';
import logo from './logo.svg';
import './App.css';
import Player from './Classes/Player';
import Home from './components/Home';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'; 
import GamesPage from './components/GamesPage';
import PlayersPage from './components/PlayersPage';
import TournamentsPage from './components/TournamentsPage';
import MapsPage from './components/MapsPage';
import PlayerPage from './components/PlayerPage';
import GamePage from './components/GamePage';
import TournamentPage from './components/TournamentPage';
import MapPage from './components/MapPage';


function App() {
  return (
    <div className="App">
   
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/games' element={<GamesPage/>}/>
        <Route path='/players' element={<PlayersPage/>}/>
        <Route path='/tournaments' element={<TournamentsPage/>}/>
        <Route path='/maps' element={<MapsPage/>}/>
        <Route path='/map/:mapName' element={<MapPage/>}/>
        <Route path='/player/:id' element={<PlayerPage/>}/>
        <Route path='/game/:tournament/:gamenum' element={<GamePage/>}/>
        <Route path='/tournament/:tournament' element={<TournamentPage/>}/>




      </Routes>
      </BrowserRouter>
      <Outlet />
    </div>
  );
}

export default App;
