import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { IoIosArrowDown } from "react-icons/io";


const AuthMenu = ({ menuStyle, toggleMenu }) => {
  const { user, handleLogout, loading } = useAuth();
  const navigate = useNavigate();

  return (
    <section>
           <menu className={menuStyle}>
      <div className="relative group">
        <div className="flex items-center cursor-pointer" onClick={toggleMenu}>
          <img src="/images/khennycool.jpeg" alt="profile-pic" className="w-8 h-8 rounded-full" />
          <IoIosArrowDown fontSize={20} />
        </div>
        <div className="absolute right-0 top-0 pt-14 text-base font-medium text-secondary-200 z-20 hidden group-hover:block">
          <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-2 p-4 capitalize">
            <p onClick={() => navigate("/profile")} className="hover:text-black cursor-pointer">My Profile</p>
            <p onClick={() => navigate("/my-appointment")} className="hover:text-black cursor-pointer">My Appointment</p>
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="hover:text-black cursor-pointer"
            >
              {loading ? "Logging Out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>
    
         
      
    </menu>
   
    </section>
   
  );
};
export default AuthMenu;
