import { SideNav } from "../components/sideNav";
import { SearchIcon } from "../assets/appIcons.jsx";
import { useProducts } from "../hooks/useProducts";

export const ProductListing = () => {
  const { products, brands, status, retry } = useProducts();

  return (
    <div className="listing">
      <SideNav brands={brands} productsStatus={status} />
      <section className="listing__content">
        <h2 className="listing__title">
          <SearchIcon height="22" width="22" /> Filters
        </h2>

        {/* TODO: product grid + pagination (replaces this placeholder) */}
        {status === "loading" && <p>Loading products…</p>}
        {status === "error" && (
          <p>
            Couldn't load products. <button onClick={retry}>Retry</button>
          </p>
        )}
        {status === "success" && <p>{products.length} products</p>}
      </section>
    </div>
  );
};
