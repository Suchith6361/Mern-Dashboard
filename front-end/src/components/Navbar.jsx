import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../Images/4844694.jpg";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div className="bg-gradient-to-tr from-black to-blue-600 w-full">
      <ul className=" flex gap-10   text-white ">
        <li>
          <img className="w-14 ml-4  border rounded-3xl" src={Image} alt="" />{" "}
        </li>
        {auth ? (
          <ul className=" flex gap-10 p-4  text-white">
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/add">Add Product</Link>
            </li>
            <li>
              <Link to="/update">Update Product</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <Link onClick={logout} to="/signup">
              Logout ({JSON.parse(auth).name})
            </Link>
          </ul>
        ) : (
          <ul className=" w-full justify-end pr-8 flex gap-10 p-4 bg-gradient-to-tr from-black to-blue-600 text-white">
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/LoginPage">Login</Link>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
};
export default Navbar;
