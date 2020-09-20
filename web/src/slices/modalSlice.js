import { createSlice } from '@reduxjs/toolkit';
import { MODAL } from '../components/constants';

const initialState = MODAL.NONE;

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showAddFormFieldModal: () => MODAL.ADD_FORM_FIELD,
    hideModal: () => MODAL.NONE,
  },
});

// Actions
export const { hideModal, showAddFormFieldModal } = modalSlice.actions;

// State value
export const selectModal = (state) => state.modal;

// Reducer
export default modalSlice.reducer;
