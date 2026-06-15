import React from "react";

import { Outlet } from "react-router-dom";

import Dashboard from "../Page/Dashbord";

const DashboardLayout = () => {

  return (

    <div className="flex min-h-screen bg-gray-200">

      {/* Sidebar */}
      <Dashboard />

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Topbar */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">

          <h1 className="text-3xl font-bold">

            Welcome Admin 

          </h1>

        </div>

        {/* Dynamic Page Content */}
        <div className="bg-white p-5 rounded-xl shadow min-h-[80vh]">

          <Outlet />

        </div>

      </div>

    </div>
  );
};

export default DashboardLayout;