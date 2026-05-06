import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminManageServices from './AdminManageServices';
import AdminManageCategories from './AdminManageCategories';
import './AdminDashboard.css';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [stats, setStats] = useState({ products: 0, services: 0, messages: 0 });
  const [recentMessages, setRecentMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const prodData = await getDocs(collection(db, 'products'));
        const servData = await getDocs(collection(db, 'services'));
        const msgQuery = query(collection(db, 'messages'), orderBy('createdAt', 'desc'), limit(5));
        const msgData = await getDocs(msgQuery);
        
        setStats({
          products: prodData.size,
          services: servData.size,
          messages: msgData.size // This is just the limit, maybe fetch all for count
        });

        // Better count for messages
        const allMsgs = await getDocs(collection(db, 'messages'));
        setStats(prev => ({ ...prev, messages: allMsgs.size }));

        setRecentMessages(msgData.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };
    if (activeTab === 'dashboard') fetchDashboardData();
  }, [activeTab]);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  async function handleLogout() {
    try {
      await logout();
      navigate('/admin/login');
    } catch (err) {
      console.error('Failed to log out', err);
    }
  }

  if (isMobile) {
    return (
      <div className="mobile-blocker">
        <div className="blocker-content">
          <h1>💻 Laptop Required</h1>
          <p>For the best management experience, the Wayby Admin Panel is only available on <strong>Tablets (iPad)</strong> and <strong>Laptops</strong>.</p>
          <button onClick={() => navigate('/')} className="btn-back">Go to Main Site</button>
        </div>
      </div>
    );
  }

  const toggleTab = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return <AdminManageServices />;
      case 'categories':
        return <AdminManageCategories />;
      default:
        return (
          <div className="dashboard-content">
            <div className="stats-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px'}}>
              <div className="stat-card" style={{background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'}}>
                <h3 style={{fontSize: '0.9rem', color: '#666', marginBottom: '10px'}}>Total Products</h3>
                <p className="stat-number" style={{fontSize: '2rem', fontWeight: '800', color: '#2c3e50'}}>{stats.products}</p>
              </div>
              <div className="stat-card" style={{background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'}}>
                <h3 style={{fontSize: '0.9rem', color: '#666', marginBottom: '10px'}}>Active Services</h3>
                <p className="stat-number" style={{fontSize: '2rem', fontWeight: '800', color: '#2c3e50'}}>{stats.services}</p>
              </div>
              <div className="stat-card" style={{background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'}}>
                <h3 style={{fontSize: '0.9rem', color: '#666', marginBottom: '10px'}}>Customer Messages</h3>
                <p className="stat-number" style={{fontSize: '2rem', fontWeight: '800', color: '#e67e22'}}>{stats.messages}</p>
              </div>
            </div>
            
            <div className="dashboard-sections" style={{display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px'}}>
              <div className="welcome-section" style={{background: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'}}>
                <h2 style={{marginBottom: '15px'}}>Welcome to Wayby Admin!</h2>
                <p>Everything is now connected to your database. Any changes you make in the tabs on the left will update the website instantly.</p>
                <div style={{marginTop: '25px', display: 'flex', gap: '15px'}}>
                   <button onClick={() => setActiveTab('categories')} className="btn-add" style={{width: 'auto'}}>+ Add New Product</button>
                   <button onClick={() => setActiveTab('services')} className="btn-add" style={{width: 'auto', background: '#34495e'}}>Manage Services</button>
                </div>
              </div>

              <div className="recent-messages" style={{background: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'}}>
                <h3 style={{marginBottom: '20px', fontSize: '1.1rem'}}>Recent Inquiries</h3>
                <div className="message-list">
                  {recentMessages.length > 0 ? recentMessages.map(msg => (
                    <div key={msg.id} style={{padding: '12px 0', borderBottom: '1px solid #eee'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                        <strong style={{fontSize: '0.9rem'}}>{msg.name}</strong>
                        <span style={{fontSize: '0.7rem', color: '#999'}}>{msg.createdAt?.toDate().toLocaleDateString()}</span>
                      </div>
                      <p style={{fontSize: '0.8rem', color: '#666', margin: 0, wordBreak: 'break-word', lineHeight: '1.4'}}>
                        {msg.message}
                      </p>
                    </div>
                  )) : (
                    <p style={{fontSize: '0.9rem', color: '#999', textAlign: 'center', marginTop: '30px'}}>No messages yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      <button className="mobile-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? '✕' : '☰ Menu'}
      </button>

      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Wayby Admin</h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => toggleTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`nav-item ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => toggleTab('services')}
          >
            Manage Services
          </button>
          <button 
            className={`nav-item ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => toggleTab('categories')}
          >
            Manage Categories
          </button>
        </nav>
        <div className="sidebar-footer">
          <p>{currentUser?.email}</p>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </aside>
      
      <main className="admin-main">
        <header className="admin-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
        </header>
        
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;

