import "./starRating.css";

const STAR_PATH =
  "M12 2l2.9 6.26 6.86.74-5.13 4.62 1.44 6.76L12 16.9l-6.07 3.48 1.44-6.76L2.24 9l6.86-.74z";

const Stars = () => (
  <>
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} viewBox="0 0 24 24" aria-hidden="true">
        <path d={STAR_PATH} />
      </svg>
    ))}
  </>
);

export const StarRating = ({ value, showValue = true }) => {
  const percent = Math.max(0, Math.min(100, (value / 5) * 100));

  return (
    <span className="rating" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
      <span className="rating__stars">
        <span className="rating__track">
          <Stars />
        </span>
        <span className="rating__fill" style={{ width: `${percent}%` }}>
          <Stars />
        </span>
      </span>
      {showValue && <span className="rating__value">({value.toFixed(1)})</span>}
    </span>
  );
};
