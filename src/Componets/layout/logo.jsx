import React from "react";
import { NavLink } from "react-router";

const Logo = ({toggleMenu}) => {
  return (
    <>
      <NavLink to="/" className="flex items-center">
        <img
          src="/images/logo-2.png"
          alt="Logo"
          className="size-[50px] md:size-[75px]"
          onClick={toggleMenu}
        />
        <p className="text-[34px] font-semibold font-outfit text-primary capitalize">Khenny</p>
      </NavLink>
    </>
  );
};

export default Logo;
