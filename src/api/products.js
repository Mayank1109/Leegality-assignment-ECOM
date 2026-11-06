const BASE_URL = "https://dummyjson.com";

async function request(path, { signal } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, { signal });
  if (!res.ok) {
    const error = new Error(`Request failed (${res.status})`);
    error.status = res.status; // lets callers tell "not found" from other errors
    throw error;
  }
  return res.json();
}

export const fetchCategories = (opts) => request("/products/categories", opts);

const LIST_FIELDS = "title,price,rating,thumbnail,brand,category";

export const fetchProducts = ({ category, signal } = {}) => {
  const base = category
    ? `/products/category/${encodeURIComponent(category)}`
    : "/products";
  return request(`${base}?limit=0&select=${LIST_FIELDS}`, { signal });
};

/** Full details for one product (images, description, reviews, …). */
export const fetchProduct = (id, { signal } = {}) =>
  request(`/products/${encodeURIComponent(id)}`, { signal });
