import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { fetchCategories } from "../../api/products";
import { CheckboxList } from "../../ui/checkboxList";
import "./filters.css";

export const CategoryFilter = ({ query = "" }) => {
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [reloadKey, setReloadKey] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const selected = searchParams.get("category");

  useEffect(() => {
    const controller = new AbortController();

    fetchCategories({ signal: controller.signal })
      .then((data) => {
        setCategories(data);
        setStatus("success");
      })
      .catch((err) => {
        if (err.name !== "AbortError") setStatus("error");
      });

    return () => controller.abort();
  }, [reloadKey]);

  const handleToggle = (slug) => {
    setSearchParams((params) => {
      if (params.get("category") === slug) params.delete("category");
      else params.set("category", slug);
      params.delete("brand"); // brands differ per category
      params.delete("page"); // reset pagination when a filter changes
      return params;
    });
  };

  return (
    <section className="sidenav__group">
      <h3>Categories</h3>

      {status === "loading" && <p className="filter__status">Loading…</p>}

      {status === "error" && (
        <p className="filter__status filter__status--error">
          Couldn't load categories.{" "}
          <button
            className="filter__retry"
            onClick={() => {
              setStatus("loading");
              setReloadKey((k) => k + 1);
            }}
          >
            Retry
          </button>
        </p>
      )}

      {status === "success" && (
        <CheckboxList
          items={categories.map(({ slug, name }) => ({
            value: slug,
            label: name,
          }))}
          isChecked={(slug) => selected === slug}
          onToggle={handleToggle}
          query={query}
        />
      )}
    </section>
  );
};
