

 
import { Send, Calendar } from 'lucide-react';
//import { relativeTime } from '../hooks/useBlogs';
import { relativeTime } from '../../hooks/useBlogs';
 
 

// eslint-disable-next-line react/prop-types
export  function BlogCommentStyles({ comments,  handleComments, newComment, setNewComment,  showForm=false}) {
   
  const handleSubmit = (e) => {
   e.preventDefault();
    handleComments()
  };

  return (
    <div className="mt-8 bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Comentarios</h3>
      

      {/* Formulario para nuevo comentario */}
      { showForm && ( 
      <form onSubmit={handleSubmit} className="mb-6 " >
        <div className="flex flex-col">
          <textarea
            type="text"
            name='newComment'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe un comentario..."
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            rows={3}
          />
          <button
            type="submit"
            className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out flex items-center justify-center self-end"
          >
            <Send className="w-5 h-5 mr-2" />
          </button>
        </div>
      </form>
      )}



      {/* Lista de comentarios */}
      <div className="space-y-4">
        {
        // eslint-disable-next-line react/prop-types
        comments &&  comments.map((comment) => (
          <div key={comment._id} className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium text-gray-800"> </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {relativeTime(comment.timestamp)}
              </span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{comment.comment}</p>
          </div>
        ))}
      </div>
      {
      // eslint-disable-next-line react/prop-types
      comments &&  comments.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No hay comentarios aún. ¡Sé el primero en comentar!</p>
      )}


    </div>
  );
}