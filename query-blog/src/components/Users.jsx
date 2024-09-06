     
import { useUser } from "../hooks/useUsers"
import { UserList } from "./Styles/UserList"
import { Spinner } from "./Styles/Spinner"
import { ErrorMessage } from "./Styles/ErrorMessage"
 

 export const Users = () => {
    const {data:  users, isLoading, error} = useUser()

    if(isLoading){
      return <div>< Spinner size="large" color="text-indigo-600"/></div>  // Mostrar un mensaje de carga
  }


  if (error) return <div> <ErrorMessage text={"Error al cargar los usuarios:"} />  </div>; // Mostrar un mensaje de error

  
  const sortedUser = users.sort((a, b) => new Date(b.blog.length) - new Date(a.blog.length
  ));


   return (
     <div > 
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto">
            <br />
            <UserList users={/*users*/ sortedUser} />
          </div>
        </div>
     </div>
   )
 }
 