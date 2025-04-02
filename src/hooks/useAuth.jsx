import { useContext } from "react"
import { AppContext } from "../context/AppContext"


export const useAuth = () =>{
    return useContext(AppContext)
}