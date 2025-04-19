import React, { useState, useEffect } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, isLoading }) => {
  const [loadingPage, setLoadingPage] = useState(null);

  // Clear loading state when current page changes
  useEffect(() => {
    setLoadingPage(null);
  }, [currentPage]);

  // Handle page click with loading state
  const handlePageClick = (pageNumber) => {
    if (typeof pageNumber === 'number' && pageNumber !== currentPage) {
      setLoadingPage(pageNumber);
      // Simulate loading delay (remove this in production and replace with actual data fetching)
      setTimeout(() => {
        onPageChange(pageNumber);
      }, 300);
    }
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 10; // Increased to show up to 10 page numbers
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      // Calculate start and end of page range
      let startPage = Math.max(2, currentPage - 4); // Show more pages before current
      let endPage = Math.min(totalPages - 1, currentPage + 4); // Show more pages after current
      
      // Adjust if at start or end to always show maximum pages
      if (currentPage <= 5) {
        endPage = Math.min(totalPages - 1, 9); 
      } else if (currentPage >= totalPages - 4) {
        startPage = Math.max(2, totalPages - 8);
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always show last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
  
  return (
    <div className="flex flex-wrap items-center justify-center space-x-2 my-8">
      {/* Previous Button */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1 || isLoading || loadingPage !== null}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1 || isLoading || loadingPage !== null
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      
      {/* Page Numbers */}
      <div className="flex flex-wrap justify-center">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(page)}
            disabled={page === '...' || page === currentPage || isLoading || loadingPage !== null}
            className={`px-3 py-1 m-1 rounded-md ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : loadingPage === page
                  ? 'bg-blue-200 text-blue-700 animate-pulse'
                  : page === '...'
                    ? 'bg-white text-gray-700 cursor-default'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {loadingPage === page ? (
              <span className="flex items-center justify-center w-5 h-5">
                <span className="animate-spin h-3 w-3 border-t-2 border-b-2 border-blue-700 rounded-full"></span>
              </span>
            ) : (
              page
            )}
          </button>
        ))}
      </div>
      
      {/* Next Button */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading || loadingPage !== null}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages || isLoading || loadingPage !== null
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination; 