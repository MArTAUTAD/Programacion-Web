// Barra lateral

// import styles from '@/styles/Sidebar.module.css';
import NavBar from './Nabar';

export default function Sidebar() {

  const links = [
    { href: "/", label: "Resumen" },
    { href: "/pages/clients", label: "Clientes" },
    { href: "/pages/projects", label: "Proyectos" },
    { href: "/pages/deliverynotes", label: "Albaranes" },
    { href: "/", label: "Proveedores" },
    { href: "/", label: "Ajustes" },
  ];


  return (
    <aside >
      <img></img>
      <buton></buton>
      <NavBar links={links}></NavBar>
      <button></button>
    </aside>
  );
};
