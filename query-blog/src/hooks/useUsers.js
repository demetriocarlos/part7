
import { useQuery } from "@tanstack/react-query"
import userServices from "../services/userServices"
import { useMutation } from "@tanstack/react-query"
import { useNotification } from "./useNotification"
import { useNavigate } from "react-router-dom"

export const useUser = () => {

    return useQuery({
        queryKey: ["users"],
        queryFn: userServices.getUsers,

        onSuccess:() => {

        },
        onError: (error) => {
            console.log("error al optener los datos", error)
        }

    })

}


export const useCreateUser= () => {
    const navigate = useNavigate();
    const{dispatch: notificationDispatch} = useNotification()
    
    const newUserMutation = useMutation({
        mutationFn:userServices.createUser,
        onSuccess:() => {
            notificationDispatch({
                type: 'SET_NOTIFICATION',
                payload: { message: "Usuario creado correctamente", type: "success" }
            });

             // Redirige al componente de inicio de sesión
             navigate('/login');
        },
        onError:(error) => {
            console.log('error al crear una cuenta',error)
            notificationDispatch({
                type: 'SET_NOTIFICATION',
                payload: { message: error.response?.data?.error || 'Error desconocido', type: "error" }
            });
        }
    })

    return newUserMutation
}




