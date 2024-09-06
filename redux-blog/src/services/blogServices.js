import api from "./api";
const baseUrl = '/blogs';
 import { notifyWithTimeout } from "../actions/actionsBlog";
 //import { useDispatch } from "react-redux";
 
 
 
 


// Función para establecer el token de autenticación
const setToken = token => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

 // Función para obtener todos los blogs
const getAll = async (dispatch) => {
  //const dispatch= useDispatch()

  try{ 
     
    // Realizar una solicitud GET a la URL base con la configuración de los encabezados
    const response = await api.get(baseUrl);
    // Devolver los datos de la respuesta  
    return response.data;     
  }catch (error){
    
    // Manejar errores aquí (por ejemplo, si la solicitud falla)
    console.error("Error al obtener los datosss:", error)
    dispatch(notifyWithTimeout('Error al cargar blogs', 'error'))
  }
  };

      
  // Función para crear un nuevo blog
  const createNew = async (content,dispatch) => {
    try{
       
      const response = await api.post(baseUrl,  content);

      // Devolver los datos de la respuesta
      return response.data;
    }catch (error){
      dispatch(notifyWithTimeout('Error al crear blog', 'error'))
      console.error("Error al crear el objeto:", error)
      
    }
    
  };


  // Función para actualizar un blog existente
  const update = async (id, newObject, dispatch) => {
    try {
      const response = await api.put(`${baseUrl}/${id}`, newObject);
      return response.data;

    }catch (error) {
      console.error("Error al actualizar:", error)
      dispatch(notifyWithTimeout('Error al actualizar like', 'error'))
    }
    
  };

  const remove = async (id,dispatch) => {
    try {
      const response = await api.delete(`${baseUrl}/${id}`); // Llama al endpoint de eliminación del blog
      return response.data;

    }catch (error) {
      console.error("Error al eliminar el blog:", error)
      dispatch(notifyWithTimeout('Error al eliminar blog', 'error'))
    }
    
  };
  
  export default { getAll, createNew, update, setToken, remove };
  

