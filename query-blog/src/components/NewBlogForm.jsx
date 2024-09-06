import { useState, /*useContext*/ } from "react"
import { useAddBlog } from "../hooks/useBlogs"
import { CreateBlogForm } from "./Styles/CreateBlogForm"


export const NewBlogForm = () => {
     
    const [createBlog, setCreateBlog] = useState({
        title:"",
        author:"",
        url:"",
    })

    const newBlogMutation= useAddBlog()// Usar el hook personalizado para agregar un nuevo blog
 
 
    const handleSubmit = () => {
        //event.preventDefault();
        setCreateBlog({
            title:"",
            author:"",
            url:"",
        });// Limpiar el formulario
        
        newBlogMutation.mutate(createBlog); // Ejecutar la mutación con los datos del formulario
    }


  return (
    <div> 
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <CreateBlogForm
              onSubmit={handleSubmit}
              createBlog={createBlog}
              setCreateBlog={setCreateBlog}
            />
          </div>
        </div>
    </div>
  )
}
