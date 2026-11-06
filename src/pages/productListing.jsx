import { useRef } from "react";
import { useOutletContext, useSearchParams } from "react-router";
import { SideNav } from "../components/sideNav";
import { ProductGrid } from "../components/productGrid";
import { Pagination } from "../ui/pagination";
import { SearchIcon } from "../assets/appIcons.jsx";
import { useProducts } from "../hooks/useProducts";

const PAGE_SIZE = 20;

export const ProductListing = () => {
  const { isMobile, sidebarCollapsed, drawerOpen, openDrawer, closeDrawer } =
    useOutletContext();
  const { products, brands, status, retry } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const requestedPage = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const page = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(requestedPage, 1), totalPages);
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = products.slice(start, start + PAGE_SIZE);
  const contentRef = useRef(null);

  const handlePageChange = (next) => {
    setSearchParams((params) => {
      if (next <= 1) params.delete("page");
      else params.set("page", String(next));
      return params;
    });
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showSidebar = isMobile || !sidebarCollapsed;

  return (
    <div className="listing">
      {showSidebar && (
        <SideNav
          brands={brands}
          productsStatus={status}
          isMobile={isMobile}
          open={drawerOpen}
          onClose={closeDrawer}
        />
      )}
      {drawerOpen && (
        <div
          className="sidenav-backdrop"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      <section className="listing__content" ref={contentRef}>
        <h2 className="listing__title">
          {isMobile ? (
            <button
              className="listing__filters-btn"
              onClick={openDrawer}
              aria-controls="filters-panel"
              aria-expanded={drawerOpen}
            >
              <SearchIcon height="22" width="22" /> Filters
            </button>
          ) : (
            <>
              <SearchIcon height="22" width="22" /> Filters
            </>
          )}
        </h2>

        <ProductGrid products={pageItems} status={status} onRetry={retry} />

        {status === "success" && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </div>
  );
};
