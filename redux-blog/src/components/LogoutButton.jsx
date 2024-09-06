 
 import { useDispatch } from "react-redux"
import { clearLogin } from "../reducers/loginReducer"
import blogService from '../services/blogServices'

export const LogoutButton = () => {
    const dispatch = useDispatch()

    const handleLogout = () =>{
        // Despacha la acción para limpiar el estado del usuario en Redux
        dispatch(clearLogin())
        // Remueve el usuario del almacenamiento local
        localStorage.removeItem('loggedInUser');
        // Limpia el token configurado en Axios
        blogService.setToken(null);
    }
    
  return (
    <div> 
        <button onClick={handleLogout}>
            logout
        </button>
    </div>
  )
}
