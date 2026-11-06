import { useState } from "react";
import { useSearchParams } from "react-router";
import { Searchbox } from "../ui/searchbox";
import { CategoryFilter } from "./filters/categoryFilter";
import { PriceFilter } from "./filters/priceFilter";
import { BrandFilter } from "./filters/brandFilter";
import "./sideNav.css";

export const SideNav = ({
  brands,
  productsStatus,
  isMobile = false,
  open = false,
  onClose,
}) => {
  const [optionQuery, setOptionQuery] = useState("");
  const [searchParams] = useSearchParams();
  const priceKey = `${searchParams.get("minPrice") ?? ""}|${searchParams.get("maxPrice") ?? ""}`;

  return (
    <aside
      id="filters-panel"
      className={`sidenav${open ? " is-open" : ""}`}
      aria-label="Filters"
      inert={isMobile && !open}
    >
      {isMobile && (
        <div className="sidenav__drawer-head">
          <span>Filters</span>
          <button
            className="sidenav__close"
            onClick={onClose}
            aria-label="Close filters"
          >
            ×
          </button>
        </div>
      )}

      <Searchbox
        value={optionQuery}
        onChange={setOptionQuery}
        placeholder="Search..."
        ariaLabel="Search categories and brands"
        style={{ width: "100%", border: "1px solid var(--border)" }}
      />

      <CategoryFilter query={optionQuery} />

      <PriceFilter key={priceKey} />

      <BrandFilter
        brands={brands}
        status={productsStatus}
        query={optionQuery}
      />
    </aside>
  );
};
