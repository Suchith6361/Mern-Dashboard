import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateComponent from "./components/PrivateComponent";
import LoginPage from "./components/LoginPage";
import AddProducts from "./components/AddProducts";
import ProductList from "./components/ProductList";
import Profile from "./components/Profile";
import Update from "./components/Update";

import UpdateProducts from "./components/UpdateProducts";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route element={<PrivateComponent />}>
            <Route
              path="/"
              element={
                <h1>
                  <ProductList />
                </h1>
              }
            />
            <Route path="/add" element={<AddProducts />} />
            <Route path="/update/:id" element={<UpdateProducts />} />
            <Route path="/update" element={<Update />} />
            <Route path="/logout" element={<h1>logout</h1>} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/loginPage" element={<LoginPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
