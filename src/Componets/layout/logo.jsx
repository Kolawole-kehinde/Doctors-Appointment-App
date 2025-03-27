import React from "react";
import { NavLink } from "react-router";

const Logo = ({toggleMenu}) => {
  return (
    <>
      <NavLink to="/">
        <img
          src="/images/logo-2.png"
          alt="Logo"
          className="size-[50px] md:size-[100px]"
          onClick={toggleMenu}
        />
      </NavLink>
    </>
  );
};

export default Logo;
