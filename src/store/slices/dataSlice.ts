import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import { Contact } from '../../dataModel';

interface contactState {
  contactList: Contact[];
  filter: string;
}

const initialState: contactState = {
  contactList: [],
  filter: '',
};

export const dataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    setContacts: (state, action:PayloadAction<Contact[]>) => {
      state.contactList = action.payload
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contactList.push(action.payload);
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      const elementIndex = state.contactList.findIndex(
        (arrEl) => arrEl.id === action.payload.id
      );
      state.contactList[elementIndex] = action.payload;
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contactList.splice(
        state.contactList.findIndex((el) => el.id === action.payload),
        1
      );
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },

});

const selectContacts = (state: RootState) => state.data.contactList;

const selectFilter = (state: RootState) => state.data.filter;

const selectContactId = (state: RootState, contactId: string) => contactId;

const getSortedContactsSelector = createSelector([selectContacts], (contactList) => {return contactList.slice(0).sort((a, b) => a.lastName.localeCompare(b.lastName));})

export const getFilteredContactsSelector = createSelector(
  [getSortedContactsSelector, selectFilter],
  (sortedContactList, filter) => {
    if (filter === '') {
      return sortedContactList;
    } else {
      const regex = new RegExp(filter, 'i');
      const newContactsArray = sortedContactList.filter(
        (el) =>
          regex.test(el.firstName) ||
          regex.test(el.lastName) ||
          regex.test(el.phoneNumber) ||
          regex.test(el.email)
      );
      return newContactsArray;
    }
  }
);

export const getSingleContactSelector = createSelector(
  [selectContacts, selectContactId],
  (contactList, contactId) =>
    contactList.find((arrayEl) => arrayEl.id === contactId)
);

export const { addContact, editContact, deleteContact, setFilter, setContacts } =
  dataSlice.actions;

export default dataSlice.reducer;
