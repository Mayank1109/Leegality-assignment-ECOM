import { ProductCard, ProductCardSkeleton } from "../ui/productCard";
import "./productGrid.css";

const SKELETON_COUNT = 8;

export const ProductGrid = ({ products, status, onRetry }) => {
  if (status === "error") {
    return (
      <div className="grid-message grid-message--error" role="alert">
        <p>Couldn't load products. Please check your connection.</p>
        <button className="grid-message__action" onClick={onRetry}>
          Try again
        </button>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div
        className="product-grid"
        aria-busy="true"
        aria-label="Loading products"
      >
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="grid-message">
        <p>No products match these filters.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
