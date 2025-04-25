import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="logo">
        <h1>QuadrinhoTeca</h1>
      </div>
      <div className="nav-links">
        <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>
          Início
        </Link>
        <Link to="/home" className={location.pathname === '/catalog' ? 'active' : ''}>
          Catálogo
        </Link>
        <Link to="/home" className={location.pathname === '/my-rentals' ? 'active' : ''}>
          Meus Aluguéis
        </Link>
        <Link to="/home" className={location.pathname === '/profile' ? 'active' : ''}>
          Perfil
        </Link>
        <button onClick={onLogout} className="logout-btn">
          Sair
        </button>
      </div>
    </nav>
  );
};

export default Navbar;