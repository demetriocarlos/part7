
import { useParams } from "react-router-dom"
import { useUser } from "../hooks/useUsers"
import { useDelete } from "../hooks/useBlogs";
import { BlogPost } from "./Styles/BlogPost";
import { relativeTime } from "../hooks/useBlogs";
import { Spinner } from "./Styles/Spinner";
import { UserLink } from "./Styles/UserLink";
//import { Link } from "react-router-dom";
import { ErrorMessage } from "./Styles/ErrorMessage";
 
export const UserBlogs = () => {
    const id = useParams().id;
    const {data:  users, isLoading, error} = useUser()
    const deleteBlogMutation = useDelete()


    if(isLoading){
        return <div><Spinner size="large" color="text-indigo-600"/></div>  // Mostrar un mensaje de carga
    }
  
  
    if (error) return <div> <ErrorMessage text={"Error al cargar blogs:"}  message={error.message}/></div>; // Mostrar un mensaje de error
  
  
    // Encontrar el usuario por su id
    const user = users.find((user) => user.id === id);

    if (!user) {
      return <div className="flex justify-center items-center h-screen">Usuario no encontrado</div>;
  }
    
  if (user.blog.length === 0) {
    return <div className="flex justify-center items-center h-screen"> <div className="mb-14">Este usuario aún no ha agregado ningún blog.</div></div>;  // Mostrar un mensaje si no hay blogs
}

const handleDelete= (id) =>{
    
  if (window.confirm('¿Estás seguro de que quieres eliminar este blog?')) {
      deleteBlogMutation.mutate(id)
  }
}
 
const sortedBlog = user.blog.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
 

  return (
    <div> 
            <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto space-y-8">
                
              <h1 className="mb-4 text-2xl text-center  sm:text-3xl  text-gray-800">Blogs de {user.username}</h1>

                  {sortedBlog.map((blog) => (
                    <div key={blog.id} className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer">
                      <div className=" mx-auto bg-white shadow-md   transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer ">
                        <UserLink
                          createdBy={user.username}
                          createdById={user.id}
                        />
                    </div>

                    {/*<Link to={`/blogs/${blog.id}`} className="block"  onClick={(e) => e.stopPropagation()}>*/}
                      <div>
 

      
                      <BlogPost
                        id={blog.id}
                        title={blog.title}
                        author={blog.author}
                        showDelete={true}
                        date={relativeTime(blog.created_at)}
                        handleDelete={handleDelete}
                        user={user}
                        createdBy={user.username}
                        createdById={user.id}
                      />
                      </div>
                    {/*</Link>*/}
     
                        
                    </div>
                ))}
              </div>
            </div>
 
    </div>
  )
}
