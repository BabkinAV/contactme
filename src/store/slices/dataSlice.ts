import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import {Contact} from '../../dataModel';
import  {contactListArray} from '../../data';

interface contactState {
  contactList: Contact[];
  filter: string
}

const initialState: contactState = {
  contactList: contactListArray,
  filter: ''
};

export const dataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>)=> {
      state.contactList.push(action.payload)
    },
    editContact: (state,action:PayloadAction<Contact> ) => {
      const elementIndex = state.contactList.findIndex((arrEl => arrEl.id === action.payload.id));
      state.contactList[elementIndex] = action.payload;
    },
    deleteContact: (state, action:PayloadAction<string>) => {
      state.contactList.splice(state.contactList.findIndex((el) => el.id === action.payload), 1);
    },
    setFilter: (state, action:PayloadAction<string>) => {
      state.filter = action.payload;
    }
  }
});

const selectContacts = (state:RootState) => 

{
  let sortedArr = [...state.data.contactList];
  
  sortedArr.sort((a, b) => a.lastName.localeCompare(b.lastName));
  
  return sortedArr};
const selectFilter = (state:RootState) => state.data.filter;

const selectContactId = (state:RootState, contactId: string) => contactId;

export const getFilteredContactsSelector = createSelector([selectContacts, selectFilter], (contactList, filter) => {
  if (filter === '') {
    return contactList;
  } else {
    const regex = new RegExp(filter, "i");
    const newContactsArray = contactList.filter(el => regex.test(el.firstName) || regex.test(el.lastName) || regex.test(el.phoneNumber) || regex.test(el.email));
    return newContactsArray;
  }
})

export const getSingleContactSelector = createSelector([selectContacts, selectContactId], (contactList, contactId) => contactList.find(arrayEl => arrayEl.id === contactId ))

export const {addContact, editContact, deleteContact, setFilter} = dataSlice.actions;

export default dataSlice.reducer;
