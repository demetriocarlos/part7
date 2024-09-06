
//import { useContext } from "react";
//import { BlogContext } from "../contexts/BlogContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogServices from "../services/blogServices";
import { useNotification } from "./useNotification";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
 
 // Obtener blogs
export const useBlogs = () => {
  const { state: authState } = useAuth(); // Obtener el estado de autenticación
     
    return useQuery({
      queryKey: ['blogs'],
      queryFn: blogServices.getBlogs,
      enabled: !!authState.username, // Solo ejecutar la consulta si el usuario está autenticado
        //
        refetchOnWindowFocus: false,
      onSuccess: () => {
        console.log('Blogs fetched successfully', );
      },
      onError: (error) => {
        console.error('Error fetching blogs', error);
      }
    });
  };


//// Hook personalizado para agregar un nuevo blog
export const useAddBlog = () => {
    const queryClient = useQueryClient()// Obtener el cliente de consultas de React Query
    const { dispatch: notificationDispatch } = useNotification()

   const newBlogMutation = useMutation ({
        mutationFn: blogServices.create,  // Función que realiza la creación del blog
        onSuccess: (newBlog) => {
             
            // Invalidar y refetch las consultas relacionadas
            //queryClient.invalidateQueries({ queryKey: ['blogs'] })


            // Opcional: actualizar la caché localmente sin refetch
            const blog= queryClient.getQueryData(["blogs"])
            queryClient.setQueryData(["blogs"], blog.concat(newBlog))

            notificationDispatch({
                type: 'SET_NOTIFICATION',
                payload: { message: "Blog creado correctamente", type: "success" }
            });

        },
        onError: (error) => {
            console.error("Error al crear el blog", error)
            // Mostrar mensaje de error al usuario
            
            notificationDispatch({
                type: 'SET_NOTIFICATION',
                payload: { message: "Hubo un error al  crear el blog. Por favor, inténtalo de nuevo.", type: "error" }
            });

            alert("Hubo un error al crear el blog. Por favor, inténtalo de nuevo.");
        }
    })

    return newBlogMutation;
}


export const useUpdateLikes= () => {
    const queryClient = useQueryClient()// Obtener el cliente de consultas de React Query
     
    const { dispatch: notificationDispatch } = useNotification()
    const updateBlogMutation= useMutation({
        mutationFn:blogServices.update, // Función que realiza la actualización del blog
        onSuccess: (updatedBlog) =>{
    
            //queryClient.invalidateQueries(['blogs']) // Invalidar y refetch las consultas relacionadas
    

            // Obtener los blogs actuales desde el cache
            const blogs = queryClient.getQueryData(["blogs"]);
      
            // Actualizar localmente el cache
              queryClient.setQueryData(["blogs"], 
                blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
              );
           
               
            notificationDispatch({
                type: 'SET_NOTIFICATION',
                payload: { message:`👍🏻`, type: "success" }
            });
        },
        onError: (error) => {
            console.error("Error al actualizar el blog", error);
       
                  //alert("Hubo un error al actualizar el blog. Por favor, inténtalo de nuevo.");
                  notificationDispatch({
                    type: 'SET_NOTIFICATION',
                    payload: { message: "Hubo un error al actualizar el blog. Por favor, inténtalo de nuevo.", type: "error" }
                });
        }
    })

    return updateBlogMutation;

}


export const useDelete = () =>{
   const queryClient = useQueryClient()
    
   
   const { dispatch: notificationDispatch }= useNotification()

   const deleteBlog = useMutation({
        mutationFn: blogServices.eliminar,
        onSuccess: () =>{
              
            queryClient.invalidateQueries(/*{queryKey: */["blogs"] /* }*/)
             
            // Obtener los blogs actuales desde el cache
            //const blogs = queryClient.getQueryData(["blogs"]);
      
            // Actualizar localmente el cache
            /*
            queryClient.setQueryData(["blogs"], 
              blogs.filter(blog => blog.id !== deletedBlogId)
            );
            */

            

            notificationDispatch({
                type: 'SET_NOTIFICATION',
                payload: { message: "Blog eliminado correctamente", type: "success" }
            });
        },
        onError: (error) =>{
            console.error('error al eliminar el blog', error)
            notificationDispatch({
                type: 'SET_NOTIFICATION',
                payload: { message: "Hubo un error al eliminar el blog. Por favor, inténtalo de nuevo.", type: "error" }
            });
            //alert("Hubo un error al  eliminar el blog. Por favor, inténtalo de nuevo.");
        }
   })

   return deleteBlog

}


