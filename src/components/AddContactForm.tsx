import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

//Redux stuff
import { useAppDispatch } from '../store/hooksStore';
import { addContact } from '../store/slices/dataSlice';

//MUI stuff
import { Paper, Box, Button, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material';

const StyledForm = styled('form')({
  textAlign: 'center',
});


const AddContactForm = () => {
  
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      firstname: {value: string};
      lastname: {value: string};
      phonenumber: {value: string};
      email: {value: string};
    }

    const newId = uuidv4();

    dispatch(addContact({
      id: newId,
      firstName: target.firstname.value,
      lastName: target.lastname.value,
      phoneNumber: target.phonenumber.value,
      email: target.email.value
    }));

    navigate('../list');


  }



  return (
    <Paper sx={{ maxWidth: '350px', mx: 'auto', p: '25px' }}>
      <StyledForm onSubmit={handleFormSubmit}>
        <Typography variant="h6" gutterBottom>
          Please Add New Contact
        </Typography>
        <TextField
          id="firstname"
          label="First Name"
          required
          variant="standard"
          fullWidth
          sx={{ mb: '30px' }}
        />
        <TextField
          id="lastname"
          label="Last Name"
          required
          variant="standard"
          fullWidth
          sx={{ mb: '30px' }}
        />

        <TextField
          id="phonenumber"
          label="Phone Number"
          required
          variant="standard"
          fullWidth
          sx={{ mb: '30px' }}
        />
        <TextField
          id="email"
          label="Email"
          required
          variant="standard"
          fullWidth
          sx={{ mb: '30px' }}
        />
        <Typography variant="body2" sx={{textAlign: 'left', color:"#555", mb: "20px"}}>
          *Required fields
        </Typography>
        <Box sx={{ mb: '20px' }}>
          <Button variant="text" color="primary" type="submit">
            Save
          </Button>
          <Button variant="text" color="error"  onClick={() => {
            navigate('../list', {replace: true})
          }}>
            Cancel
          </Button>
        </Box>
      </StyledForm>
    </Paper>
  );
};

export default AddContactForm;
