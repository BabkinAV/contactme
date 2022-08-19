import React from 'react';
//Redux stuff
import { useAppSelector } from '../../store/hooksStore';
//MUI stuff
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
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
    </Box>
  );
};

export default ContactList;