export const useComments= () => {
  const queryClient = useQueryClient()// Obtener el cliente de consultas de React Query
  const { dispatch: notificationDispatch } = useNotification()

    const commentsBlogMutation = useMutation({
        mutationFn:blogServices.comments,// Función que realiza la creación del comentario
        onSuccess: (updatedBlog, {id}) => { // Función que se ejecuta si la mutación es exitosa
          
          queryClient.setQueryData(["blogs"], (oldBlogs) =>
            oldBlogs.map(blog =>
              blog.id === id ? { ...blog, comments: updatedBlog.comments } : blog // Actualizar la caché local con los nuevos comentarios
            )
          );


          /*
            // Obtener la lista de blogs actual de la caché
    const blogs = queryClient.getQueryData(["blogs"]);
    
    // Mapear los blogs para encontrar el que se actualizó y reemplazarlo
    const updatedBlogs = blogs.map(blog => 
        blog.id === updatedBlog.id ? updatedBlog : blog
    );

    // Actualizar la caché con la nueva lista de blogs
    queryClient.setQueryData(["blogs"], updatedBlogs);
*/


            notificationDispatch({
              type: 'SET_NOTIFICATION',
              payload: { message: "Comentario agregado", type: "success" }
          });
        },
        onError:(error) => {
            console.error('error al agregar el comentario', error)
            notificationDispatch({
                type: 'SET_NOTIFICATION',
                payload: { message: "Hubo un error al  crear el comentario", type: "error" }
            });
        }
    })

    return commentsBlogMutation;

}


export function relativeTime(commentTimestamp) {
  // Obtiene el tiempo actual en milisegundos
  const now = new Date().getTime();
  
  // Convierte el timestamp del comentario a milisegundos
  const commentTime = new Date(commentTimestamp).getTime();
  
  // Calcula la diferencia en tiempo entre ahora y el momento del comentario
  const diff = now - commentTime;

  // Definición de los intervalos de tiempo en milisegundos
  const minute = 60000;           // 1 minuto = 60,000 milisegundos
  const hour = 3600000;           // 1 hora = 3,600,000 milisegundos
  const day = 86400000;           // 1 día = 86,400,000 milisegundos
  const week = 604800000;         // 1 semana = 604,800,000 milisegundos
  const month = 2629800000;       // 1 mes (aproximado) = 2,629,800,000 milisegundos
  const year = 31557600000;       // 1 año (aproximado) = 31,557,600,000 milisegundos

  // Comparación de la diferencia de tiempo con los intervalos definidos

  if (diff < minute) {
    // Si la diferencia es menor que un minuto, retorna "hace menos de 1 minuto"
    return 'hace menos de 1 minuto';
  } else if (diff < hour) {
    // Si la diferencia es menor que una hora, calcula los minutos transcurridos
    const minutes = Math.floor(diff / minute);
    return `hace ${minutes} minutos`;
  } else if (diff < day) {
    // Si la diferencia es menor que un día, calcula las horas transcurridas
    const hours = Math.floor(diff / hour);
    return `hace ${hours} horas`;
  } else if (diff < week) {
    // Si la diferencia es menor que una semana, calcula los días transcurridos
    const days = Math.floor(diff / day);
    return `hace ${days} días`;
  } else if (diff < month) {
    // Si la diferencia es menor que un mes, calcula las semanas transcurridas
    const weeks = Math.floor(diff / week);
    return `hace ${weeks} semanas`;
  } else if (diff < year) {
    // Si la diferencia es menor que un año, calcula los meses transcurridos
    const months = Math.floor(diff / month);
    return `hace ${months} meses`;
  } else {
    // Si la diferencia es mayor o igual a un año, calcula los años transcurridos
    const years = Math.floor(diff / year);
    return `hace ${years} años`;
  }
}


