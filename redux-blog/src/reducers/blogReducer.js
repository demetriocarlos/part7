
import { createSlice } from "@reduxjs/toolkit";


const blogSlice = createSlice ({
    name: 'blog',
    initialState:[],
    reducers:{
        setBlog(state, action){
            return action.payload;
        },
        appendBlog(state,action) {
            state.push(action.payload)
        },
        updateBlogLikes(state,action){
            const id = action.payload.id;  
            return state.map(blog =>
                 blog.id !== id ? blog : action.payload
            )
        },
        removeBlog(state, action) {
            return state.filter(blog => blog.id !== action.payload); // Elimina el blog del estado de Redux
        }
    }
})  


// Exporta las acciones y el reductor generado por el slice
 
export const { setBlog, appendBlog, updateBlogLikes,removeBlog } = blogSlice.actions;


export default blogSlice.reducer;






