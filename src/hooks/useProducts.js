import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { fetchProducts } from "../api/products";

export const useProducts = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const brandsParam = searchParams.getAll("brand").join("|");
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();

  const [reloadKey, setReloadKey] = useState(0);
  const requestKey = `${category}#${reloadKey}`;
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
    const matchesQuery = (p) =>
      !query ||
      p.title.toLowerCase().includes(query) ||
      (p.brand ?? "").toLowerCase().includes(query);

    return categoryProducts.filter(
      (p) =>
        p.price >= min &&
        p.price <= max &&
        (selectedBrands.length === 0 || selectedBrands.includes(p.brand)) &&
        matchesQuery(p),
    );
  }, [categoryProducts, minPrice, maxPrice, brandsParam, query]);

  return {
    products,
    brands,
    status,
    error: isCurrent ? result.error : null,
    retry: () => setReloadKey((k) => k + 1),
  };
};
