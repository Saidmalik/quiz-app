import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  quizes: [],
  loading: false,
};

export const authReducer = createSlice({
    name: 'quiz',
    initialState, 
    reducers: {
    
    },
    extraReducers: {
        []: (state, action) => {}
    }
})