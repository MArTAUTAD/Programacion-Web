import "@/styles/header.css"
import SearchBar from "./SearchBar";

export default function Header({ tittle }) {
  return (
    <header className="header">
      <h1 className="title">{tittle}</h1>
      {/* <input type="text" placeholder="Buscar..." className="searchBar" /> */}
      <SearchBar></SearchBar>
      <div className="profile">
        <img
          src="ruta-del-perfil.jpg" 
          alt="Perfil"
          className="profileImage"
        />
      </div>
    </header>
  );
}