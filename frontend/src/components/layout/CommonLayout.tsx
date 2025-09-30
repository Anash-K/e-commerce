import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const CommonLayout: React.FC<DashboardLayoutProps> = ({ children }) => {

  return (
    <div className="flex min-h-screen">
      {/* Main content */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default CommonLayout;
