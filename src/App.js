import './App.css';
import React from 'react';
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import Customerlist from './components/Customerlist';
import TabApp from './components/TabApp';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            PersonalTrainer
          </Typography>
        </Toolbar>
      </AppBar>
      <TabApp />
    </div>
  );
}

export default App;
