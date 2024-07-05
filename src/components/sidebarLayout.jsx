import React, { useState } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import './sidebarLayout.css';

function SidebarLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout">
      <Header />
      <div className="main-container">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default SidebarLayout;