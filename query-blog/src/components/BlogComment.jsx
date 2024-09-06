
 
import { useState } from "react"
import { useComments } from "../hooks/useBlogs"
import { BlogCommentStyles } from "./Styles/BlogCommentStyles"

// eslint-disable-next-line react/prop-types
export const BlogComment = ({blog}) => {
    const [comment, setComment] = useState('')
    const commentsBlogMutation= useComments()
    
    
    const handleComments= () => {
        //event.preventDefault()
        setComment('')
        commentsBlogMutation.mutate({
            // eslint-disable-next-line react/prop-types
            id:blog.id,
            comment: comment // Enviar el comentario en el formato esperado
      
        })
    }
      

// Ordenar los comentarios por timestamp en orden descendente (más reciente primero)
// eslint-disable-next-line react/prop-types
const sortedComments = blog.comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));



  return (
  <div> 
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        <BlogCommentStyles
          handleComments={handleComments}
          showForm={true}
          newComment={comment}
          setNewComment={setComment}
          comments={sortedComments}
        />
 
      </div>
    </div>
    
  </div>
  )
}
