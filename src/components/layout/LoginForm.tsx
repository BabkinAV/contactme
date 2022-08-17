import React, { useState } from 'react';
import { Paper, Box, Button, Typography, TextField } from '@mui/material';

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  return (
    <Paper sx={{ maxWidth: '350px', mx: 'auto', p: '25px' }}>
      <form>
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
        {!isLogin && <TextField
          id="repeat-password"
          label="Repeat password"
          variant="standard"
          fullWidth
          sx={{ mb: '30px' }}
        />}
        <Button variant="contained" color="primary" sx={{ mb: '20px' }}>
          {isLogin ? 'Login' : 'Create Account'}
        </Button>
        <Box>
          <Button size="small" sx={{textTransform: 'none'}} onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default LoginForm;
