import { useSearchParams } from "react-router";

export const usePagination = (items, pageSize) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const requested = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const page = Number.isNaN(requested)
    ? 1
    : Math.min(Math.max(requested, 1), totalPages);

  const start = (page - 1) * pageSize;
  const pageItems = items.slice(start, start + pageSize);

  const setPage = (next) => {
    setSearchParams((params) => {
      if (next <= 1) params.delete("page");
      else params.set("page", String(next));
      return params;
    });
  };

  return { page, totalPages, pageItems, setPage };
};
