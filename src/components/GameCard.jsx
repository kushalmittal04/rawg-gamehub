import React from "react";
import { Link } from "react-router-dom";
import BookmarkButton from "./BookmarkButton";
import "../styles/gamecard.css";

const GameCard = React.memo(({ game }) => {
  const {
    id,
    name,
    background_image,
    released,
    rating,
    genres = [],
    tags = [],
    parent_platforms = []
  } = game;

  const releaseYear = released ? new Date(released).getFullYear() : "N/A";
  const displayRating = rating ? rating.toFixed(1) : "N/A";

  return (
    <Link to={`/game/${id}`} className="game-card-link">
      <article className="game-card">
        <div
          className="game-banner"
          style={{ backgroundImage: `url(${background_image})` }}
        >
          <div className="banner-overlay">
            <h2 className="game-title">{name}</h2>
            <div className="game-info-top">
              <span className="game-year">📅 {releaseYear}</span>
              <span className="game-rating">★ {displayRating}</span>
              <BookmarkButton gameId={id} />
            </div>
          </div>
        </div>

        <div className="game-info-footer">
          <div className="info-group genres">
            {genres.slice(0, 3).map((genre) => (
              <span key={genre.id} className="badge genre-badge">
                {genre.name}
              </span>
            ))}
          </div>

          <div className="info-group tags">
            {tags.slice(0, 2).map((tag) => (
              <span key={tag.id} className="badge tag-badge">
                {tag.name}
              </span>
            ))}
          </div>

          <div className="info-group platforms">
            {parent_platforms?.slice(0, 3).map((p) => (
              <span key={p.platform.id} className="badge platform-badge">
                {p.platform.name}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
});

GameCard.displayName = "GameCard";

export default GameCard;
