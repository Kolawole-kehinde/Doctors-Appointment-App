import React from "react";
import { navRoutes } from "../../constant/NavRoutes";
import AuthMenu from "./AuthMenu";
import { NavLink } from "react-router";
import { useAuth } from "../../hooks/useAuth";


const Menu = ({ toggleMenu, menuStyle}) => {
  const active = (isActive) => (isActive ? "text-primary" : "text-gray-500");

  const { user } = useAuth();

  return (
    <menu className={menuStyle}>
      {
        navRoutes?.map(({ id, name, path }) => (
          <li key={id}>
            <NavLink to={path} className={({ isActive }) => active(isActive)}
            onClick={toggleMenu}>
              {name}
            </NavLink>
          </li>
        ))
        
      }
    
    </menu>
  );
};

export default Menu;
