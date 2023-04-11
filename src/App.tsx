import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Login from './components/login/login';
import Footer from './components/footer/footer';
import TopBar from './components/topbar/topbar';
import List from './components/courses/list';

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar></TopBar>
      <List />
      <br />
      <Footer />
    </Box>
  );
}

export default App;

