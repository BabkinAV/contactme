import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import jwt_decode, {JwtPayload} from 'jwt-decode';


//Redux stuff
import { useAppDispatch } from './store/hooksStore';
import { setAuthenticated } from './store/slices/uiSlice';
import { setUserId } from './store/slices/uiSlice';
import { logoutAction } from './store/actions/uiActions';

import ContactList from './components/layout/ContactList';
import LoginForm from './components/layout/LoginForm';
import Header from './components/layout/Header';

import { Container } from '@mui/material';
import AddContactForm from './components/AddContactForm';
import EditContactForm from './components/EditContactForm';
import { store } from './store/store';



function App() {

  const dispatch = useAppDispatch();



  const token = localStorage.IdToken;
if (token) {
  const decodedToken = jwt_decode<JwtPayload>(token);
  if (decodedToken.exp! * 1000 < Date.now()) {
    
    dispatch(logoutAction());
    window.location.href = '/login';
    // authenticated = false;
  } else {
    const userId = parseInt(decodedToken.sub!);
    dispatch(setAuthenticated(true));
    dispatch(setUserId(userId));
    // authenticated = true;
  }
}

  return (
    <div className="App">
      <Header />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route index element={<LoginForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route element={<ProtectedRoute />}>
            <Route path="list" element={<ContactList />} />
            <Route path="add" element={<AddContactForm />} />
            <Route path="edit/:contactId" element={<EditContactForm />} />
          </Route>
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
