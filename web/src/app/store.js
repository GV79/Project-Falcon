import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../slices/formSlice';
import modalReducer from '../slices/modalSlice';
// import routeReducer from '../slices/routeSlice';

export default configureStore({
  reducer: {
    form: formReducer,
    modal: modalReducer,
    // route: routeReducer,
  },
});
