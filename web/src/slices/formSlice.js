/* This Redux Toolkit slice is for preserving state for a given form currently being created/updated */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  title: 'N/A',
  description: 'N/A',
  status: false,
  fields: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addField: (state, { payload: field }) => {
      state.fields.push(field);
    },
    deleteField: (state, { payload: id }) => {
      let index = 0;
      for (let item of state.fields) {
        if (item.id === id) break;
        index++;
      }

      state.fields.splice(index, 1);
    },
    updateFormProperties: (state, { payload: data }) => data,
  },
});

// Actions
export const { addField, deleteField, updateFormProperties } = formSlice.actions;

// State value
export const selectForm = (state) => state.form;

// Reducer
export default formSlice.reducer;
