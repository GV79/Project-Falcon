/* This Redux Toolkit slice is for preserving state for a given form currently being created/updated */

import { createSlice } from '@reduxjs/toolkit';
import { FORM_TYPE } from '../components/constants';

const initialState = {
  id: 0,
  title: 'N/A',
  description: 'N/A',
  status: false,
  link: 'N/A',
  fields: [
    {
      id: 11,
      type: FORM_TYPE.SINGLE,
      label: 'Email',
    },
    {
      id: 22,
      type: FORM_TYPE.LONG,
      label: 'What is your favourite default answer to my default question',
    },
    {
      id: 33,
      type: FORM_TYPE.MULTI,
      label: 'Email',
    },
  ],
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
    changeFormProperties: (state, payload) => {
      return { ...state, payload };
    },
  },
});

// Actions
export const { addField, deleteField, changeFormProperties } = formSlice.actions;

// State value
export const selectForm = (state) => state.form;

// Reducer
export default formSlice.reducer;
