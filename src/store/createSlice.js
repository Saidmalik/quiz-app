import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  quizes: [],

};

export const createReducer = createSlice({
    name: 'create',
    initialState, 
    reducers: {
    
    },
    extraReducers: {
        []: (state, action) => {}
    }
})