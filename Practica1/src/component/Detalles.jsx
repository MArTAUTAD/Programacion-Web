import React from 'react';

export default function ComicDetail({ comic, onComicSelect}) {
  return (
    <div className="comic-details">
      <button onClick={onComicSelect} className="close-button">X</button>
      {/* si no hay descripción devuelve lo otro */}
      <p> Descripción:  {comic.description || "No disponible."}</p>
      {/* join hace una nueva cadena concatenando todos los elementos del map separandolos por una coma  */}
      {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join */}
      <p> Autores:  {comic.creators.items.map(creator => creator.name).join(", ")}</p>
      <p> Personajes:  {comic.characters.items.map(character => character.name).join(", ")}</p>
    </div>
  )
}
