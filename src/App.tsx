import React from 'react';
//Redux stuff
import { useAppDispatch, useAppSelector } from './store/hooksStore';


import ContactList from './components/layout/ContactList';
import LoginForm from './components/layout/LoginForm';
import Header from './components/layout/Header';

import { Container } from '@mui/material';

function App() {
  const isAuthenticated = useAppSelector((state)  => state.ui.isAuthenticated);
  return (
    <div className="App">
      <Header />
      <Container sx={{ mt: 4 }}>
        {isAuthenticated ? <ContactList /> : <LoginForm />}
      </Container>
    </div>
  );
}

export default App;
