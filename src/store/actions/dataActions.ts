import { AppDispatch } from '../store';
import { Contact } from '../../dataModel';
import { setContacts, addContact, deleteContact, editContact } from '../slices/dataSlice';
import { AxiosError, AxiosResponse } from 'axios';

import axios from 'axios';

const uri = 'http://localhost:5000/contacts';

export const fetchContacts = (userId:number) => (dispatch: AppDispatch) => {
  axios
    .get<Contact[]>(`${uri}?userId=${userId}`)
    .then((res) => {
      dispatch(setContacts(res.data));
    })
    .catch((error: string) => {
      console.log(error);
    });
};

export const saveContact = (newContact: Contact) => (dispatch: AppDispatch) => {
  return axios
    .post<Contact>(uri, newContact, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      dispatch(addContact(newContact));
    });
};

export const editContactDb = (updatedContact: Contact) => (dispatch: AppDispatch) => {
  return axios.put<Contact>(`${uri}/${updatedContact.id}`, updatedContact, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((res) => {
    dispatch(editContact(updatedContact));
  });
}

export const removeContact = (contactId: string) => (dispatch: AppDispatch) => {
  axios
    .delete(`${uri}/${contactId}`)
    .then((res: AxiosResponse) => {
      dispatch(deleteContact(contactId));
    })
    .catch((err: AxiosError) => err.message);
};
