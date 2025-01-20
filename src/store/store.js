import { configureStore } from '@reduxjs/toolkit';
import signupReducer from '../store/signupSlice';

export const store = configureStore({
    reducer: {
        signup: signupReducer,
    },
});
