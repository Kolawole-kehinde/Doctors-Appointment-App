import { createContext } from "react";
import { doctors } from '../constant/doctors/'
import LocalStorageService from "../utils/handleLocalStorage";

export const  AppContext = createContext();


const AppContextProvider = ({children}) =>{
    const currentSymbol = '$'

            //  Handle User
  const { getItem, setItem, clear } = LocalStorageService;
  const getUser = getItem("auth");
  const [user, setUser] = useState(getUser ? getUser : null);
//   const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setItem("auth", user);
    }
  }, [user, setItem]);
    return (
     <AppContext.Provider value={{
        doctors,
        currentSymbol,
        user, 
        setUser,
     }} >
        {children}
     </AppContext.Provider> 
    )
}

export default AppContextProvider
