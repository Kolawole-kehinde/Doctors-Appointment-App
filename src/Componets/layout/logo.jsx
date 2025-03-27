import React from "react";
import { NavLink } from "react-router";

const Logo = () => {
  return (
    <>
      <NavLink to="/">
        <img
          src="/images/logo-2.png"
          alt="Logo"
          className="size-[50px] md:size-[100px] "
        />
      </NavLink>
    </>
  );
};

export default Logo;
