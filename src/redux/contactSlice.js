import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { fetchContacts, addContact, deleteContact } from 'redux/api';

const rejected = (state, action) => {
  state.error = action.payload;
  state.isLoading = false;
};

const loading = state => {
  state.isLoading = true;
};

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchContacts.rejected, rejected)
      .addCase(fetchContacts.pending, loading)
      .addCase(addContact.fulfilled, (state, action) => {
        state.list.push(action.payload);
        toast.success(
          `Contact '${action.payload.name}' with phonenumber '${action.payload.phone}' successfully added`
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addContact.rejected, rejected)
      .addCase(addContact.pending, loading)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.list = state.list.filter(el => el.id !== action.payload.id);
        toast.success(
          `Contact '${action.payload.name}' with phonenumber '${action.payload.phone}' successfully deleted`
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteContact.rejected, rejected)
      .addCase(deleteContact.pending, loading);
  },
});

export const contactsReducer = contactSlice.reducer;
