import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import your actual reducer(s)

const store = configureStore({
    reducer: {
    auth: authReducer, // Assuming authReducer is the reducer for the 'auth' slice
    // Add other reducers as needed
    },
});

export default store;
