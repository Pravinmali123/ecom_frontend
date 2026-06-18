import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { useContext } from "react";

import MyContext from "../context/MyContext";

const Header = () => {
  const { setSearch } = useContext(MyContext);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  // const [search, setSearch] = useState("");
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

 const handlelogout = ()=>{

localStorage.removeItem(
"token"
);

localStorage.removeItem(
"user"
);

setCartCount(0);

navigate("/");

}

  const [cartCount, setCartCount] = useState(0);
  // const [products, setProducts] = useState([]);

  // const handleSearch = async () => {

//  navigate(`/product?search=${search}`);

// };

  const getCartCount = async () => {

try {

const token =
localStorage.getItem(
"token"
);

if(!token){

setCartCount(0);

return;

}

const res =
await axios.get(

"https://ecom-backend-4mkw.onrender.com/cart",

{

headers:{

authorization:
token

}

}

);

const totalItems =
res.data.data.reduce(

(total,item)=>

total+
item.quantity,

0

);

setCartCount(
totalItems
);

}

catch(error){

console.log(
error
);

setCartCount(0);

}

};
useEffect(()=>{

if(token){

getCartCount();

}

else{

setCartCount(0);

}

},[token]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-2">

        {/* Logo */}
      <img src={logo} alt="logo" className="h-10" />

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 items-center font-medium">
          <li>
            <Link to="/" className="hover:text-pink-600">Home</Link>
          </li>
          {/* <li>
            <Link to="/product" className="hover:text-pink-600">Product</Link>
          </li> */}
          <li>
            <Link to="/order" className="hover:text-pink-600">Order</Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-pink-600">Cart</Link>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="hidden md:flex w-1/3">
        <input
  type="text"
  placeholder="Search products..."
  className="w-full border rounded-l-lg px-3 py-1 outline-none focus:ring-2 focus:ring-pink-400"
  value={input}
  onChange={(e) => setInput(e.target.value)}
/>
          <button onClick={() => setSearch(input)}  className="bg-pink-600 text-white px-4 rounded-r-lg hover:bg-pink-700">
            Search
          </button>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-6">

          {
  token ? (
    <button onClick={handlelogout} className="bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-700">
      Logout
    </button>
  ) : (
    <Link to="/login" className="bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-700">
      Login
    </Link>
  )
}
          {/* <Link to="/login" className="bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-700">
            Login
          </Link> */}

          <Link to="/cart" className="relative text-xl">
            🛒
            <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs px-2 rounded-full">
               {cartCount}           </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden px-6 transition-all duration-300 ${
          open ? "max-h-[400px] py-4" : "max-h-0 overflow-hidden"
        }`}
      >
        {/* Mobile Search */}
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border px-3 py-1 rounded-l"
          />
          <button className="bg-blue-600 text-white px-3 rounded-r">
            Go
          </button>
        </div>

        <div className="flex flex-col gap-3 font-medium">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/product" onClick={() => setOpen(false)}>Product</Link>
          <Link to="/order" onClick={() => setOpen(false)}>Order</Link>
          <Link to="/cart" onClick={() => setOpen(false)}>Cart 🛒</Link>
          <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
        </div>
      </div>
    </nav>
    
  );

};

export default Header;