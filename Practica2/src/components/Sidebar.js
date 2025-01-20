// Barra lateral
'use client';

import React from 'react';
import styles from '@/styles/sidebar.css';
import NavBar from './Nabar';
import TokenService from '@/utils/TokenService';

export default function Sidebar() {
  // const router = useRouter();

  const links = [
    { href: "/", label: "Resumen" },
    { href: "/pagesInfo/clients", label: "Clientes" },
    { href: "/pagesInfo/projects", label: "Proyectos" },
    { href: "/pagesInfo/deliverynotes", label: "Albaranes" },
    { href: "/", label: "Proveedores" },
    { href: "/", label: "Ajustes" },
  ];

  const handleLogout = () => {
    TokenService.clearToken();  

  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        {/* <img src="logo.png" alt="Logo" className="sidebar-logo" /> */}
        <button className="sidebar-toggle-button">☰</button>
      </div>
      <NavBar links={links} />
      <button className="sidebar-footer-button" onClick={handleLogout}>Cerrar sesión</button>
    </aside>
  );
};

