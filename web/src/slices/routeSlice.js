/* Tracks route changes to dynamically refresh certain components (ie. headers) depending on paths */

import { createSlice } from '@reduxjs/toolkit';

const initialState = '/';

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    changeRoute: (state, payload) => payload,
  },
});

// Actions
export const { changeRoute } = routeSlice.actions;

// State value
export const selectRoute = (state) => state.route;

// Reducer
export default routeSlice.reducer;
