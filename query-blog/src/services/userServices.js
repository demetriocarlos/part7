
const baseUrl = import.meta.env.VITE_URL
 
  
import axios from "axios"


const getUsers = () => {
    return axios.get(baseUrl)
        .then((response) => {
            
            return response.data
        })
        .catch( error => {
            console.error('error al cargar los usuarios', error)
        })
    }
   

const createUser = (credentials) => {
    return axios.post(baseUrl, credentials)
        .then((response) =>{
             
            return response.data
        })
        .catch((error) => {
            console.error('error al crear un usuario', error)
            throw error; // Lanza el error para que lo capture onError en la mutación
        })
}



    export default {getUsers, createUser}





