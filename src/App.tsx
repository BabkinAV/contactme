import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
//Redux stuff
import { useAppDispatch, useAppSelector } from './store/hooksStore';

import ContactList from './components/layout/ContactList';
import LoginForm from './components/layout/LoginForm';
import Header from './components/layout/Header';

import { Container } from '@mui/material';
import ContactForm from './components/ContactForm';

function App() {
  const isAuthenticated = useAppSelector((state) => state.ui.isAuthenticated);
  return (
    <div className="App">
      <Header />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route index element={<LoginForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route element={<ProtectedRoute />}>
            <Route path="list" element={<ContactList />} />
            <Route path="add" element={<ContactForm add/>} />
            <Route path="edit/:contactId" element={<ContactForm />} />
          </Route>
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
