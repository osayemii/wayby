import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Categories from './components/Categories';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NotFound from './NotFound';
import ServiceWorks from './components/ServiceWorks';

import LivingRoom from './categories/LivingRoom';
import KitchenAndDinning from './categories/KitchenAndDinning';
import BedRoom from './categories/BedRoom';
import Wardrobe from './categories/Wardrobe';
import Office from './categories/Office';
import Door from './categories/Door';
import TVstands from './categories/TVstands';
import TableAndShelf from './categories/TableAndShelf';
import Videos from './categories/Videos';

import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          {/* Admin Routes - These don't use the standard Header/Footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* Main Website Routes */}
          <Route path="/*" element={
            <>
              <Header />
              <main>
                <Routes>
                  {/* Home page */}
                  <Route path="/" element={
                    <>
                      <Hero />
                      <FeaturedProducts />
                      <Categories />
                      <Services />
                      <About />
                      <Contact />
                    </>
                  } />

                  {/* Category pages */}
                  <Route path="/categories/LivingRoom" element={<LivingRoom />} />
                  <Route path="/categories/KitchenAndDinning" element={<KitchenAndDinning />} />
                  <Route path="/categories/BedRoom" element={<BedRoom />} />
                  <Route path="/categories/Wardrobe" element={<Wardrobe />} />
                  <Route path="/categories/Office" element={<Office />} />
                  <Route path="/categories/Door" element={<Door />} />
                  <Route path="/categories/TVstands" element={<TVstands />} />
                  <Route path="/categories/TableAndShelf" element={<TableAndShelf />} />
                  <Route path="/categories/Videos" element={<Videos />} />

                  {/* Service works page */}
                  <Route path="/services/:id" element={<ServiceWorks />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;