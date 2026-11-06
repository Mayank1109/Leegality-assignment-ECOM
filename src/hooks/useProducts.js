import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { fetchProducts } from "../api/products";

/**
 * Reads the filters from the URL, fetches products for the selected category,
 * and applies price + brand filters client-side.
 */
export const useProducts = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const brandsParam = searchParams.getAll("brand").join("|");

  const [reloadKey, setReloadKey] = useState(0);
  const requestKey = `${category}#${reloadKey}`;
  // The result is tagged with the request it belongs to. If its key doesn't
  // match the current one, a newer request is in flight -> "loading".
  const [result, setResult] = useState({ key: null, data: [], error: null });

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts({ category, signal: controller.signal })
      .then((res) =>
        setResult({ key: requestKey, data: res.products, error: null }),
      )
      .catch((err) => {
        if (err.name !== "AbortError") {
          setResult({ key: requestKey, data: [], error: err });
        }
      });
    return () => controller.abort();
  }, [category, requestKey]);

  const isCurrent = result.key === requestKey;
  const status = !isCurrent ? "loading" : result.error ? "error" : "success";
  const categoryProducts = useMemo(
    () => (isCurrent ? result.data : []),
    [isCurrent, result.data],
  );

  // Unique brands within the current category (some products have no brand).
  const brands = useMemo(
    () =>
      [...new Set(categoryProducts.map((p) => p.brand).filter(Boolean))].sort(
        (a, b) => a.localeCompare(b),
      ),
    [categoryProducts],
  );

  const products = useMemo(() => {
    const selectedBrands = brandsParam ? brandsParam.split("|") : [];
    const min = minPrice ? Number(minPrice) : -Infinity;
    const max = maxPrice ? Number(maxPrice) : Infinity;
    return categoryProducts.filter(
      (p) =>
        p.price >= min &&
        p.price <= max &&
        (selectedBrands.length === 0 || selectedBrands.includes(p.brand)),
    );
  }, [categoryProducts, minPrice, maxPrice, brandsParam]);

  return {
    products,
    brands,
    status,
    error: isCurrent ? result.error : null,
    retry: () => setReloadKey((k) => k + 1),
  };
};
