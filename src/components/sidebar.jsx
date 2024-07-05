// common/sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

function Sidebar({ sidebarOpen, toggleSidebar }) {
  return (
    
    <aside className={`p2sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="p2store">
        <img src='/kanan.svg' alt='' className='img' />
        <div className="text">Kannan departmental
          <img src='/down.svg' alt='' />
        </div>
      </div>
      <nav>
        <ul>
          <li className="p3active">
            <Link to="/dashboard" className="no-underline">
              <img src='/dashboard.svg' alt='' className="dashboard-icon" />
              <span className="dashboard-text">Dashboard</span>
            </Link>
          </li>
          <li>
            <img src='/orders.svg' alt='' />
            Orders
          </li>
          <li>
            <img src='/products.svg' alt='' />
            My Products
          </li>
          <li>
            <img src='/profile.svg' alt='' />
            Profile
          </li>
        </ul>
      </nav>
      {sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </aside>
  );
}

export default Sidebar;
