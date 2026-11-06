import "./pagination.css";

const getPageItems = (page, totalPages, siblings = 1) => {
  if (totalPages <= 5 + siblings * 2) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const left = Math.max(page - siblings, 2);
  const right = Math.min(page + siblings, totalPages - 1);
  const items = [1];

  if (left > 2) items.push("start-ellipsis");
  for (let p = left; p <= right; p++) items.push(p);
  if (right < totalPages - 1) items.push("end-ellipsis");

  items.push(totalPages);
  return items;
};

export const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        className="pagination__btn pagination__btn--step"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        <span aria-hidden="true">←</span> Previous
      </button>

      {getPageItems(page, totalPages).map((item) =>
        typeof item === "number" ? (
          <button
            key={item}
            className={`pagination__btn${item === page ? " is-active" : ""}`}
            onClick={() => onPageChange(item)}
            aria-label={`Page ${item}`}
            aria-current={item === page ? "page" : undefined}
          >
            {item}
          </button>
        ) : (
          <span key={item} className="pagination__ellipsis" aria-hidden="true">
            …
          </span>
        ),
      )}

      <button
        className="pagination__btn pagination__btn--step"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next <span aria-hidden="true">→</span>
      </button>
    </nav>
  );
};
