import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';


const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        {/* <Navbar /> */}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-white">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
