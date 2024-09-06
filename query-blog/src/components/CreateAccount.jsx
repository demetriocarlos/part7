
import { useState } from "react"
import { useCreateUser } from "../hooks/useUsers"

export const CreateAccount = () => {
    const newUserMutation = useCreateUser()
    const [credentials, setCredentials]= useState({username:'', name:'',password:''})

    const handleChange = (e) =>{
      const {name,value}= e.target;
      setCredentials({...credentials, [name]:value})
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        setCredentials({
            username:'', 
            name:'',
            password:''
        })
        newUserMutation.mutate(credentials)
    }
    

  return (
    <div className="bg-gray-200">  
        <br />
      <h1 className=" text-center  text-3xl font-semibold text-gray-900">Crear una Cuenta</h1>
      <p className=" text-center mt-2 text-sm text-gray-600">Únete a nosotros hoy mismo</p>
        

        <form  onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen ">
          <div className="space-y-8 w-3/4 max-w-xs">
            <div className="border-b border-gray-300 pb-6">
              <div className="grid grid-cols-1 gap-y-6">

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      type="text" 
                      name="username" 
                      placeholder="username"
                      value={credentials.username}
                      onChange={handleChange}
                      required
                      autoComplete="username"
                      className="block w-full rounded-md border-0  py-2 px-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text" 
                      name="name"
                      placeholder="name"
                      value={credentials.name}
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
                      placeholder="password"
                      value={credentials.password}
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
                
                className="rounded-md bg-indigo-600 w-full py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  "
              >
                 Crear Cuenta
              </button>

               
            </div>
          </div>
        </form>

    </div>
  )
}
