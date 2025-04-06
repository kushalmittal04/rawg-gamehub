import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, resetFilters } from "../redux/gameSlice";
import { filterCategories } from "../utils/filterConstants";
import "../styles/filters.css";

const Filters = () => {
  const dispatch = useDispatch();
  const { filters, filterOptions } = useSelector((state) => state.games);

  const handleFilterChange = useCallback(
    (category, value) => {
      dispatch(
        setFilters({
          ...filters,
          [category]: filters[category].includes(value)
            ? filters[category].filter((item) => item !== value)
            : [...filters[category], value],
        }),
      );
    },
    [dispatch, filters],
  );

  const getSortedValues = (items, isYear = false) => {
    if (!items || items.length === 0) return [];
    if (isYear) {
      return [...items].sort((a, b) => b.localeCompare(a));
    }
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  };

  const renderCheckboxes = useCallback(
    (items, category, isYear = false) => {
      const sortedItems = getSortedValues(items, isYear);
      return sortedItems.map((item) => (
        <label key={item.id || item} className="filter-checkbox">
          <input
            type="checkbox"
            checked={filters[category]?.includes(item.name || item)}
            onChange={() => handleFilterChange(category, item.name || item)}
          />
          {item.name || item}
        </label>
      ));
    },
    [filters, handleFilterChange],
  );

  return (
    <div className="filters">
      <div className="filter-group">
        <h4>Genres</h4>
        <div className="filter-scroll">
          {renderCheckboxes(filterOptions.genres, "genre")}
        </div>
      </div>

      <div className="filter-group">
        <h4>Tags</h4>
        <div className="filter-scroll">
          {renderCheckboxes(filterOptions.tags, "tags")}
        </div>
      </div>

      <div className="filter-group">
        <h4>Platforms</h4>
        <div className="filter-scroll">
          {renderCheckboxes(filterOptions.platforms, "platforms")}
        </div>
      </div>

      <div className="filter-group">
        <h4>Release Year</h4>
        <div className="year-filter-options">
          {renderCheckboxes(filterOptions.years, "year", true)}
        </div>
      </div>

      <div className="filter-group">
        <h4>Rating</h4>
        <div className="filter-scroll">
          {filterOptions.ratings.map((rating) => (
            <label key={rating.label} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.rating?.some(
                  (r) => r.min === rating.min && r.max === rating.max,
                )}
                onChange={() => handleFilterChange("rating", rating)}
              />
              {rating.label}
            </label>
          ))}
        </div>
      </div>

      <button className="reset-btn" onClick={() => dispatch(resetFilters())}>
        Reset Filters
      </button>
    </div>
  );
};

export default React.memo(Filters);
