import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    password: '',
    role: 'JobSeeker',
    contactNumber: '',
    skills: '',
    companyName: '',
};

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        updateFormField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        resetForm: () => initialState,
    },
});

export const { updateFormField, resetForm } = signupSlice.actions;

export default signupSlice.reducer;
