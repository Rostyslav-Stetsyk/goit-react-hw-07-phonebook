import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const contactSlice = createSlice({
  name: 'contact',
  initialState: { list: [] },
  reducers: {
    addContact: {
      reducer(state, action) {
        state.list.push(action.payload);
      },
      prepare(contact) {
        return {
          payload: {
            ...contact,
            id: 'id' + nanoid(3),
          },
        };
      },
    },
    deleteContact(state, action) {
      const idx = state.list.findIndex(el => el.id === action.payload);
      state.list.splice(idx, 1);
    },
  },
});

export const { addContact, deleteContact } = contactSlice.actions;
export const contactsReducer = contactSlice.reducer;
