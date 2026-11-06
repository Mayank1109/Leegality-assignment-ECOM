import { Searchbox } from "../ui/searchbox";
import { CategoryFilter } from "./filters/categoryFilter";
import { PriceFilter } from "./filters/priceFilter";
import { BrandFilter } from "./filters/brandFilter";
import "./sideNav.css";
// Filters panel for the Product Listing page (left side in the mockup).
export const SideNav = ({ brands, productsStatus }) => {
  return (
    <aside className="sidenav">
      <Searchbox
        style={{ width: "100%", border: "1px solid var(--border)" }}
        placeholder="Search..."
      />

      <CategoryFilter />

      <PriceFilter />

      <BrandFilter brands={brands} status={productsStatus} />
    </aside>
  );
};
