import { useSearchParams } from "react-router";
import { CheckboxList } from "../../ui/checkboxList";
import "./filters.css";
export const BrandFilter = ({ brands, status, query = "" }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.getAll("brand");

  const handleToggle = (brand) => {
    setSearchParams((params) => {
      const current = params.getAll("brand");
      const next = current.includes(brand)
        ? current.filter((b) => b !== brand)
        : [...current, brand];
      params.delete("brand");
      next.forEach((b) => params.append("brand", b));
      params.delete("page"); // reset pagination when a filter changes
      return params;
    });
  };

  return (
    <section className="sidenav__group">
      <h3>Brands</h3>

      {status === "loading" && <p className="filter__status">Loading…</p>}

      {status === "error" && (
        <p className="filter__status filter__status--error">
          Couldn't load brands.
        </p>
      )}

      {status === "success" && brands.length === 0 && (
        <p className="filter__status">No brands in this category.</p>
      )}

      {status === "success" && brands.length > 0 && (
        <CheckboxList
          items={brands.map((b) => ({ value: b, label: b }))}
          isChecked={(b) => selected.includes(b)}
          onToggle={handleToggle}
          query={query}
        />
      )}
    </section>
  );
};
