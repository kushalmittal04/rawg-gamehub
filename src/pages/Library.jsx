import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { useUser } from '@clerk/clerk-react';
import { selectUserBookmarks } from '../redux/gameSlice';
import GameCard from '../components/GameCard';
import '../styles/library.css';

const Library = () => {
  const { isSignedIn, user } = useUser();
  const bookmarkedGameIds = useSelector(selectUserBookmarks(user?.id));
  const allGames = useSelector((state) => state.games.games);

  if (!isSignedIn) {
    return (
      <Container className="library-container">
        <div className="empty-library">
          <h4>Please Sign In to Access Your Game Library</h4>
          <p>Your bookmarks are tied to your account. Log in to see your favorites!</p>
          <a href="/sign-in" className="explore-link">Sign In</a>
        </div>
      </Container>
    );
  }

  const bookmarkedGames = allGames.filter((game) =>
    bookmarkedGameIds.includes(game.id)
  );

  return (
    <Container className="library-container">
      <h2>Your Game Library</h2>
      {bookmarkedGames.length > 0 ? (
        <div className="game-grid">
          {bookmarkedGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="empty-library">
          <h4>Oops! No Bookmarked Games Found</h4>
          <p>Looks like you haven’t saved any games yet. Head over to the game list and start bookmarking your favorites!</p>
          <a href="/" className="explore-link">Explore Games</a>
        </div>
      )}
    </Container>
  );
};

export default React.memo(Library);
