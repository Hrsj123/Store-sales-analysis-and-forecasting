import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import Analysis from './components/Analysis';
import React from 'react';
import GetInput from './components/GetInput';
import * as constants from './constants/routes';

function App() {

  return (
    <Routes>
      <Route 
        path={constants.default.homepageRoute} 
        element={<Layout />}
      >
        <Route 
          index 
          element={<HomePage />} 
        />
        <Route 
          path={constants.default.getInputRoute} 
          element={<GetInput />} 
        />
        <Route 
          path={constants.default.analysisRoute} 
          element={<Analysis />} 
        />        
      </Route>
    </Routes>
  );
}

export default App;
