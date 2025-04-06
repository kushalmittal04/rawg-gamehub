
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../redux/gameSlice";
import "../styles/pagination.css";

const Pagination = ({ totalPages }) => {
  const dispatch = useDispatch();
  const { currentPage, searchQuery, filters } = useSelector((state) => state.games);
  const isFiltering = searchQuery || Object.values(filters).some(arr => arr.length > 0);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
      window.scrollTo(0, 0);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    pages.push(
      <button
        key={1}
        className={`page-btn ${currentPage === 1 ? "active" : ""}`}
        onClick={() => handlePageChange(1)}
      >
        1
      </button>
    );

    if (isFiltering) {
      // Limited pagination for search/filter
      if (currentPage > 1) {
        pages.push(
          <button
            key={2}
            className={`page-btn ${currentPage === 2 ? "active" : ""}`}
            onClick={() => handlePageChange(2)}
          >
            2
          </button>
        );
      }
      if (currentPage > 2) {
        pages.push(
          <span key="more" className="ellipsis">More..</span>
        );
      }
    } else {
      // Full pagination for normal browsing
      if (currentPage > 3) {
        pages.push(<span key="ellipsis1" className="ellipsis">...</span>);
      }

      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(
          <button
            key={i}
            className={`page-btn ${currentPage === i ? "active" : ""}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(<span key="ellipsis2" className="ellipsis">...</span>);
      }

      if (totalPages > 1) {
        pages.push(
          <button
            key={totalPages}
            className={`page-btn ${currentPage === totalPages ? "active" : ""}`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <div className="pagination-container">
      <button
        className="page-btn"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ◀ Prev
      </button>

      {renderPageNumbers()}

      <button
        className="page-btn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next ▶
      </button>
    </div>
  );
};

export default React.memo(Pagination);
