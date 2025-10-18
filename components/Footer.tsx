
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-base-200 text-gray-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} UI Forge. All rights reserved.</p>
            <p>Your one-stop shop for premium UI designs.</p>
          </div>
          <div className="flex space-x-6">
            <Link to="#" className="hover:text-white transition-colors">Facebook</Link>
            <Link to="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link to="#" className="hover:text-white transition-colors">Instagram</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
