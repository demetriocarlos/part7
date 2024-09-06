import { useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchBlogs,toggleLike, deleteBlog } from "../actions/actionsBlog"
 
export const BlogList = () => {
  const dispatch= useDispatch() // Hook para despachar acciones a Redux      
  const blogs = useSelector(state => state.blog); // Hook para seleccionar el estado de blogs desde Redux
  const token = useSelector(state => state.login.token) // Hook para seleccionar el token desde Redux

   
  // Efecto para inicializar los blogs si hay un token presente
useEffect(() => {
  if (token) {
    dispatch(fetchBlogs());// Despacha la acción para obtener y establecer los blogs en Redux 
  }
}, [dispatch, token]);
 
 
 const handleLike = (id) => {
  //dispatch(likeBlog(id, likes +1))
  dispatch(toggleLike(id))
 }      

 
 const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      `"¿Estás seguro de que quieres eliminar este blog?" `
    )
    if(confirmDelete){ 
      try {
        await dispatch(deleteBlog(id));// Despacha la acción para eliminar el blog con el id proporcionado
     
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
};

 
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

   
  return (
    <div > 
      {
        blogs
        .filter((blog) => blog !== undefined && blog !== null)
        .map((blog) => (
          <div style={blogStyle} key={blog.id}>
              <h4>Titulo: {blog.title}</h4>
              <p>Author: {blog.author}</p>
               
              <p>url: <a href={blog.url} target="_blank" > {blog.url}</a></p>
              
               <br /> 
              <div>
              
                <button onClick={() => handleLike(blog.id)} >Likes</button>
                {blog.likes}
              </div>
              <br /> 
              <div>
                <button onClick={() => handleDelete(blog.id)}>Delete</button>
              </div>
          </div>
        ))
      }
    </div>
  )
}
