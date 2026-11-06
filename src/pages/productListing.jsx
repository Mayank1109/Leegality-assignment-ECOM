import { SideNav } from "../components/sideNav";

export const ProductListing = () => {
  return (
    <div className="listing">
      <SideNav />
      <section className="listing__content">
        <h2>Filters</h2>
        {/* TODO: product grid + pagination */}
      </section>
    </div>
  );
};
