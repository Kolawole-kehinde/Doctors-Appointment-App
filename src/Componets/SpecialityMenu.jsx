import React from "react";
import { specailityData } from "../constant/specailityMenu";
import { Link } from "react-router";


const SpecialityMenu = () => {
  return (
    <div className="wrapper flex flex-col items-center justify-center py-10 text-center">
      
        <h1 className="text-[2.5rem] font-medium font-outfit text-primary-100 text-center pb-6">
          Find by Speciality{" "}
        </h1>
        <p className="w-full max-w-[573px] text-lg leading-[27px] text-secondary-300 font-outfit text-center">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </p>
    

      <div className="flex items-center justify-center gap-4 pt-20">
           {
            specailityData?.map(({id, image, name}) => (
              <Link key={id} to='/doctors'>
                  <img src={image} alt={name} />
                  <p className="text-lg leading-[27px] font-outfit text-secondary-300 py-4">{name}</p>
              </Link>
            ))
           }
      </div>
    </div>
  );
};

export default SpecialityMenu;
