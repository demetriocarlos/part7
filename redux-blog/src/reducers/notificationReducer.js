
import { createSlice } from "@reduxjs/toolkit";

// Crea un slice para manejar las notificaciones
const notificationSlice = createSlice ({
    name:'notification',
    initialState:{ message: '', type: '' },
    reducers:{
        // Acción para establecer una notificación
        setNotification(state, action) {
            return { message: action.payload.message, type: action.payload.type };
        },

        // Acción para limpiar una notificación
        clearNotification() {
            return { message: '', type: '' };
          }
    }
})


export const {setNotification, clearNotification}= notificationSlice.actions;
export default notificationSlice.reducer;


