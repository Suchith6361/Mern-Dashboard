import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const HandleChange = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      setProducts(result);
    } else {
      getProducts();
    }
  };

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/getProduct");
    result = await result.json();
    setProducts(result);
  };
  console.log("products", products);

  const DeleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/products/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };
  return (
    <div className="text-center mt-10">
      <h1 className=" text-3xl font-bold text-blue-700"> Producst list </h1>
      <input
        type="text"
        placeholder="Search..."
        className="transition rounded-sm mt-4 border border-blue-700 p-3 w-60"
        onChange={HandleChange}
      />
      <ul className="mt-4 ">
        <li className="p-2 w-40 inline-block border border-blue-500">Sl.No</li>
        <li className="p-2 w-40 inline-block border border-blue-500">
          {" "}
          Product Name
        </li>
        <li className="p-2 w-40 inline-block border border-blue-500">Price</li>
        <li className="p-2 w-40 inline-block border border-blue-500">
          Category
        </li>
        <li className="p-2 w-40 inline-block border border-blue-500">
          Company
        </li>
        <li className="p-2 w-52 inline-block border border-blue-500">
          Operation
        </li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li className="p-2 w-40 inline-block border border-blue-500">
              {index + 1}
            </li>
            <li className="p-2 w-40 inline-block border border-blue-500">
              {item.name}
            </li>
            <li className="p-2 w-40 inline-block border border-blue-500">
              {item.price}
            </li>
            <li className="p-2 w-40 inline-block border border-blue-500">
              {item.category}
            </li>
            <li className="p-2 w-40 inline-block border border-blue-500">
              {item.company}
            </li>
            <li className="p-2 w-52 inline-block border border-blue-500">
              <button
                onClick={() => DeleteProduct(item._id)}
                className="bg-red-600 hover:bg-red-500 text-white w-20 rounded-md mr-2"
              >
                Delete
              </button>
              <Link to={"/update/" + item._id}>
                <button className="bg-blue-600 hover:bg-blue-500 text-white w-20 rounded-md mr-2">
                  Update
                </button>
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <h1 className="font-bold text-2xl ">Products Not Found</h1>
      )}
    </div>
  );
};

export default ProductList;
