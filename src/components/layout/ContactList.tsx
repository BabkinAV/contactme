import React from 'react';
//MUI stuff
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';

import {Contact} from '../../dataModel'

import { contactListArray } from '../../data';
import ContactCard from '../ContactCard';

const ContactList = () => {
  let contactList:Contact[] = contactListArray;
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
