import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-white mb-2">
              E commerce Task
            </h2>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} E commerce Task. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 space-y-2 md:space-y-0">
            <Link to="/" className=" hover:text-white">
              Home
            </Link>
            <Link to="/cart" className=" hover:text-white">
              Cart
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
