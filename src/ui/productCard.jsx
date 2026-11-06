import { Link } from "react-router";
import { StarRating } from "./starRating";
import { formatPrice } from "../utils/format";
import "./productCard.css";

export const ProductCard = ({ product }) => {
  const { id, title, price, rating, thumbnail } = product;

  return (
    <Link to={`/product/${id}`} className="product-card">
      <div className="product-card__media">
        <img src={thumbnail} alt={title} loading="lazy" />
      </div>
      <h3 className="product-card__title" title={title}>
        {title}
      </h3>
      <div className="product-card__meta">
        <span className="product-card__price">{formatPrice(price)}</span>
        <StarRating value={rating} />
      </div>
    </Link>
  );
};

export const ProductCardSkeleton = () => (
  <div className="product-card product-card--skeleton" aria-hidden="true">
    <div className="product-card__media skeleton" />
    <div className="skeleton skeleton--line" />
    <div className="skeleton skeleton--line skeleton--short" />
  </div>
);
