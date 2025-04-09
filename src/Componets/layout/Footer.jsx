import React from 'react';
import Logo from "../Logo";



const Footer = () => {
  return (
    <footer className="wrapper py-10 font-outfit px-4 lg:px-0 text-secondary-300">
      <div className="flex flex-col lg:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 lg:mt-40 text-sm">
        {/* Company Description Section */}
        <div className="w-full max-w-[646px]">
          <Logo/>
          <p className="text-base leading-[25px] md:text-lg md:leading-[30px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h1 className="text-[22px] leading-[30px] font-semibold mb-5">Company</h1>
          <ul className="flex flex-col gap-2 text-lg leading-[30px]">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h1 className="text-[22px] leading-[30px] font-semibold mb-5">Get In Touch</h1>
          <ul className="flex flex-col gap-2 text-lg leading-[30px]">
            <li>+234-703-736-1571</li>
            <li>kolawolekehinde7033@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <p className="text-sm md:text-lg leading-[30px] text-center py-4 border-t border-secondary-100">
        Copyright © 2024 Khennycool - All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
