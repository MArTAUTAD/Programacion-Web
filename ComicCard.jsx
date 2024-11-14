
export default function ComicCard({ comic, onComicSelect, isFavorite, onFavorite }) {

  return (
    <div className="comic-card">
      <img
        src={comic.thumbnail.path + "." + comic.thumbnail.extension}
        alt={comic.title}
        onClick={onComicSelect} // Expande la descripción al hacer clic en la imagen
        style={{ cursor: "pointer" }}
      />
      <h3 onClick={onComicSelect} style={{ cursor: "pointer" }}>{comic.title}</h3>
      <button onClick={onFavorite}>
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
