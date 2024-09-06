 
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import { LoginForm } from "./components/LoginForm"
import { CreateAccount } from './components/CreateAccount';
import { BlogList } from './components/BlogList';
import { useAuth } from './hooks/useAuth';
import { NewBlogForm } from './components/NewBlogForm';
import { Menu } from './components/Menu';
import { LoginMenu } from './components/LoginMenu';
import { Notification } from './components/Notification';
import { Users } from './components/Users';
import { UserBlogs } from './components/UserBlogs';
import { Blogs } from './components/Blogs';
import { useEffect } from 'react';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
   const { state, dispatch} = useAuth() // Usar el contexto de autenticación
    
   
   // Efecto para cargar el usuario desde localStorage cuando se monta el componente
useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        dispatch({ type: 'LOGIN', payload: user });// Establecer el usuario en el estado
    }
}, [dispatch]);

 
if (!state) {
  return <div>Cargando...</div>;
}
  return (
    <>
     <div>
        { 
     <Router>
        <ScrollToTop/>
        <Notification />
         
        <nav>
            {state.username && <Menu />}
            {!state.username &&  <LoginMenu/>  /*<Link   to="/login">login</Link>*/}
            {/*!state.username &&  <Link   to="/CreateAccount">CreateAccount</Link>*/}  

        </nav>
        <Routes>
          <Route path="/" element={state.username ? <BlogList  /> : <Navigate to="/login" />} />
          <Route path="/add-blog" element={state.username ? <NewBlogForm /> : <Navigate to="/login" />} />
          <Route path="/users" element={state.username ? <Users /> : <Navigate to="/login" />} />
          <Route path="/userBlogs/:id" element={state.username ? <UserBlogs /> : <Navigate to="/login" />} />
          <Route path="/blogs/:id" element={state.username ? <Blogs /> : <Navigate to="/login" />} />
          <Route path="/login" element={state.username ? <Navigate to="/" /> : <LoginForm />} />
          <Route path="/CreateAccount" element={state.username ? <Navigate to="/" /> : <CreateAccount />} />
        </Routes>
     </Router>
          }
     </div>
    </>
  )
}

export default App
