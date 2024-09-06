
import { useDispatch } from "react-redux"
import { useState } from "react"
import { createBlog } from "../actions/actionsBlog"
 import { notifyWithTimeout } from "../actions/actionsBlog"
export const NewBlogForm = () => {
const [blogData, setBlogData] = useState({
    title: "",
    author: "",
    url: "",
})
const dispatch = useDispatch();


const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

    
    const handleSubmit = async (event)=>{                                                              
        event.preventDefault();
        try{
            

            if (!blogData.title || !blogData.author || !blogData.url) {
                dispatch(notifyWithTimeout('All fields are required', 'error'));
                return;
              }

              dispatch(createBlog(blogData))
            // Restablece el estado del formulario
            setBlogData({
                title: "",
                author: "",
                url: "",
            })
        }catch (error){
            console.error("Error al crear el blog:", error);
        }


    }
  return (
    <div> 
        <h3>Create</h3>
        <form  onSubmit={handleSubmit}>
        
            <div>
                Title:
                <input 
                    type="text" 
                    value={blogData.title}
                    name="title"
                    onChange={handleChange}
                    placeholder="Title"
                />
            </div>
            <div>
                Author:
                <input 
                    type="text" 
                    value={blogData.author}
                    name="author"
                    onChange={handleChange}
                    placeholder="Author"
                     
                />
            </div>
            <div>
                Url:
                <input 
                    type="text" 
                    value={blogData.url}
                    name="url"
                    onChange={handleChange}
                    placeholder="Url"
                     
                />
            </div>
             <button type="submit">Create</button>
        </form>
    </div>
  )
}
