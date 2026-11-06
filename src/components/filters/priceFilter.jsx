import { useState } from "react";
import { useSearchParams } from "react-router";
import "./filters.css";

export const PriceFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Local draft values; the URL only changes when "Apply" is pressed.
  const [min, setMin] = useState(searchParams.get("minPrice") ?? "");
  const [max, setMax] = useState(searchParams.get("maxPrice") ?? "");

  const invalid = min !== "" && max !== "" && Number(min) > Number(max);

  const handleApply = (e) => {
    e.preventDefault();
    if (invalid) return;
    setSearchParams((params) => {
      if (min === "") params.delete("minPrice");
      else params.set("minPrice", min);
      if (max === "") params.delete("maxPrice");
      else params.set("maxPrice", max);
      params.delete("page"); // reset pagination when a filter changes
      return params;
    });
  };

  return (
    <section className="sidenav__group">
      <h3>Price Range</h3>
      <form className="price-filter" onSubmit={handleApply}>
        <div className="price-filter__inputs">
          <input
            type="number"
            min="0"
            placeholder="Min"
            aria-label="Minimum price"
            className="filter__input"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="Max"
            aria-label="Maximum price"
            className="filter__input"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </div>
        {invalid && (
          <p className="filter__status filter__status--error">
            Min can't be greater than max.
          </p>
        )}
        <button type="submit" className="filter__apply" disabled={invalid}>
          Apply
        </button>
      </form>
    </section>
  );
};
