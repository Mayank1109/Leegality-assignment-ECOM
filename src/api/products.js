const BASE_URL = "https://dummyjson.com";

async function get(path, { signal } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, { signal });
  if (!res.ok) {
    const error = new Error(`Request failed (${res.status})`);
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export const fetchCategories = (opts) => get("/products/categories", opts);

const LIST_FIELDS = "title,price,rating,thumbnail,brand,category";

export const fetchProducts = ({ category, signal } = {}) => {
  const base = category
    ? `/products/category/${encodeURIComponent(category)}`
    : "/products";
  return get(`${base}?limit=0&select=${LIST_FIELDS}`, { signal });
};

export const fetchProduct = (id, { signal } = {}) =>
  get(`/products/${encodeURIComponent(id)}`, { signal });
