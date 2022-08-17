import React from 'react';
import './App.css';
import ContactList from './components/layout/ContactList';
import LoginForm from './components/layout/LoginForm';
import Header from './components/layout/Header';

import { Container } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Header />
      <Container sx={{mt: 4}}>
        {/* <ContactList /> */}
        <LoginForm />
      </Container>
    </div>
  );
}

export default App;
