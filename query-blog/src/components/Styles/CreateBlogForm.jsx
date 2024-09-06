

 
import { PlusCircle } from 'lucide-react';
       

// eslint-disable-next-line react/prop-types
export function CreateBlogForm({ onSubmit, createBlog, setCreateBlog}) {
  /*const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
*/
 
  const handleSubmit = (e) => {
    e.preventDefault();
      onSubmit();
  };
 
  
  const handleChange=(e) =>{
    const {name, value}= e.target;
    // Actualizar el estado local cuando los campos del formulario cambian
    setCreateBlog({...createBlog, [name]:value})
}

  return (
    <div className="mt-6  max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear Nuevo Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              type="text"
              id="title"
              name='title'
              value={
                // eslint-disable-next-line react/prop-types
                createBlog.title
              }
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Ingrese el título del blog"
              required
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              Autor
            </label>
            <input
              type="text"
              id="author"
              name='author'
              value={
                // eslint-disable-next-line react/prop-types
                createBlog.author
              }
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Ingrese el nombre del autor"
              required
            />
          </div>
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              type="url"
              id="url"
              name='url'
              value={
                // eslint-disable-next-line react/prop-types
                createBlog.url
              }
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="https://ejemplo.com/mi-blog"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out flex items-center justify-center"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Crear Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}