import React from "react";
import { specailityData } from "../constant/specailityMenu";
import { Link} from "react-router";


const SpecialityMenu = () => {
  return (
    <section id="Speciality" className="wrapper flex flex-col items-center justify-center py-10 text-center px-4 lg:px-0">
      
        <h1 className="text-[2.5rem] font-medium font-outfit text-primary-100 text-center pb-2">
          Find by Speciality{" "}
        </h1>
        <p className="w-full max-w-[573px] text-lg leading-[27px] text-secondary-300 font-outfit">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </p>
    

      <div className="flex items-center justify-center gap-4 pt-10 w-full overflow-scroll">
           {
            specailityData?.map(({id, image, speciality}) => (
              <Link key={id} to={`/doctors/${speciality}`} className="flex flex-col items-center text-xs  cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500">
                  <img src={image} alt={speciality}  className="w-16 sm:w-24 mb-2"/>
                  <p className="text-lg leading-[27px] font-outfit text-secondary-300 py-4">{speciality}</p>
              </Link>
            ))
           }
      </div>
    </section>
  );
};

export default SpecialityMenu;
