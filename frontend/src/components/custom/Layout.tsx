import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full sm:w-[100%] mx-auto">
      <Navbar />
      <main className="p-4 md:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
