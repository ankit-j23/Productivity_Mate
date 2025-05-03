import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showSettings : false,
    workDuration : 25 ,
    breakDuration : 5
}

const pomoSlice = createSlice({
    name : 'pomo',
    initialState,
    reducers:{
        toggleSettings:(state , action) =>{
            state.showSettings = action.payload
        },
        updateWorkDuraion:(state , action) =>{
            state.workDuration = action.payload
        },
        updateBreakDuration:(state , action)=>{
            state.breakDuration = action.payload
        }
    }
})

export default pomoSlice.reducer;
export const {toggleSettings , updateBreakDuration , updateWorkDuraion} = pomoSlice.actions;