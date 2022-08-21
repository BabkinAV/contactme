import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';

//Redux stuff
import { useAppDispatch } from '../../store/hooksStore';
import { loginAction, registerAction } from '../../store/actions/uiActions';

//MUI stuff
import { Paper, Box, Button, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material';

const StyledForm = styled('form')({
  textAlign: 'center',
});

const LoginForm = () => {

  const dispatch = useAppDispatch();

  const [isLogin, setIsLogin] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }
  let navigate = useNavigate();

  const handleFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };

    }

    if (isLogin) {
      dispatch(
        loginAction({
          email: target.email.value,
          password: target.password.value
        })
      )
        .then((data) => {
          navigate('../list');
        })
        .catch((error: AxiosError<string>) => {
          console.log(error);
          setErrorMessage(error.response!.data);
          setTimeout(() => {
            setErrorMessage('');
          }, 5000);
        });
    } else {
      dispatch(
        registerAction({
          email: target.email.value,
          password: target.password.value
        })
      )
        .then((data) => {
          navigate('../list');
        })
        .catch((error: AxiosError<string>) => {
          console.log(error);
          setErrorMessage(error.response!.data);
          setTimeout(() => {
            setErrorMessage('');
          }, 5000);
        });
    }

    


   
  };


  return (
    <Paper sx={{ maxWidth: '350px', mx: 'auto', p: '25px' }}>
      <StyledForm onSubmit={handleFormSubmit}>
        <Typography variant="h6" gutterBottom>
          Please {isLogin ? 'Log In' : 'Sign Up'}
        </Typography>
        <TextField
          id="email"
          label="email"
          variant="standard"
          fullWidth
          sx={{ mb: '30px' }}
        />
        <TextField
          id="password"
          label="password"
          variant="standard"
          fullWidth
          sx={{ mb: '30px' }}
        />
        {errorMessage && <Typography color="red">{errorMessage}</Typography>}
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: '20px' }}
          type="submit"
        >
          {isLogin ? 'Login' : 'Create Account'}
        </Button>
        <Box>
          <Button
            size="small"
            sx={{ textTransform: 'none' }}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </Button>
        </Box>
      </StyledForm>
    </Paper>
  );
};

export default LoginForm;
