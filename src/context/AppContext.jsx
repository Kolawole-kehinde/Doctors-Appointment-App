import { createContext } from "react";
import { doctors } from '../constant/doctors/'

export const  AppContext = createContext();


const AppContextProvider = ({children}) =>{
    const currentSymbol = '$'
    return (
     <AppContext.Provider value={{
        doctors,
        currentSymbol
     }} >
        {children}
     </AppContext.Provider> 
    )
}

export default AppContextProvider
