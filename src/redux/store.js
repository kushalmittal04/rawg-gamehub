import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";

export default configureStore({
  reducer: {
    games: gameReducer
    // Remove theme reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['games/toggleBookmark'],
        ignoredPaths: ['games.bookmarks', 'games.userBookmarks']
      },
    }),
});