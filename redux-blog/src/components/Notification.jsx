
import { useSelector } from "react-redux"

 

export const Notification = () => { 
    const notification = useSelector(state => state.notification);


  // No muestra nada si no hay un mensaje de notificación
  if (!notification.message) {
    return null;
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
    backgroundColor: notification.type === 'success' ? '#4caf50' : '#f44336',
  };


  return (
    <div style={notificationStyle}>
        {notification.message}
    </div>
  )
}
