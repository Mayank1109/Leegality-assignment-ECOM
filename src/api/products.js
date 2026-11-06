const BASE_URL = "https://dummyjson.com";

async function request(path, { signal } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, { signal });
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  return res.json();
}

export const fetchCategories = (opts) => request("/products/categories", opts);

const LIST_FIELDS = "title,price,rating,thumbnail,brand,category";

/**
 * Fetches every product (optionally within one category) in a single request.
 * The catalogue is small (~200 items), so price/brand filtering and
 * pagination are done client-side on this list.
 */
export const fetchProducts = ({ category, signal } = {}) => {
  const base = category
    ? `/products/category/${encodeURIComponent(category)}`
    : "/products";
  return request(`${base}?limit=0&select=${LIST_FIELDS}`, { signal });
};
