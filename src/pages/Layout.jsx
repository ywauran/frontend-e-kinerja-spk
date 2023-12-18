import React from "react";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex mt-6 min-h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-200">
          <main className="p-4">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
