import { useState, useEffect } from 'react';
import ComicCard from './ComicCard';
import ComicDetail from "./Detalles"

export default function Feed({ comics, handleFavorite, favorites }) {
  //comic selecionado para mostar los detalles
  const [selectedComicId, setSelectedComicId] = useState(null);


  return (
    <div className="comic-container">
      {comics.map(comic => (
        <div key={comic.id}>
        <ComicCard

          comic={comic}
          onComicSelect={() => setSelectedComicId(comic.id)}
          isFavorite={favorites.some(fav => fav.id === comic.id)} // Comprueba si el cómic está en favoritos
          onFavorite={() => handleFavorite(comic)}
        />
        {selectedComicId === comic.id ? (
            <ComicDetail
              comic={comic}
              onComicSelect={() => setSelectedComicId(null)} 
            />
          ): null}
        </div>
      ))}
    </div>
  )
}
