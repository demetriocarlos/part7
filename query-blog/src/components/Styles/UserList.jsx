

 
import { User, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export function UserList({ users }) {

  return (
    
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Lista de Usuarios</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Usuarios y sus blogs creados.</p>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
        
          {
          // eslint-disable-next-line react/prop-types
          users.map((user) => (
            
            <li key={user.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition duration-150 ease-in-out">
             <Link to={`/userBlogs/${user.id}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <User className="h-8 w-8 rounded-full text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-indigo-600">{user.username}</div>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <BookOpen className="h-5 w-5 mr-1" />
                  <span>{user.blog.length} {user.blog.length === 1 ? 'blog' : 'blogs'}</span>
                </div>
              </div>
              </Link>
            </li>
             
          ))}
          
        </ul>
      </div>
    </div>
  );
}