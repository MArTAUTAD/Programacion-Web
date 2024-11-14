import React from 'react';

export default function FavoriteList({ favorites, setSelectedComic }) {
  return (
    <div className="favorite-list">
      <h2>Mis Favoritos</h2>
      {favorites.length === 0 ? (
        <p>No tienes cómics en tu lista de favoritos.</p>
      ) : (
        favorites.map(comic => (
          <div key={comic.id} className="favorite-item" onClick={() => setSelectedComic(comic)}>
            <img src={comic.thumbnail.path + "." + comic.thumbnail.extension} alt={comic.title} />
            <h3>{comic.title}</h3>
          </div>
        ))
      )}
    </div>
  )
}
