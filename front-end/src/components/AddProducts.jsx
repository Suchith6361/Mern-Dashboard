import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const HandleChange = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    console.log(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    navigate("/");
    console.log(result);
  };

  return (
    <div
      className="items-center border border-blue-700 flex
    gap-4 px-12 flex-col absolute top-[15%] left-[30%]  bg-gradient-to-tr from-black to-blue-600 rounded-lg"
    >
      <h1 className="text-3xl font-bold text-white mt-4 italic">
        {" "}
        Add Products
      </h1>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="pl-2 pt-4 rounded-md w-[30vw] h-10 border border-transparent border-black"
        type="text"
        placeholder="Enter Product Name"
      />
      {error && !name && (
        <span className="pt-[-8px]  text-red-700">Enter Valid Name</span>
      )}
      <input
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        className="pl-2 pt-4 rounded-md w-[30vw] h-10 border border-transparent border-black"
        type="text"
        placeholder="Enter Product Price"
      />
      {error && !price && (
        <span className="  text-red-700">Enter Valid Price</span>
      )}
      <input
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        className="pl-2 pt-4 rounded-md w-[30vw] h-10 border border-transparent border-black"
        type="text"
        placeholder="Enter Category"
      />
      {error && !category && (
        <span className="  text-red-700">Enter Valid Category</span>
      )}
      <input
        onChange={(e) => setCompany(e.target.value)}
        value={company}
        className="pl-2 pt-4 rounded-md w-[30vw] h-10 border border-transparent border-black"
        type="text"
        placeholder="Enter Product Company"
      />
      {error && !company && (
        <span className="mr-  text-red-700">Enter Valid Company</span>
      )}
      <button
        onClick={HandleChange}
        className="border  bg-gradient-to-tr from-gray-200  to-blue-800  hover:from-black hover:to-blue-900 border-white bg-blue-500 p-2 mb-4 rounded-md  w-30 hover:text-white"
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProducts;
