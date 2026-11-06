import { Link, useLocation, useNavigate, useParams } from "react-router";
import { useProduct } from "../hooks/useProduct";
import { ImageGallery } from "../ui/imageGallery";
import { StarRating } from "../ui/starRating";
import { formatCategory, formatPrice } from "../utils/format";
import "./productDetail.css";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.key !== "default") navigate(-1);
    else navigate("/");
  };

  return (
    <button className="detail__back" onClick={handleBack}>
      <span aria-hidden="true">←</span> Back
    </button>
  );
};

const DetailSkeleton = () => (
  <div className="detail__layout" aria-busy="true" aria-label="Loading product">
    <div className="detail__media">
      <div className="skeleton detail__skeleton-image" />
    </div>
    <div className="detail__info">
      <div className="skeleton detail__skeleton-line detail__skeleton-line--title" />
      <div className="skeleton detail__skeleton-line" />
      <div className="skeleton detail__skeleton-line detail__skeleton-line--short" />
      <div className="skeleton detail__skeleton-block" />
    </div>
  </div>
);

const DetailError = ({ error, onRetry }) => {
  const notFound = error?.status === 404;
  return (
    <div className="detail__message" role="alert">
      <h2>{notFound ? "Product not found" : "Couldn't load this product"}</h2>
      <p>
        {notFound
          ? "It may have been removed, or the link is incorrect."
          : "Please check your connection and try again."}
      </p>
      {notFound ? (
        <Link to="/" className="detail__action">
          Browse products
        </Link>
      ) : (
        <button className="detail__action" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
};

export const ProductDetail = () => {
  const { id } = useParams();
  const { product, status, error, retry } = useProduct(id);

  return (
    <section className="detail">
      <BackButton />

      {status === "loading" && <DetailSkeleton />}
      {status === "error" && <DetailError error={error} onRetry={retry} />}

      {status === "success" && (
        <article className="detail__layout">
          <div className="detail__media">
            <ImageGallery
              key={product.id}
              images={
                product.images?.length ? product.images : [product.thumbnail]
              }
              alt={product.title}
            />
          </div>

          <div className="detail__info">
            <h1 className="detail__title">{product.title}</h1>

            <div className="detail__price-row">
              <span className="detail__price">
                {formatPrice(product.price)}
              </span>
              <StarRating value={product.rating} />
            </div>

            <dl className="detail__facts">
              {product.brand && (
                <div>
                  <dt>Brand:</dt>
                  <dd>{product.brand}</dd>
                </div>
              )}
              <div>
                <dt>Category:</dt>
                <dd>
                  <Link to={`/?category=${product.category}`}>
                    {formatCategory(product.category)}
                  </Link>
                </dd>
              </div>
            </dl>

            <section className="detail__section">
              <h2>Description</h2>
              <p className="detail__description">{product.description}</p>
            </section>

            {product.reviews?.length > 0 && (
              <section className="detail__section">
                <h2>Reviews</h2>
                <ul className="detail__reviews">
                  {product.reviews.map((review, i) => (
                    <li key={`${review.reviewerEmail}-${i}`} className="review">
                      <div className="review__head">
                        <span className="review__name">
                          {review.reviewerName}
                        </span>
                        <StarRating value={review.rating} />
                      </div>
                      <p className="review__comment">{review.comment}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </article>
      )}
    </section>
  );
};
