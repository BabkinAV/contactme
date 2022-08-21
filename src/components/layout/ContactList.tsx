import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
//Redux stuff
import { useAppSelector, useAppDispatch} from '../../store/hooksStore';
import { selectUserId } from '../../store/slices/uiSlice';
import { getFilteredContactsSelector } from '../../store/slices/dataSlice';
import { fetchContacts } from '../../store/actions/dataActions';
//MUI stuff
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ContactCard from '../ContactCard';

const ContactList = () => {
  const contactList = useAppSelector(getFilteredContactsSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const userId = useAppSelector(selectUserId);



  useEffect(() => {
    dispatch(fetchContacts(userId!))
  
    
  }, [dispatch, userId])
  

  return (
    <Box>
        {(contactList.length > 0) ? <Grid container spacing={2} justifyItems="center">
          {contactList.map((singleContact) => (
            <Grid key={singleContact.id} xs={12} sm={6} md={4} lg={3}>
              <ContactCard
                id={singleContact.id}
                firstName={singleContact.firstName}
                lastName={singleContact.lastName}
                phoneNumber={singleContact.phoneNumber}
                email={singleContact.email}
                userId={singleContact.userId}
              />
            </Grid>
          ))}
        </Grid> : <p>No contacts found</p>}
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'fixed', right: '3rem', bottom: '3rem' }}
          onClick={() => navigate('../add')}
        >
          <AddIcon />
        </Fab>
    </Box>
  );
};

export default ContactList;
