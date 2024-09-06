
import { createSlice } from "@reduxjs/toolkit";


const loginSlice = createSlice({
    name:'login',
    initialState:{ user: null, token: null },
    reducers:{
        setLogin(state,action){
            //return action.payload;
            return { 
                user: action.payload.user, 
                token: action.payload.token };
        },
        clearLogin() {
            return  { user: null, token: null };
        }
    }
})


// Exporta las acciones y el reductor generado por el slice
 
export const {setLogin, clearLogin} = loginSlice.actions


export default loginSlice.reducer;