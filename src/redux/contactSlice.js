import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

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

const persistConfig = {
  key: 'contacts',
  storage,
};

export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactSlice.reducer
);
export const { addContact, deleteContact } = contactSlice.actions;
