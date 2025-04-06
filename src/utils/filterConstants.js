
export const filterCategories = {
  genres: {
    title: "Genres",
    stateKey: "genre"
  },
  tags: {
    title: "Tags",
    stateKey: "tags"
  },
  platforms: {
    title: "Platforms",
    stateKey: "platforms"
  },
  years: {
    title: "Release Year",
    stateKey: "year"
  },
  ratings: {
    title: "Rating",
    stateKey: "rating",
    options: [
      { label: "Greater than 4.5", min: 4.5, max: 5 },
      { label: "Between 4 - 4.5", min: 4, max: 4.5 },
      { label: "Between 3.5 - 4", min: 3.5, max: 4 },
      { label: "Between 3 - 3.5", min: 3, max: 3.5 },
      { label: "Between 2 - 3", min: 2, max: 3 },
      { label: "Between 1.5 - 2", min: 1.5, max: 2 },
      { label: "Between 1 - 1.5", min: 1, max: 1.5 },
      { label: "Less than 1", min: 0, max: 1 }
    ]
  }
};
