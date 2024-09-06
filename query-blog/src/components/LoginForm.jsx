import { useMutation } from "@tanstack/react-query"
import loginServices from "../services/loginServices"
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useNotification } from "../hooks/useNotification";
 

export const LoginForm = () => {
    const{dispatch: notificationDispatch} = useNotification()
    const {login:loginContext}= useAuth();// Obtener la función de login del contexto
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    


    const mutation = useMutation({
      mutationFn:loginServices.login,
      onSuccess: (data) =>  {
        const userData = { username: data.username, token: data.token, id: data.id };
        // Almacenar el token y los datos del usuario en localStorage
        localStorage.setItem('token', data.token);
      localStorage.setItem('loggedInUser', JSON.stringify(/*data*/userData));
      
        loginContext(userData.username, userData.token, userData.id)// Guardar la información del usuario en el contexto

        notificationDispatch({
          type: 'SET_NOTIFICATION',
          payload: { message: "inicio de sesion correctamente", type: "success" }
      });
      },
      onError:(error) => {
        console.error('Error al iniciar sesión', error);
        notificationDispatch({
          type: 'SET_NOTIFICATION',
          payload:  { message: error.response?.data?.error || 'Error desconocido', type: "error" }
      });
      }      
    })


    const handleChange = (e) => {
      const { name, value } = e.target;
      setCredentials({ ...credentials, [name]: value });
    };


    const handleSubmit = (event) => {
      event.preventDefault() // Prevenir el comportamiento por defecto del formulario
      setCredentials({
        username: '', 
        password: ''
      })
      mutation.mutate(credentials)// Ejecutar la mutación con las credenciales del usuario
    }

    
    
  return (
    <> 
     


 
    <div className="bg-gray-200 " >
      <br />
    <h1 className="mt-4 text-center text-3xl font-semibold text-gray-900">Iniciar Sesión</h1>
    <p className=" text-center mt-2 text-sm text-gray-600">Accede a tu cuenta para continuar</p>
      <form onSubmit={handleSubmit} className="flex flex-col  items-center justify-center  min-h-screen ">
        <div className="space-y-8  w-3/4 max-w-xs mb-12 ">
          <div className="border-b border-gray-300 pb-6">
            <div className="grid grid-cols-1 gap-y-6 ">

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="username"  
                    value={credentials.username}
                    placeholder="username"
                    onChange={handleChange}
                    required
                    autoComplete="username"
                    className="block w-full rounded-md border-0  py-2 px-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    type="password" 
                    name="password"   
                    value={credentials.password}
                    placeholder="password"
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-2 px-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  />
                </div>
              </div>

            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 w-full py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log in
            </button>

             
          </div>
        </div>
      </form>
    </div>

  </>
  )
}



















