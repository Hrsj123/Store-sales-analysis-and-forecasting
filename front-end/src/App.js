import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import * as constants from './constants/routes';
// Views
import HomePage from './views/HomePage';
import StoreInput from './views/StoreInput';
import GetInput from './views/GetInput';
import Analysis from './views/Analysis';
import Inventory from './views/Inventory';
import Predict from './views/Predict';

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
          path={constants.default.addEntryRoute} 
          element={<StoreInput />} 
        />
        <Route 
          path={constants.default.getInputRoute} 
          element={<GetInput />} 
        />
        <Route 
          path={constants.default.analysisRoute} 
          element={<Analysis />} 
        />        
        <Route 
          path={constants.default.InventoryRoute} 
          element={<Inventory />} 
        />        
        <Route 
          path={constants.default.predictRoute} 
          element={<Predict />} 
        />        
      </Route>
    </Routes>
  );
}

export default App;
