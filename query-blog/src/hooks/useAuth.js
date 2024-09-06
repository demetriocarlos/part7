
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


// Crear un hook para usar el contexto de autenticación
export const useAuth = ()=> {
    return useContext(AuthContext);
}



    




