import React, { Fragment, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

//Redux stuff
import { useAppDispatch, useAppSelector } from '../store/hooksStore';
import { selectUserId } from '../store/slices/uiSlice';
import { getSingleContactSelector } from '../store/slices/dataSlice';
import { editContactDb } from '../store/actions/dataActions';

//MUI stuff
import { Paper, Box, Button, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material';

const StyledForm = styled('form')({
  textAlign: 'center',
});

const EditContactForm = () => {
  let params = useParams<'contactId'>();

  const [errorMessage, setErrorMessage] = useState('');

  const contact = useAppSelector((state) =>
    getSingleContactSelector(state, params.contactId!)
  );

  const userId = useAppSelector(selectUserId);

  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      firstname: { value: string };
      lastname: { value: string };
      phonenumber: { value: string };
      email: { value: string };
    };

    if (contact) {
      dispatch(
        editContactDb({
          id: contact.id,
          firstName: target.firstname.value,
          lastName: target.lastname.value,
          phoneNumber: target.phonenumber.value,
          email: target.email.value,
          userId: userId!
        })
      )
        .then((data) => {
          navigate('../list');
        })
        .catch((error: AxiosError) => {
          setErrorMessage(error.message);
          setTimeout(() => {
            setErrorMessage('');
          }, 5000);
        });
    }
  };

  return (
    <Fragment>
      {contact ? (
        <Paper sx={{ maxWidth: '350px', mx: 'auto', p: '25px' }}>
          <StyledForm onSubmit={handleFormSubmit}>
            <Typography variant="h6" gutterBottom>
              Please Edit Contact
            </Typography>
            <TextField
              id="firstname"
              label="First Name"
              defaultValue={contact.firstName}
              required
              variant="standard"
              fullWidth
              sx={{ mb: '30px' }}
            />
            <TextField
              id="lastname"
              label="Last Name"
              defaultValue={contact.lastName}
              required
              variant="standard"
              fullWidth
              sx={{ mb: '30px' }}
            />

            <TextField
              id="phonenumber"
              label="Phone Number"
              defaultValue={contact.phoneNumber}
              required
              variant="standard"
              fullWidth
              sx={{ mb: '30px' }}
            />
            <TextField
              id="email"
              label="Email"
              defaultValue={contact.email}
              required
              variant="standard"
              fullWidth
              sx={{ mb: '30px' }}
            />
            <Typography
              variant="body2"
              sx={{ textAlign: 'left', color: '#555', mb: '20px' }}
            >
              *Required fields
            </Typography>
            {errorMessage && (
              <Typography color="red">{errorMessage}</Typography>
            )}
            <Box sx={{ mb: '20px' }}>
              <Button variant="text" color="primary" type="submit">
                Save
              </Button>
              <Button
                variant="text"
                color="error"
                onClick={() => {
                  navigate('../list', { replace: true });
                }}
              >
                Cancel
              </Button>
            </Box>
          </StyledForm>
        </Paper>
      ) : (
        <h3>No element to edit</h3>
      )}
    </Fragment>
  );
};

export default EditContactForm;
