import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import {Contact} from '../../dataModel';
import  {contactListArray} from '../../data';

interface contactState {
  contactList: Contact[];
}

const initialState: contactState = {
  contactList: contactListArray,
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
      console.log(action.payload);
      state.contactList.splice(state.contactList.findIndex((el) => el.id === action.payload), 1);
    }
  }
});

const selectContacts = (state:RootState) => state.data.contactList;
const selectContactId = (state:RootState, contactId: string) => contactId;

export const getSingleContactSelector = createSelector([selectContacts, selectContactId], (contactList, contactId) => contactList.find(arrayEl => arrayEl.id === contactId ))

export const {addContact, editContact, deleteContact} = dataSlice.actions;

export default dataSlice.reducer;
