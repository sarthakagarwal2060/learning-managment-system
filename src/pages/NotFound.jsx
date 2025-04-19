import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 text-center py-12">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
        <div className="text-9xl font-bold text-blue-600 mb-4">404</div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        
        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
          
          <Link 
            to="/courses" 
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition"
          >
            Explore Courses
          </Link>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Looking for something else?</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/about" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 