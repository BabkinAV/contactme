import React from 'react';
//Redux stuff
import { useAppSelector } from '../../store/hooksStore';
//MUI stuff
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ContactCard from '../ContactCard';

const ContactList = () => {
  const contactList = useAppSelector((state)=>state.data.contactList);
  return (
    <Box>
      <Grid container spacing={2} justifyItems="center">
        {contactList.map((singleContact) => (
          <Grid key ={singleContact.id} xs={12} sm={6} md={4} lg={3}>
            <ContactCard id = {singleContact.id} firstName={singleContact.firstName} lastName={singleContact.lastName} phoneNumber={singleContact.phoneNumber} email={singleContact.email}/>
          </Grid>
        ))}
      </Grid>
      <Fab color="primary" aria-label="add" sx={{position: 'fixed', right: '3rem', bottom: '3rem'}}>
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default ContactList;
