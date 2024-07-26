import React from "react";
import image from "../Images/MERN.webp";

const Profile = () => {
  return (
    <div>
      <img
        src={image}
        alt="profile"
        className="profile-image  mt-[50px] ml-[350px]"
      />
    </div>
  );
};

export default Profile;
