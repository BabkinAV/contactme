import React from 'react';
import { useNavigate } from 'react-router-dom';

//Redux stuff
import { useAppDispatch } from '../store/hooksStore';
import { deleteContact } from '../store/slices/dataSlice';

//MUI stuff
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Contact } from '../dataModel';

const ContactCard = ({
  id,
  firstName,
  lastName,
  phoneNumber,
  email,
}: Contact) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        maxWidth: 300,
        color: '#00b0ff',
        marginLeft: { xs: 'auto', lg: 'unset' },
        marginRight: { xs: 'auto', lg: 'unset' },
      }}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ textAlign: 'center' }}
        >
          {`${firstName} ${lastName}`}
        </Typography>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PhoneIcon sx={{ color: '#fff' }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={phoneNumber}
              sx={{ '& span': { fontSize: '14px' } }}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <EmailOutlinedIcon sx={{ color: '#fff' }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={email}
              sx={{ '& span': { fontSize: '14px' } }}
            />
          </ListItem>
        </List>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/edit/${id}`)}
        >
          Edit
        </Button>
        <Button
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => {
            dispatch(deleteContact(id));
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default ContactCard;
