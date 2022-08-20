import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Redux stuff
import { useAppDispatch } from '../../store/hooksStore';
import { setAuthenticated } from '../../store/slices/uiSlice';

//MUI stuff
import { Paper, Box, Button, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material';

const StyledForm = styled('form')({
  textAlign: 'center',
});

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }
  let navigate = useNavigate();

  return (
    <Paper sx={{ maxWidth: '350px', mx: 'auto', p: '25px' }}>
      <StyledForm>
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
        {!isLogin && (
          <TextField
            id="repeat-password"
            label="Repeat password"
            variant="standard"
            fullWidth
            sx={{ mb: '30px' }}
          />
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: '20px' }}
          onClick={() => {
            dispatch(setAuthenticated(true));
            navigate('../list');
          }}
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
