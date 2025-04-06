import React, { useState, useMemo } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import GameCard from "./GameCard";
import Pagination from "./Pagination";
import { fetchGamesAsync } from "../redux/gameSlice";
import "../styles/gamelist.css";

const GameList = () => {
  const [localSortOrder, setLocalSortOrder] = useState("");
  const dispatch = useDispatch();
  const { 
    games, 
    filters,
    sortOrder,
    searchQuery,
    loading,
    currentPage,
    totalGames
  } = useSelector((state) => state.games);

  const totalPages = Math.ceil(totalGames / 20);

  React.useEffect(() => {
    dispatch(fetchGamesAsync({ 
      page: currentPage,
      search: searchQuery,
      sortOrder,
      filters
    }));
  }, [dispatch, searchQuery, currentPage, sortOrder, filters]);

  const sortGames = (games, sortOrder) => {
    const gamesCopy = [...games];
    switch (sortOrder) {
      case "az":
        return gamesCopy.sort((a, b) => a.name.localeCompare(b.name));
      case "za":
        return gamesCopy.sort((a, b) => b.name.localeCompare(a.name));
      case "oldnew":
        return gamesCopy.sort((a, b) => new Date(a.released) - new Date(b.released));
      case "newold":
        return gamesCopy.sort((a, b) => new Date(b.released) - new Date(a.released));
      case "rating-high":
        return gamesCopy.sort((a, b) => b.rating - a.rating);
      case "rating-low":
        return gamesCopy.sort((a, b) => a.rating - b.rating);
      default:
        return gamesCopy;
    }
  };

  const filteredGames = useMemo(() => {
    if (!games) return [];
    return games.filter(game => {
      const matchesGenre = filters.genre.length === 0 || 
        game.genres?.some(g => filters.genre.includes(g.name));

      const matchesPlatform = filters.platforms.length === 0 || 
        game.parent_platforms?.some(p => filters.platforms.includes(p.platform.name));

      const matchesTags = filters.tags.length === 0 || 
        game.tags?.some(t => filters.tags.includes(t.name));

      const matchesRating = filters.rating.length === 0 || 
        filters.rating.some(r => game.rating >= r.min && game.rating <= r.max);

      return matchesGenre && matchesPlatform && matchesTags && matchesRating;
    });
  }, [games, filters]);

  return (
    <Container className="game-list-container">
      <div className="sorting-container">
        <h4>
          Sort Games of Given Page by:
        </h4>
        <select 
          onChange={(e) => setLocalSortOrder(e.target.value)}
          value={localSortOrder}
          className="sorting-select"
        >
          <option value="">Sort By</option>
          <option value="az">Name: A to Z</option>
          <option value="za">Name: Z to A</option>
          <option value="oldnew">Release: Old to New</option>
          <option value="newold">Release: New to Old</option>
          <option value="rating-high">Rating: High to Low</option>
          <option value="rating-low">Rating: Low to High</option>
        </select>
      </div>



      {loading ? (
        <div className="loading">Loading games...</div>
      ) : filteredGames.length > 0 ? (
        <>
          <div className="games-grid">
            {sortGames(filteredGames, localSortOrder).map((game) => (
              <GameCard 
                key={`${game.id}-${game.slug}`} 
                game={game} 
              />
            ))}
          </div>
          <Pagination totalPages={totalPages} />
        </>
      ) : (
        <div className="no-results">
          <p>No games found. Try adjusting your search or filters.</p>
        </div>
      )}
    </Container>
  );
};

export default React.memo(GameList);