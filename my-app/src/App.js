import './App.css';
import React from 'react';
import Mainpage from './Mainpage';
import Mainview from './Mainview';
import MainSubPage from './MainSubPage';
import { Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <>
      {/* 내비게이션 링크 추가 */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/Mainview">Main View</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/Mainview" element={<Mainview />} />
        <Route path="/MainSubPage" element={<MainSubPage />} />
      </Routes>
    </>
  );
}

export default App;
