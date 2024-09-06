
import blogServices from "../services/blogServices";
import { setBlog,appendBlog,updateBlogLikes, removeBlog } from "../reducers/blogReducer";
import { setNotification,clearNotification } from "../reducers/notificationReducer";



// Acción que establece una notificación y la elimina después de un tiempo
export const notifyWithTimeout = (message, type, timeout = 5000) => {
  return dispatch => {
    dispatch(setNotification({ message, type }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout);
  };
};

 

// Acción asíncrona para inicializar los blogs
export const fetchBlogs= () => {
    return async dispatch => {
      try { 
        const blogs = await blogServices.getAll(dispatch); // Realiza una solicitud para obtener todos los blogs
        dispatch(setBlog(blogs)); // Despacha la acción para establecer los blogs en el estado de Redux

      }catch(error){
        dispatch(notifyWithTimeout('Error al cargar blogs', 'error'))
      }
    }
}


// Acción asíncrona para crear una nuevo blog
export const createBlog= (content) => {
    return async dispatch => {
      try{
        const newBlog = await blogServices.createNew(content,dispatch); // Realiza una solicitud para crear un nuevo blog
        dispatch(appendBlog(newBlog)); // Despacha la acción para agregar el nuevo blog al estado de Redux
        dispatch(notifyWithTimeout('Blog creado exitosamente', 'success'));
      } catch(error){
        dispatch(notifyWithTimeout('Error al crear blog', 'error'))
      }
    }
}  



 // Acción asíncrona para manejar likes
export const toggleLike = (id) => {
    return async (dispatch, getState) => {
        // Obtener el estado actual de los blogs desde Redux
        const blogs = getState().blog;
        
        // Encontrar el blog específico que debe ser actualizado
        const blogToChange = blogs.find(blog => blog.id === id);
        //console.log('state',blogs)
        
        // Obtener la lista de usuarios que han dado "like" a este blog, o una lista vacía si no existe
        const userLikes = blogToChange.userLikes || [];

        // Obtener el usuario actualmente autenticado desde el estado de Redux
        const user = getState().login.user;
        
        
        // Obtener el ID del usuario actualmente autenticado
        const userId = user.id;

         
        // Comprobar si el usuario actualmente autenticado ya ha dado "like" a este blog
        const hasLiked = userLikes.includes(userId);

        // Crear una nueva versión del blog con el conteo de "likes" actualizado y la lista de usuarios que han dado "like" actualizada
        const changedBlog = {
            ...blogToChange,
            likes: hasLiked ? blogToChange.likes - 1 : blogToChange.likes + 1, // Si ya ha dado "like", disminuir el conteo, de lo contrario, aumentarlo
            userLikes: hasLiked
                ? userLikes.filter(uid => uid !== userId) // Si ya ha dado "like", eliminar al usuario de la lista
                : userLikes.concat(userId) // Si no ha dado "like", añadir al usuario a la lista
        };

        try{
            // Hacer una solicitud para actualizar el blog en el backend con la nueva versión del blog
            const updatedBlog = await blogServices.update(id, changedBlog,dispatch);
            // Despachar una acción para actualizar el estado de Redux con el blog actualizado
            dispatch(updateBlogLikes(updatedBlog));
            dispatch(notifyWithTimeout(`Blog ${hasLiked ? 'desliked' : 'liked'} exitosamente`, 'success'));
        }catch (error){
          dispatch(notifyWithTimeout('Error al actualizar like', 'error'))
        }

    };
};



// Acción asíncrona para eliminar un blog
export const deleteBlog = (id,) => {
    return async (dispatch) => {
      try {
        await blogServices.remove(id,dispatch);  // Llama al servicio para eliminar el blog en el servidor
        dispatch(removeBlog(id));  // Despacha la acción para eliminar el blog en el estado de Redux
        dispatch(notifyWithTimeout('Blog eliminado exitosamente', 'success'))

      } catch (error) {
        dispatch(notifyWithTimeout('Error al eliminar blog', 'error'))
        console.error("Error deleting blog:", error);  // Manejo de errores en caso de que ocurra un error durante la eliminación
      }
    };
  };



 



