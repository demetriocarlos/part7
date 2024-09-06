 
 import { useNotification } from "../hooks/useNotification"
import { useEffect } from "react";
export const Notification = () => {

    const {state, dispatch} =useNotification();



useEffect(() =>{
  if(state.message){
    const timer = setTimeout(() =>{
      dispatch({type:'CLEAR_NOTIFICATION'})
    }, 5000)
    return () => clearTimeout(timer);
  }
}, [state.message, dispatch])

    if(!state.message){
        return null
    }

    
  const notificationStyle = {
    position: 'fixed',
    top: '0',
    right: '0',
    padding: '1rem',
    margin: '1rem',
    zIndex: 1000,
    borderRadius: '4px',
    color: 'white',
    backgroundColor: state.type === 'success' ? '#4caf50' : '#f44336',
  };


  return (
    <div style={notificationStyle}> 
        {state.message}
    </div>
  )
}
