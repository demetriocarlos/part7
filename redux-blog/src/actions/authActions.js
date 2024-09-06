 
import { setLogin } from "../reducers/loginReducer";
import { notifyWithTimeout } from "./actionsBlog";
import loginServices from "../services/loginServices";
import blogServices from "../services/blogServices";

// Acción síncrona para inicializar el usuario desde el localStorage
export const initializeUser = (dispatch) => {
    const loggedUserJSON = localStorage.getItem('loggedInUser');// Obtiene el usuario almacenado en localStorage
      if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON); // Parsea el usuario a un objeto
          dispatch(setLogin({ user: user, token: user.token })); // Despacha la acción para establecer el usuario en Redux
          blogServices.setToken(user.token);// Configura el token para futuras solicitudes HTTP
          
      }
};

// Acción para iniciar sesión
export const login = (credentials) => {
    // Devuelve una función asíncrona que se usará para manejar la acción de iniciar sesión
    return async dispatch => {
        try {
            // Llama al servicio de inicio de sesión con las credenciales proporcionadas
            const user = await loginServices.login(credentials, dispatch);

            // Despacha la acción para establecer el estado de inicio de sesión en Redux
            dispatch(setLogin({ user: user, token: user.token }));

            // Almacena el token en el localStorage si es necesario
            localStorage.setItem('loggedInUser', JSON.stringify(user));
             localStorage.setItem('token', user.token);//Almacena el token en localStorage para su uso posterior en solicitudes autenticadas.

             // Despacha una notificación de éxito para indicar que el inicio de sesión fue exitoso
            dispatch(notifyWithTimeout('Inicio de sesión exitoso', 'success'));

        }catch (error) {
            dispatch(notifyWithTimeout('Error al iniciar sesión', 'error'));
            console.error('Error al iniciar sesion')
        }
    }
}








