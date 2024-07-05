import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SidebarLayout from '../components/sidebarLayout';
import Dashboard from '../pages/dashboard';
import MakePayment from '../pages/makepayment';
import ReferAndEarn from '../pages/referandearn';
import Rewards from '../pages/rewards';
import Product from '../pages/product';
import Popup from '../pages/popup';
import Banner from '../pages/banner';

function Layout() {
  return (
    <SidebarLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/makepayment" element={<MakePayment />} />
        <Route path="/referandearn" element={<ReferAndEarn />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/product" element={<Product />} />
        <Route path="/popup" element={<Popup />} />
        <Route path="/banner" element={<Banner />} />
      </Routes>
    </SidebarLayout>
  );
}

export default Layout;
