
import axios from "axios";
 const baseUrl = import.meta.env.VITE_API_URL
 const logins ="login"
    
 
// Función para hacer la solicitud de inicio de sesión
const login = (credentials) => {
    // Enviar una solicitud POST al endpoint de inicio de sesión
    return axios.post( `${baseUrl}${logins}`, credentials)
      .then(response => {
         
        // Devolver la respuesta del servidor
        return response.data;
      })
      .catch(error => {
        // Manejar errores
        console.error('Error: al iniciar sesion', error);
        throw error;
      });
  };

 
  export default { login };













