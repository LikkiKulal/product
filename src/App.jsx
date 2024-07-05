import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/layout';
import Dashboard from './pages/dashboard';
import Banner from './pages/banner';
import Product from './pages/product';
import MakePayment from './pages/makepayment';
import Popup from './pages/popup';
import ReferAndEarn from './pages/referandearn';
import Rewards from './pages/rewards';


function App() {
  return (

    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/product" element={<Product />} />
        <Route path="/makepayment" element={<MakePayment />} />
        <Route path="/popup" element={<Popup />} />
        <Route path="/referandearn" element={<ReferAndEarn />} />
        <Route path="/rewards" element={<Rewards />} />

      </Routes>
    </Layout>

  );
}

export default App;