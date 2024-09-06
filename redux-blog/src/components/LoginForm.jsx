
import { useDispatch } from "react-redux"
 
import { useState } from "react"
 
import { login } from "../actions/authActions"


export const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  //const [username, setUsername] =  useState('');
  //const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  

const handleChange = (event) => {
  const { name, value } = event.target;

  setCredentials((prevState) => ({ 
    ...prevState, 
    [name]: value 
  
  }));

};

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await dispatch(login(credentials));

    setCredentials({
      username: '', 
      password: ''
    })
  } catch (error) {
     console.error("error")
  }
};

 

  return (
    <div> 
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Username:
          <input 
            type="text" 
             name="username"
             value={credentials.username}
           
             onChange={/*({target}) => setUsername(target.value)*/ handleChange }
             
          />
        </div>
        <div>
            Password:
            <input 
              type="password" 
              name="password"
              value={/*password*/ credentials.password}
              onChange={/*({ target }) => setPassword(target.value)*/ handleChange}

            />
        </div>
         
        <button type="submit">Login</button>
      </form>

    </div>
  )
}
