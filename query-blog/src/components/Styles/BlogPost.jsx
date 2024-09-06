

//import { useState } from 'react';
import { Heart, Calendar, ExternalLink, Trash2} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
 
// eslint-disable-next-line react/prop-types
export  function BlogPost({ id, title, author, url, date,likes,userLikes=[], togleLikes, handleDelete, user, showLikeButton = false,  showLink= false, showDelete=false } ) {
    
    const { state: authState } = useAuth();// Obtener el estado de autenticación usando el hook personalizado
    const userId = authState.id; // Obtener el ID del usuario autenticado
      // eslint-disable-next-line react/prop-types
    const hasLiked = userLikes.includes(userId); // Verificar si el usuario ya ha dado like

   

    const handleLike = (e ) => {
      e.stopPropagation();
      togleLikes(id);
    };

    const onDelete = (e) => {
      e.stopPropagation();
      handleDelete(id);
    };
  
 

    return (
      <div >
        <div className="p-4 sm:p-6">
        
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">{title}</h2>
              { showDelete && ( 
                
                // eslint-disable-next-line react/prop-types
                user.id === authState.id && (
                <button
                  onClick={onDelete}
                  className="text-red-500 hover:text-red-700 transition-colors duration-300"
                  aria-label="Eliminar blog"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                )
              )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 mb-4">
            <span className="flex items-center mr-4 mb-2 sm:mb-0">
              <Calendar className="w-4 h-4 mr-1" />
              {date}
            </span>
            <span className="mr-4">Por: {author}</span>
          </div>
          
          

          { showLink  && ( 
          <div className="mb-4">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-300 truncate block mb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            {url}
          </a>
          </div>
            )}

         
          <div className="flex items-center justify-between mt-4">
            {showLikeButton && (
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-300 ease-in-out ${
                   hasLiked 
                    ? 'bg-green-100 text-green-500 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
                <span>{likes}</span>
              </button>
            )}
          </div>
          
        </div>
      </div>
    );
  }





 