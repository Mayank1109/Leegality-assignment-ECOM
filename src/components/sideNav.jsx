import { Searchbox } from "../ui/searchbox";

// Filters panel for the Product Listing page (left side in the mockup).
export const SideNav = () => {
  return (
    <aside className="sidenav">
      <Searchbox />

      <section className="sidenav__group">
        <h3>Categories</h3>
        {/* TODO: checkboxes from GET /products/categories */}
      </section>

      <section className="sidenav__group">
        <h3>Price Range</h3>
        {/* TODO: min / max inputs */}
      </section>

      <section className="sidenav__group">
        <h3>Brands</h3>
        {/* TODO: unique brands extracted from fetched products */}
      </section>
    </aside>
  );
};
