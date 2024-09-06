
import { createContext, useReducer } from "react";
//import { useQuery } from "@tanstack/react-query";


export const NotificationContext = createContext()


const notificationReducer=(state,action) =>{

    switch (action.type){
        case "SET_NOTIFICATION":
            return{
                ...state,
                message: action.payload.message,
                type: action.payload.type
            }
        case 'CLEAR_NOTIFICATION':
            return{
                message: '',
                type:''
            }
        default:
            return state; // Siempre retorna el estado por defecto
    }
}


const initialState = {
    message : '',
    type : ''
}



// eslint-disable-next-line react/prop-types
export const NotificationProvider = ({children}) =>{
    const [state, dispatch]=useReducer(notificationReducer, initialState);

    return (
        <NotificationContext.Provider value={{state,dispatch}}>
            {children}
        </NotificationContext.Provider>
    )

}

