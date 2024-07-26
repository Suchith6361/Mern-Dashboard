import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      Navigate("/");
    }
  }, [Navigate]);

  const HandleLogin = async () => {
    console.log(email, password);
    try {
      let result = await fetch("http://localhost:5000/login", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result) {
        result = await result.json();
        console.log(result);

        localStorage.setItem("user", JSON.stringify(result));

        Navigate("/");
      } else {
        alert("please enter correct Details");
      }
    } catch (error) {
      setError("Invalid Email or Password");
    }
  };
  return (
    <div
      className="items-center border bg-gradient-to-tr from-black to-blue-600 border-blue-800 flex
    gap-6 px-12 flex-col absolute top-[20%] left-[30%] rounded-lg "
    >
      <h1 className="mt-2 text-3xl text-white italic font-bold">Login</h1>
      <input
        className="pl-2 mt-4 rounded-md w-[30vw] h-10 border border-transparent border-black"
        type="text"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <input
        className="pl-2 rounded-md w-[30vw] h-10 border border-black border-transparent"
        type="Password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        onClick={HandleLogin}
        className="border  bg-gradient-to-tr from-gray-200  to-blue-800  hover:from-black hover:to-blue-900 border-white bg-blue-500 p-2 mb-2 rounded-md  w-30 hover:text-white"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
