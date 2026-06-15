import React from "react";

import {
  LayoutDashboard,
  ShoppingBag,
  PlusSquare,
  Package,
  LogOut
} from "lucide-react";

import {
  Link,
  useNavigate
} from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (

    <div className="w-64 bg-black text-white p-5 min-h-screen">

      <h1 className="text-3xl font-bold mb-10 text-pink-500">

        Admin Panel

      </h1>

      <div className="flex flex-col gap-6">

        {/* Product Dashboard */}
        <Link
          to="/admin/productdashboard"
          className="flex items-center gap-3 hover:text-pink-400 duration-300"
        >

          <LayoutDashboard size={20} />

          Product Dashboard

        </Link>

        {/* Add Product */}
        <Link
          to="/admin/addproduct"
          className="flex items-center gap-3 hover:text-pink-400 duration-300"
        >

          <PlusSquare size={20} />

          Add Product

        </Link>

        {/* Category Management */}
        <Link
          to="/admin/categarymanagemant"
          className="flex items-center gap-3 hover:text-pink-400 duration-300"
        >

          <ShoppingBag size={20} />

          Category Management

        </Link>

        {/* Order Management */}
        <Link
          to="/admin/ordermanagemant"
          className="flex items-center gap-3 hover:text-pink-400 duration-300"
        >

          <Package size={20} />

          Order Management

        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-500 hover:text-red-400 duration-300"
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </div>
  );
};

export default Dashboard;