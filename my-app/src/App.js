import './App.css';
import React from 'react';
import Mainpage from './Mainpage';
import { Provider } from 'react-redux';
import store from './store'; // 스토어 경로 확인
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function App() {
  return (
    <Provider store={store}>
    <Router>
    <Routes>
      <Route path="/" element={<Mainpage/>} />
    </Routes>
  </Router>
  </Provider>
  );
}

export default App;
