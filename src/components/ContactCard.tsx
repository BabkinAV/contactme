import React from 'react';

//MUI stuff
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {Contact} from '../dataModel'


import blankImage from '../assets/img/no-avatar.png';


const ContactCard = ({ firstName, lastName, phoneNumber, email} : Contact) => {
  return (
    <Card sx={{ maxWidth: 300, color: '#00b0ff', marginLeft: {xs: 'auto', lg: 'unset'}, marginRight: {xs: 'auto', lg: 'unset'} }}>
    <CardMedia
      component="img"
      height="210"
      image={blankImage}
      alt="user pic"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {`${firstName} ${lastName}`}
      </Typography>
      <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PhoneIcon sx={{color:'#fff'}}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={phoneNumber} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <EmailOutlinedIcon sx={{color:'#fff'}}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={email}  />
      </ListItem>
      </List>
    </CardContent>
    <CardActions>
      <Button size="small" startIcon={<EditIcon />}>Edit</Button>
      <Button size="small" color="error" startIcon={<DeleteIcon />}>Delete</Button>
    </CardActions>
  </Card>
  )
}

export default ContactCard