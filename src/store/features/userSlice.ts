import { createSlice } from "@reduxjs/toolkit";

interface UserState{
    email:string | null;
    name:string | null;
    token:string | null;
    id:string | null;
}


const initialState:UserState={
    email:null,
    name:null,
    token:null,
    id:null,
}


export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.email=action.payload.email;
            state.name=action.payload.name;
            state.token=action.payload.token;
            state.id=action.payload.id;
        },
        logout:(state)=>{
            state.email=null;
            state.name=null;
            state.token=null;
            state.id=null;
        },
    },
});

export const {setUser,logout}=userSlice.actions;
export default userSlice.reducer;