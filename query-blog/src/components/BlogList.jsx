
import { useBlogs } from "../hooks/useBlogs";
 
 
import { relativeTime } from "../hooks/useBlogs";
import { BlogPost } from "./Styles/BlogPost";
import { Spinner } from "./Styles/Spinner";
import { ErrorMessage } from "./Styles/ErrorMessage";
import { Link } from "react-router-dom";
import { UserLink } from "./Styles/UserLink";
 
export const BlogList = () => {
     
    const { data: blogs, isLoading, error } = useBlogs();
    if(isLoading){
        return <div><Spinner size="large" color="text-indigo-600"/></div>  // Mostrar un mensaje de carga
    }
                 
        //Error al cargar blogs: {error.message}
    if (error) return <div> <ErrorMessage text={"Error al cargar blogs:"}  message={error.message}/></div>; // Mostrar un mensaje de error



    if (!blogs || blogs.length === 0) {
        return <div>No hay blogs disponibles</div>;
    }
  

    // Ordenar los comentarios por  created_at en orden descendente (más reciente primero)
    const sortedBlog = blogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at
    ));
 
  return (
    <div>
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
          <div className="mt-4  max-w-3xl mx-auto space-y-8">
            
            {
              sortedBlog.map(blog => (
                <div  key={blog.id} className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer" >
                                                          {/**overflow-hidden */}
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
                    <Link to={`/blogs/${blog.id}`} className="block">
                        <BlogPost
                             
                            title={blog.title}
                            author={blog.author}
                            date={relativeTime(blog.created_at)}
                            id={blog.id}
                        /> 
                      </Link>

                </div>
              ))
            }
          </div>
        </div>
    </div>
  )
}












