/* This Redux Toolkit slice is for preserving state for a given form currently being created/updated */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  title: 'N/A',
  description: 'N/A',
  status: false,
  link: 'N/A',
  fields: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addField: (state, payload) => state.fields.push(payload),
    changeFormProperties: (state, payload) => {
      return { ...state, payload };
    },
  },
});

// Actions
export const { addField, changeFormProperties } = formSlice.actions;

// State value
export const selectForm = (state) => state.form;

// Reducer
export default formSlice.reducer;
