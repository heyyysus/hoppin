import React from 'react';
import Button from '@mui/material/Button';
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes as Switch, useNavigate } from "react-router-dom";


import Container from '@mui/material/Container';

import Styles from "./App.module.css";
import ButtonAppBar from './components/AppBar';
import { FixedBottomNav } from './components/FixedBottomNav';
import HomePage from './pages/Home';
import LoadingPage from './pages/LoadingPage';
import LandingPage from './pages/LandingPage';
import AccountPage from './pages/Account';
import Profile from './pages/Profile';
import ExplorePage from './pages/Explore';


function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if(isLoading)
  return(
    <LoadingPage />
  );

  else if(!isAuthenticated)
  return (
    <LandingPage />
  );

  return (
    <Container className={Styles.main_container} maxWidth='sm' >
        <Router>
          <Switch>
            <Route path='/' element={<HomePage />} />
            <Route path='/account' element={<AccountPage />} />
            <Route path='/user/:username' element={<Profile />} />
            <Route path='/explore' element={<ExplorePage/>} />
          </Switch>
          <FixedBottomNav />
        </Router>
    </Container>
  );
}

export default App;
