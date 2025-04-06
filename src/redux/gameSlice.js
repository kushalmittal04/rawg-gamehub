import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGames, fetchGameDetails, fetchFilterOptions, fetchGameScreenshots } from "../api/api";

const loadBookmarks = () => {
  try {
    const saved = localStorage.getItem("userBookmarks");
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error("Failed to parse bookmarks:", error);
    return {};
  }
};

const initialState = {
  games: [],
  totalGames: 0,
  gameDetails: null,
  screenshots: [],
  filterOptions: {
    genres: [],
    tags: [],
    platforms: [],
    years: [...Array(24)].map((_, i) => (2000 + i).toString()),
    ratings: [
      { label: "4.5+", min: 4.5, max: 5 },
      { label: "4-4.5", min: 4, max: 4.5 },
      { label: "3.5-4", min: 3.5, max: 4 },
      { label: "3-3.5", min: 3, max: 3.5 },
      { label: "2-3", min: 2, max: 3 },
      { label: "1.5-2", min: 1.5, max: 2 },
      { label: "1-1.5", min: 1, max: 1.5 },
      { label: "<1", min: 0, max: 1 },
    ],
  },
  filters: {
    genre: [],
    tags: [],
    platforms: [],
    year: [],
    rating: [],
  },
  sortOrder: "",
  searchQuery: "",
  currentPage: 1,
  gamesPerPage: 20,
  loading: false,
  error: null,
  userBookmarks: loadBookmarks(),
};

const getOrderingParam = (sortOrder) => {
  switch (sortOrder) {
    case "az": return "name";
    case "za": return "-name";
    case "oldnew": return "released";
    case "newold": return "-released";
    case "rating-high": return "-rating";
    case "rating-low": return "rating";
    default: return "";
  }
};

export const fetchGamesAsync = createAsyncThunk(
  "games/fetchGames",
  async (params, { rejectWithValue }) => {
    try {
      let safeParams = {
        page_size: 40,
        page: params?.page || 1,
        search: params?.search || null,
        dates: params?.filters?.year?.length ? `${params.filters.year[0]}-01-01,${params.filters.year[0]}-12-31` : null,
        genres: params?.filters?.genre?.map(genre => {
          const foundGenre = initialState.filterOptions.genres.find(g => g.name === genre);
          return foundGenre ? foundGenre.id : null;
        }).filter(Boolean).join(',') || null,
        tags: params?.filters?.tags?.map(tag => {
          const foundTag = initialState.filterOptions.tags.find(t => t.name === tag);
          return foundTag ? foundTag.id : null;
        }).filter(Boolean).join(',') || null,
        parent_platforms: params?.filters?.platforms?.map(platform => {
          const foundPlatform = initialState.filterOptions.platforms.find(p => p.name === platform);
          return foundPlatform ? foundPlatform.id : null;
        }).filter(Boolean).join(',') || null,
        metacritic: params?.filters?.rating?.length ? 
          `${Math.floor(params.filters.rating[0].min * 20)},${Math.ceil(params.filters.rating[0].max * 20)}` : null,
        ordering: getOrderingParam(params?.sortOrder) || null
      };
      
      // Remove null/undefined params
      safeParams = Object.fromEntries(
        Object.entries(safeParams).filter(([_, value]) => value != null)
      );

      const data = await fetchGames(safeParams);
      return {
        results: data.results || [],
        count: data.count || 0,
      };
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGameDetailsAsync = createAsyncThunk(
  "games/fetchGameDetails",
  async (id, { rejectWithValue }) => {
    try {
      const [details, screenshots] = await Promise.all([
        fetchGameDetails(id),
        fetchGameScreenshots(id)
      ]);
      return { 
        details,
        screenshots: screenshots.results || [] 
      };
    } catch (error) {
      console.error('Game details fetch failed:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFilterOptionsAsync = createAsyncThunk(
  "games/fetchFilterOptions",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchFilterOptions();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.currentPage = 1;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
      state.currentPage = 1;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.searchQuery = "";
      state.sortOrder = "";
      state.currentPage = 1;
    },
    toggleBookmark: (state, action) => {
      const { userId, gameId } = action.payload;
      if (!userId) return;

      state.userBookmarks[userId] = state.userBookmarks[userId] || [];
      const index = state.userBookmarks[userId].indexOf(gameId);
      
      if (index >= 0) {
        state.userBookmarks[userId].splice(index, 1);
      } else {
        state.userBookmarks[userId].push(gameId);
      }

      localStorage.setItem("userBookmarks", JSON.stringify(state.userBookmarks));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGamesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGamesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload.results || [];
        state.totalGames = action.payload.count || 0;
        state.currentPage = action.meta.arg.page || 1;
      })
      .addCase(fetchGamesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchGameDetailsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGameDetailsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.gameDetails = action.payload.details;
        state.screenshots = action.payload.screenshots;
      })
      .addCase(fetchGameDetailsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFilterOptionsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilterOptionsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.filterOptions.genres = action.payload.genres || [];
        state.filterOptions.tags = action.payload.tags || [];
        state.filterOptions.platforms = action.payload.platforms || [];
      })
      .addCase(fetchFilterOptionsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setFilters,
  setSortOrder,
  setSearchQuery,
  setCurrentPage,
  resetFilters,
  toggleBookmark,
} = gameSlice.actions;

export const selectUserBookmarks = (userId) => (state) => 
  state.games.userBookmarks[userId] || [];

export const selectIsBookmarked = (userId, gameId) => (state) => 
  state.games.userBookmarks[userId]?.includes(gameId) || false;

export default gameSlice.reducer;