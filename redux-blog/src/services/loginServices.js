import axios from "axios";
import { notifyWithTimeout } from "../actions/actionsBlog";

const baseUrl = 'http://localhost:3001/api/login'



const login = async (content,dispatch) =>{
  try { 
  const response = await axios.post(baseUrl,content)
  dispatch(notifyWithTimeout('Inicio de sesión exitoso', 'success'));
  return  response.data
 }catch (error) {
  console.error('Error al iniciar sesión:', error);
  dispatch(notifyWithTimeout('Error al iniciar sesión', 'error'))
  throw error;  // Re-lanza el error para que sea manejado por el llamador
  
 }
}


export default {login}


