
import { useBlogs } from "../hooks/useBlogs"
import { useParams } from "react-router-dom"
import { useUpdateLikes } from "../hooks/useBlogs"
import { useAuth } from "../hooks/useAuth"
import { BlogComment } from "./BlogComment"
import { BlogPost } from "./Styles/BlogPost"
import { relativeTime } from "../hooks/useBlogs"
import { UserLink } from "./Styles/UserLink"
 
export const Blogs = () => {
    const id = useParams().id
    const {data: blogs, isLoading, error} = useBlogs()
    const { state: authState } = useAuth();// Obtener el estado de autenticación usando el hook personalizado
    const updateBlogMutation= useUpdateLikes()
  
    if(isLoading){
        return <div>Cargando blogs...</div>  // Mostrar un mensaje de carga
    }
        

    if (error) return <div>Error al cargar blogs: {error.message}</div>; // Mostrar un mensaje de error

    const blog = blogs.find((blog) => blog.id === id);


    if (!blogs) {
        return <div>Blog no encontrado</div>;
    }
    
  //const userLikes = blogToChange.userLikes || []; // Obtener la lista de likes del 
  const userLikes = blog.userLikes || []; // Obtener la lista de likes del blog

    
const togleLikes = (id) => {
  const blogToChange = blogs.find((blog) => blog.id === id);// Encontrar el blog que se va a cambiar
   
  const userLikes = blogToChange.userLikes || []; // Obtener la lista de likes del 
  
  const userId = authState.id; // Obtener el ID del usuario autenticado
  const hasLiked = userLikes.includes(userId); // Verificar si el usuario ya ha dado like

  const changedBlog = {
    ...blogToChange,
    likes: hasLiked ? blogToChange.likes - 1 : blogToChange.likes + 1, // Si ya ha dado "like", disminuir el conteo, de lo contrario, aumentarlo
    userLikes: hasLiked
      ? userLikes.filter((uid) => uid !== userId) // Si ya ha dado "like", eliminar al usuario de la lista
      : userLikes.concat(userId), // Si no ha dado "like", añadir al usuario a la lista
  };

  updateBlogMutation.mutate(id, changedBlog); // Ejecutar la mutación con los datos del blog cambiado
}
   

  return (
    <div>
    <div className="min-h-screent bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <br />
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer">
            <div className=" mx-auto bg-white shadow-md   transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer ">
                    <UserLink
                    createdBy={
                      blog.user.map((user) => (
                        <div key={user.id}>
                            {user.username}
                        </div>
                      ))
                    }
                    createdById={blog.user.map(user => user.id  )}
                  />
              </div>

              <BlogPost
                id= {blog.id}
                title={blog.title}
                author={blog.author}
                url={blog.url}
                date={relativeTime(blog.created_at)}
                likes={blog.likes}
                userLikes={userLikes}
                authState={authState}
                togleLikes={togleLikes}
                showLikeButton={true}
                showLink={true}
              />

        </div>
      </div>
    </div>
      <div>
          <BlogComment blog={blog}/>
      </div>
    </div>
  )
}
