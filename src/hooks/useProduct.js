import { useEffect, useState } from "react";
import { fetchProduct } from "../api/products";

export const useProduct = (id) => {
  const [reloadKey, setReloadKey] = useState(0);
  const requestKey = `${id}#${reloadKey}`;
  const [result, setResult] = useState({ key: null, data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();
    fetchProduct(id, { signal: controller.signal })
      .then((data) => setResult({ key: requestKey, data, error: null }))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setResult({ key: requestKey, data: null, error: err });
        }
      });
    return () => controller.abort();
  }, [id, requestKey]);

  const isCurrent = result.key === requestKey;
  const status = !isCurrent ? "loading" : result.error ? "error" : "success";

  return {
    product: isCurrent ? result.data : null,
    status,
    error: isCurrent ? result.error : null,
    retry: () => setReloadKey((k) => k + 1),
  };
};
