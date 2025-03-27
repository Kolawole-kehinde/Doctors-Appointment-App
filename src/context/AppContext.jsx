import { createContext } from "react";
import { doctors } from '../constant/doctors/'

export const  AppContext = createContext();


const AppContextProvider = ({children}) =>{
   
    return (
     <AppContext.Provider value={{
        doctors
     }} >
        {children}
     </AppContext.Provider> 
    )
}

export default AppContextProvider
