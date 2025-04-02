import { createContext, useEffect, useState } from "react";
import { doctors } from '../constant/doctors/';
import LocalStorageService from "../utils/handleLocalStorage";
import toast from "react-hot-toast";
import { supabase } from "../libs/supabase";
import { useNavigate } from "react-router";



export const AppContext = createContext({
  user: null,
  setdata: (data) => {},
  handleLogout: () => {},
  loading: false,
});

const AppContextProvider = ({children}) => {
  const [loading, setLoading] = useState(false);
  const currentSymbol = '$';

  // Handle User
  const { getItem, setItem, clear } = LocalStorageService;
  const getUser = getItem("auth");
  const [user, setUser] = useState(getUser ? getUser : null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setItem("auth", user);
    }
  }, [user, setItem]);

  // Handle Logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      let { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      clear();
      navigate("/auth/login");
    } catch (error) {
      toast.error(error.message );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{
      doctors,
      currentSymbol,
      user,
      setUser,
      handleLogout,
      loading,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
