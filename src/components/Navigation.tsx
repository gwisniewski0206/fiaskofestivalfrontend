import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import './Navigation.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Lineup', path: '/lineup' },
    { name: 'Info', path: '/info' },
    { name: 'Location', path: '/location' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Geometric Logo - Top Left */}
      <div className="navigation-logo-container">
        <Link to="/" className="navigation-logo-block">
          <div className="navigation-logo-relative">
            <div className="navigation-logo-bg">
              <div className="navigation-logo-inner">
                <Zap className="navigation-logo-icon" size={20} />
                <span className="navigation-logo-text">
                  NEXUS
                </span>
              </div>
            </div>
            <div className="navigation-logo-accent"></div>
          </div>
        </Link>
      </div>

      {/* Geometric Navigation - Top Right */}
      <div className="navigation-container">
        {/* Desktop Navigation */}
        <div className="navigation-desktop-hidden">
          <div className="navigation-desktop-relative">
            <div className="navigation-desktop-bg">
              <div className="navigation-desktop-inner">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`navigation-item ${
                      isActive(item.path) ? 'navigation-item-active' : 'navigation-item-inactive'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="navigation-desktop-accent"></div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="navigation-mobile-button-container">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="navigation-mobile-button"
          >
            <div className="navigation-mobile-button-icon-transform">
              {isOpen ? <X size={24} className="navigation-mobile-icon" /> : <Menu size={24} className="navigation-mobile-icon" />}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="navigation-mobile-menu-container">
          <div className="navigation-mobile-menu-bg">
            <div className="navigation-mobile-menu-inner">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`navigation-mobile-item ${
                    isActive(item.path) ? 'navigation-mobile-item-active' : 'navigation-mobile-item-inactive'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;