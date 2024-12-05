import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  return (
    <div className="d-flex flex-column vh-100">
      {/* Top Sidebar */}
      <div className="bg-warning text-dark py-2 px-3">
        <nav className="d-flex justify-content-between">
          <a href="#" className="nav-link text-dark">
            Top Menu 1
          </a>
          <a href="#" className="nav-link text-dark">
            Top Menu 2
          </a>
          <a href="#" className="nav-link text-dark">
            Top Menu 3
          </a>
          <a href="#" className="nav-link text-dark">
            Top Menu 4
          </a>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="d-flex flex-grow-1">
        {/* Vertical Sidebar */}
        <div
          className="d-flex flex-column bg-primary text-white"
          style={{ width: '250px' }}
        >
          {/* Blue Background Header */}
          <div className="bg-primary text-center py-3">
            <h4>Menu Header</h4>
          </div>

          {/* Sidebar Menu */}
          <nav className="nav flex-column mt-3">
            <a href="#" className="nav-link text-white">
              Menu 1
            </a>
            <a href="#" className="nav-link text-white">
              Menu 2
            </a>
            <a href="#" className="nav-link text-white">
              Menu 3
            </a>
            <a href="#" className="nav-link text-white">
              Menu 4
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4">
          <h1>Welcome to the Main Content</h1>
          <p>This is where your main content will go.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
