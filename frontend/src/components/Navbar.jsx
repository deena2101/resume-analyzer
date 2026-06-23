import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, BarChart2, CheckCircle, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/', icon: <FileText size={20} /> },
    { name: 'Analyzer', path: '/analyzer', icon: <CheckCircle size={20} /> },
    { name: 'Comparison', path: '/comparison', icon: <BarChart2 size={20} /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
  ];

  return (
    <nav className="glass sticky top-0 z-50 py-4 px-6 mb-8 border-b border-surface">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <FileText size={28} className="text-secondary" />
          <span>ATS<span className="text-text">Pro</span></span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === link.path
                  ? 'bg-primary/20 text-primary'
                  : 'text-muted hover:text-text hover:bg-surface'
              }`}
            >
              {link.icon}
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
