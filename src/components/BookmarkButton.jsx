import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmark, selectIsBookmarked } from '../redux/gameSlice';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useUser } from '@clerk/clerk-react';
import '../styles/bookmark-button.css'; 

const BookmarkButton = ({ gameId, variant = 'normal' }) => {
  const dispatch = useDispatch();
  const { user, isSignedIn } = useUser();
  const isBookmarked = useSelector(selectIsBookmarked(user?.id, gameId));

  const handleClick = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (isSignedIn && user) {
      dispatch(toggleBookmark({ userId: user.id, gameId }));
    }
  };

  const iconSize = variant === 'large' ? '1.5rem' : '1.2rem';
  const buttonClass = `bookmark-btn ${isBookmarked ? 'bookmarked' : ''} ${variant}`;

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      disabled={!isSignedIn}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      title={isSignedIn ? (isBookmarked ? "Remove from library" : "Add to library") : "Sign in to bookmark"}
    >
      {isBookmarked ? (
        <FaBookmark size={iconSize} />
      ) : (
        <FaRegBookmark size={iconSize} />
      )}
      {variant === 'large' && (
        <span className="ms-2">
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </span>
      )}
    </button>
  );
};

export default React.memo(BookmarkButton);