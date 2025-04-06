import React, { useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import Filters from "./Filters";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaFilter />}
      </button>
      {isOpen && (
        <div className="sidebar-content">
          <h3 className="sidebar-heading">Filters</h3>
          <Filters />
        </div>
      )}
    </div>
  );
};

export default React.memo(Sidebar);