import React from "react";
import { useState } from "react";

const MyProfilePage = () => {
  const [userData, setUserData] = useState({
    name: "kolawole kehinde",
    image:
      "https://res.cloudinary.com/daarrcw3q/image/upload/v1743400008/khennycool_kolspu.jpg",
    email: "kolawolekehinde7033@gmail.com",
    phone: "+234 703 736 1571",
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Church Road, London",
    },
    gender: "Male",
    dob: "2000-01-19",
  });
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="wrapper">
      <img src={userData.image} alt="profile-picture" />
      {isEdit ? <input type="text" value={userData.name} onChange={e => userData(prev => ({...prev,name:e.target.value}))} />
      : <p>{userData.name}</p>}
       <hr />
       <div>
         <p>CONTACT INFORMATION</p>
          <div>
               <p>Email id:</p>
               <p>{userData.email}</p>
               <p>Phone:</p>
               {isEdit ? <input type="text" value={userData.phone} onChange={e => userData(prev => ({...prev,phone:e.target.value}))} />
      : <p>{userData.phone}</p>}
         <p>Address:</p>
         {
          isEdit ? <p>
            <input type="text" value={userData.address.line1} onChange={e => userData(prev => ({...prev,address, line1: e.target.value}))} />
            <br />
            <input type="text" value={userData.address.line2} onChange={e => userData(prev => ({...prev,address, line2: e.target.value}))} />
          </p> : <p>
            {userData.address.line1}
            <br />
            {userData.address.line2}
          </p>
         }
      

          </div>
       </div>
         <div>
             <p>BASIC INFORMATION</p>
              <div>
                  <p>Gender:</p>
                  {isEdit ? <select value={userData.gender} onChange={e => userData(prev => ({...prev, gender: e.target.value}))}>
                     <option value="Male">Male</option>
                     <option value="Female">Female</option>

                  </select>
      : <p>{userData.gender}</p>}
             <p>Birthday:</p>
                  {
                    isEdit ? <input type="date" value={userData.dob} onChange={e => userData(prev => ({...prev, dob: e.target.value}))} />
                    : <p>{userData.dob}</p>
                  }
              </div>
         </div>
    </div>
  );
};

export default MyProfilePage;
