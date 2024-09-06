import { useDispatch, useSelector } from 'react-redux'
import { LoginForm } from './components/LoginForm'
import { BlogList } from './components/BlogList'
import { NewBlogForm } from './components/NewBlogForm'
import { useEffect } from 'react'
import { LogoutButton } from './components/LogoutButton'
import { Notification } from './components/Notification'
import { initializeUser } from './actions/authActions'

function App() {     
      
  const dispatch = useDispatch(); // Hook para despachar acciones a Redux    
  const user= useSelector(state => state.login.user) // Hook para seleccionar el estado del usuario desde Redux
   
 // Efecto para inicializar el usuario desde localStorage
useEffect(() => {
   
initializeUser(dispatch)// Inicializa el usuario si hay datos en localStorage

},[dispatch])   

 
  return (      
    <>
      <div>
         {user ? (
                <div>
                    <p>Welcome, {/*user.user.username*/}!</p>
                    <Notification />
                     <LogoutButton/>
                    <NewBlogForm/>
                    <BlogList />
                </div>
            ) : (
              <div>
                  <Notification />
                  <LoginForm />
              </div>
              
            )}
      </div>
               
    </>
  )
}

export default App
