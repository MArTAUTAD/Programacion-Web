import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import Feed from './component/feedComics'
import FavoriteList from "./component/favoriteList"


function App() {
  const [comics, setComics] = useState([])
  const publicKey= "d4299acfe6a8f47fcd498173d6f0ee53";
  const privateKey= "160c0022aba29d61267cf0cd6e268b40d3ffea38";



  const [selectedComic, setSelectedComic] = useState(null);
  //ver cual de elemento se muestra, el feed o los favoritos
  const [showFavorites, setShowFavorites] = useState(false);

  //Para que aunque se recargue la página aparezcan los fovorito se usa el localStorange. no es una bbdd, se borra si se borra la caché
  //Página referente: https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);


  useEffect(() => {
    //coge los 20 comics ordenados segun la fecha de su ultima modificacion 
    fetch('https://gateway.marvel.com/v1/public/comics?ts=1&apikey=d4299acfe6a8f47fcd498173d6f0ee53&hash=353090d061fbfbc1359ba817dba77393&orderBy=modified&limit=20')
      .then(res => res.json())
      .then(data => setComics(data.data.results));
  }, []);


  const handleFavorite = (comic) => {
    let updatedFavorites;

    // Si el cómic ya está en favoritos, lo eliminamos
    //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    if (favorites.some(fav => fav.id === comic.id)) {
      updatedFavorites = favorites.filter(fav => fav.id !== comic.id);
    } else {
      // Si no está en favoritos, lo añadimos
      updatedFavorites = [...favorites, comic];
    }

    // Actualizamos el estado y el localStorage
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  

  return (
    <div className="app">
      
      <nav className="navbar">
        <h1>Marvel Comics</h1>
        <ul>
          <li onClick={() => setShowFavorites(false)} style={{ cursor: "pointer" }}>Todos los Cómics</li>
          <li onClick={() => setShowFavorites(true)} style={{ cursor: "pointer" }}>Mis Favoritos</li>
        </ul>
      </nav>
      {/* si la condición es true hace lo primero sino hace el otro.*/}
      {showFavorites ? 
        <div className="favorites"><FavoriteList favorites={favorites} /></div>
        : 
        <Feed comics={comics} handleFavorite={handleFavorite} favorites={favorites} />
      }
    </div>
  )
  }

export default App;

