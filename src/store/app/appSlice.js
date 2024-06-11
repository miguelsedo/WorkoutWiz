import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        experiencia: '1',
        actividad: '30',
        entrenos: '2',
        limit:null,
    },
    reducers: {
        submitDatos: (state, action) =>{

        },
    }
});


// Action creators are generated for each case reducer function
export const { submitDatos } = appSlice.actions;