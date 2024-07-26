import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.log(params);
    let result = await fetch(`http://localhost:5000/products/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };
  const updateProduct = async () => {
    console.log(name, price, category, company);
    let result = await fetch(`http://localhost:5000/products/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      navigate("/");
    }
  };
  return (
    <div
      className="items-center border border-blue-700 flex
    gap-4 px-12 flex-col absolute top-[15%] left-[30%]  bg-gradient-to-tr from-black to-blue-600 rounded-lg"
    >
      <h1 className="text-3xl text-white mt-2 italic font-bold">
        {" "}
        Update Products
      </h1>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="pl-2 pt-4 rounded-md w-[30vw] h-10 border border-transparent border-black"
        type="text"
        placeholder="Enter Product Name"
      />

      <input
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        className="pl-2 pt-4 rounded-md w-[30vw] h-10 border border-transparent border-black"
        type="text"
        placeholder="Enter Product Price"
      />

      <input
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        className="pl-2 pt-4 rounded-md w-[30vw] h-10 border border-transparent border-black"
        type="text"
        placeholder="Enter Category"
      />

      <input
        onChange={(e) => setCompany(e.target.value)}
        value={company}
        className="pl-2 pt-4 rounded-md w-[30vw] h-10 border border-transparent border-black"
        type="text"
        placeholder="Enter Product Company"
      />

      <button
        onClick={updateProduct}
        className="border  bg-gradient-to-tr from-gray-200  to-blue-800  hover:from-black hover:to-blue-900 border-white bg-blue-500 p-2 mb-4 rounded-md  w-30 hover:text-white "
      >
        Update Product
      </button>
    </div>
  );
};

export default UpdateProducts;
