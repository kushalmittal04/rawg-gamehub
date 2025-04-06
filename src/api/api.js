// api.js - Complete Fixed Version
const API_BASE = 'https://api.rawg.io/api';  // Add this line at the top
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes cache
const cache = new Map();

const fetchWithCache = async (url) => {
  const now = Date.now();
  const cached = cache.get(url);

  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Check for JSON response
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Received non-JSON response: ${text.substring(0, 100)}...`);
    }
    
    const data = await response.json();
    cache.set(url, { data, timestamp: now });
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchGames = async (params = {}) => {
  const queryParams = new URLSearchParams({
    key: import.meta.env.VITE_RAWG_API_KEY,
    page_size: params.page_size || 40,  // Default to 40 games
    ...params
  });

  // Remove undefined/empty params
  [...queryParams.entries()].forEach(([key, value]) => {
    if (value === 'undefined' || value === undefined || value === '') {
      queryParams.delete(key);
    }
  });

  const url = `${API_BASE}/games?${queryParams}`;
  console.log('Fetching games from:', url);  // Debug log
  return fetchWithCache(url);
};

export const fetchGameDetails = async (id) => {
  const url = `${API_BASE}/games/${id}?key=${import.meta.env.VITE_RAWG_API_KEY}`;
  console.log('Fetching game details from:', url);  // Debug log
  return fetchWithCache(url);
};

export const fetchGameScreenshots = async (id) => {
  const url = `${API_BASE}/games/${id}/screenshots?key=${import.meta.env.VITE_RAWG_API_KEY}`;
  console.log('Fetching screenshots from:', url);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching screenshots:', error);
    throw error;
  }
};

export const fetchFilterOptions = async () => {
  const [genres, tags, platforms] = await Promise.all([
    fetchWithCache(`${API_BASE}/genres?key=${import.meta.env.VITE_RAWG_API_KEY}`),
    fetchWithCache(`${API_BASE}/tags?key=${import.meta.env.VITE_RAWG_API_KEY}`),
    fetchWithCache(`${API_BASE}/platforms?key=${import.meta.env.VITE_RAWG_API_KEY}`)
  ]);
  
  return {
    genres: genres.results || [],
    tags: tags.results || [],
    platforms: platforms.results || []
  };
};