import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const mobileMenuToggleRef = useRef(null);
  const dropdownRef = useRef(null);
  const leaveTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownMouseEnter = () => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    setIsCategoriesOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setIsCategoriesOpen(false);
    }, 300); // 300ms grace period
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation(); 
    setIsCategoriesOpen(prev => !prev);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsCategoriesOpen(false);
  };

  useEffect(() => {
    const shouldBlockScroll = isMobileMenuOpen;
    document.body.style.overflow = shouldBlockScroll ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto'; // Reset on unmount
    };
  }, [isMobileMenuOpen]);

  // Handle click outside mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        mobileMenuToggleRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !mobileMenuToggleRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
        setIsCategoriesOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Handle click outside categories dropdown on desktop
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isCategoriesOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsCategoriesOpen(false);
      }
    };

    if (isCategoriesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCategoriesOpen]);


  return (
    <>
      <header id='header' className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>

            <nav ref={mobileMenuRef} className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
              <HashLink to="/#" onClick={handleLinkClick}><li>Home</li></HashLink>
              <HashLink to="/#products" onClick={handleLinkClick}><li>Product</li></HashLink>

              <span id="main-dropdown" ref={dropdownRef} onMouseEnter={handleDropdownMouseEnter} onClick={handleDropdownClick} onMouseLeave={handleDropdownMouseLeave}>
                <li id="dropdown-cat">
                  <span id="cat">Categories</span>
                  <span className={`svg ${isCategoriesOpen ? 'open' : ''}`}>
                    <svg height="15" width="15" viewBox="0 0 630 700" xmlns="http://www.w3.org/2000/svg">
                      <path d="M622 106L311 417L0 106l65-65l246 245L556 41z" fill="currentColor" />
                    </svg>
                  </span>
                </li>
                {isCategoriesOpen && (
                  <ul id="dropdown" className="dropdown-open">
                    <HashLink to="/categories/LivingRoom#" onClick={handleLinkClick}><li>Living Room</li></HashLink>
                    <HashLink to="/categories/BedRoom#" onClick={handleLinkClick}><li>Bed Room</li></HashLink>
                    <HashLink to="/categories/TableAndShelf#" onClick={handleLinkClick}><li>Table And Shelf</li></HashLink>
                    <HashLink to="/categories/TVstands#" onClick={handleLinkClick}><li>TV Stands</li></HashLink>
                    <HashLink to="/categories/Wardrobe#" onClick={handleLinkClick}><li>Wardrobe</li></HashLink>
                    <HashLink to="/categories/Door#" onClick={handleLinkClick}><li>Door</li></HashLink>
                    <HashLink to="/categories/Office#" onClick={handleLinkClick}><li>Office</li></HashLink>
                    <HashLink to="/categories/KitchenAndDinning#" onClick={handleLinkClick}><li>Kitchen And Dining Tables</li></HashLink>
                    <HashLink to="/categories/Videos#" onClick={handleLinkClick}><li>Videos</li></HashLink>
                  </ul>
                )}
              </span>

              <HashLink to="/#services" onClick={handleLinkClick} ><li>Services</li></HashLink>
              <HashLink to="/#about" onClick={handleLinkClick} ><li>About Us</li></HashLink>
              <HashLink to="/#contact" onClick={handleLinkClick} ><li>Contact</li></HashLink>
            </nav>

            {isMobileMenuOpen
              ? <button
                ref={mobileMenuToggleRef}
                onClick={() => {
                  setIsMobileMenuOpen(prev => !prev);
                  setIsCategoriesOpen(false);
                }}
                style={{ fontSize: '20px', fontWeight: 'bold', marginRight: '12px' }}
              >✕</button>
              : <button
                ref={mobileMenuToggleRef}
                className="mobile-menu-toggle"
                onClick={() => {
                  setIsMobileMenuOpen(prev => !prev);
                  setIsCategoriesOpen(false);
                }}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>}
          </div>
        </div>
      </header>
      <div style={{ height: '60px' }} id='fixed'></div>
    </>
  );
};

export default Header;