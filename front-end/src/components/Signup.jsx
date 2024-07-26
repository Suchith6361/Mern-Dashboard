import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("false");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const HandleSubmit = async () => {
    if (!name || !email || !password) {
      setError(true);
      return false;
    }
    console.log(name, email, password);
    let result = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    localStorage.setItem("user", JSON.stringify(result));
    alert("You have successfully signed up");
    if (result) {
      navigate("/");
    }
  };
  return (
    <div
      className="items-center border border-black flex
    gap-6 px-12 flex-col absolute top-[20%] left-[30%] bg-gradient-to-tr from-black to-blue-600 rounded-lg"
    >
      <h1 className="text-3xl text-white mt-2 italic font-bold  ">Register</h1>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="w-[30vw] h-10 border border-black rounded-md pl-2"
        type="text"
        placeholder="Enter the Name"
      />
      {error && !name && (
        <span className="pt-[-8px]  text-red-700">Enter Valid Name</span>
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="w-[30vw] h-10 border border-black rounded-md pl-2"
        type="text"
        placeholder="Enter the Email"
      />
      {error && !email && (
        <span className="pt-[-8px]  text-red-700">Enter Valid email</span>
      )}

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="w-[30vw] h-10 border rounded-md border-black pl-2 "
        type="password"
        placeholder="Enter the Password"
      />
      {error && !password && (
        <span className="pt-[-8px]  text-red-700">Enter Valid Password</span>
      )}

      <button
        type="submit"
        onClick={HandleSubmit}
        className="border  bg-gradient-to-tr from-gray-200  to-blue-800  hover:from-black hover:to-blue-900 border-white bg-blue-500 p-2 mb-2 rounded-md  w-30 hover:text-white"
      >
        Signup
      </button>
    </div>
  );
};

export default Signup;
