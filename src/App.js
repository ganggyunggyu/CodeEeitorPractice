/** @format */

import { Route, Routes } from 'react-router-dom';
import './App.css';
import React, { useState } from 'react';
import JavaEditor from './components/JavaEditor';
import LeftBar from './components/LeftBar';

function App() {
  return (
    <div className='flex'>
      <Routes>
        <Route path='' element={<LeftBar />}></Route>
        <Route path={`/:fileId`} element={<JavaEditor />}></Route>
      </Routes>
    </div>
  );
}

export default App;
