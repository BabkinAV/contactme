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
    }
  }
});

export const {addContact} = dataSlice.actions;

export default dataSlice.reducer;
