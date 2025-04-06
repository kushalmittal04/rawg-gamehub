// Library.jsx
import React from "react";
import { useSelector } from "react-redux";
import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";
import GameCard from "./GameCard";
import "../styles/library.css";

const Library = () => {
  const { user } = useUser();
  const userId = user?.id;
  const bookmarks = useSelector((state) => state.games.userBookmarks[userId] || []);
  const games = useSelector((state) => state.games.games);

  const bookmarkedGames = games.filter((game) => bookmarks.includes(game.id));

  return (
    <div className="library-page container py-4">
      <h2 className="mb-4 text-white">Your Library</h2>

      <SignedOut>
        <div className="not-logged-in">
          <p className="text-light">Please sign in to view your bookmarked games.</p>
        </div>
      </SignedOut>

      <SignedIn>
        {bookmarkedGames.length > 0 ? (
          <div className="bookmarked-games">
            {bookmarkedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="no-bookmarks">
            <p className="text-light">You haven't bookmarked any games yet.</p>
          </div>
        )}
      </SignedIn>
    </div>
  );
};

export default React.memo(Library);
