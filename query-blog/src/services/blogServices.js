
import api from "./api"
const baseUrl = 'blogs';
 

const getBlogs = ()  => {   
    return api.get(baseUrl)
    .then( response => {
         
        return response.data
    })
    .catch(error =>{
        console.error('error al obtener los datos', error)
        throw error; // Lanza el error para que lo capture onError en la mutación
    })
}


const create = (datos) => {
    return api.post( baseUrl,datos)
    .then( response => {
        return response.data
    })
    .catch (error => {
        console.log('Error al crear el blog',error)
        throw error; // Lanza el error para que lo capture onError en la mutación
    })
}


const update = (id, newObject) => {
   
    return api.put(`${baseUrl}/${id}`, newObject)
        
    .then(response => {
        return response.data
    })
    .catch (error => {
        console.error("error al actualizar", error)
        throw error; // Lanza el error para que lo capture onError en la mutación
    })
}


const eliminar = (id) => {
    return api.delete(`${baseUrl}/${id}`)
    .then(response => {
         
        return response.data
    })
    .catch (error => {
        console.error('Error al eliminar el blog', error)
        throw error; // Lanza el error para que lo capture onError en la mutación
    })
}


const comments = ({id,comment}) => {
     
    return api.post(`${baseUrl}/${id}/comments`, {comment})
    .then(response => {
         
        return response.data
    })
    .catch(error => {
        console.error('error al crear el comentario',error)
        throw error; // Lanza el error para que lo capture onError en la mutación
    })
}

export default {getBlogs, create, update, eliminar,comments}

