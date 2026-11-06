import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Header } from "./header";
import { MOBILE_QUERY, useMediaQuery } from "../hooks/useMediaQuery";

export const Layout = () => {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // desktop
  const [drawerOpen, setDrawerOpen] = useState(false); // mobile
  const location = useLocation();
  const navigate = useNavigate();
  const onListing = location.pathname === "/";

  const handleMenuClick = () => {
    if (!onListing) {
      navigate("/");
      setSidebarCollapsed(false);
      setDrawerOpen(isMobile);
      return;
    }
    if (isMobile) setDrawerOpen((open) => !open);
    else setSidebarCollapsed((collapsed) => !collapsed);
  };

  useEffect(() => {
    if (!isMobile || !drawerOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobile, drawerOpen]);

  return (
    <div className="app-shell">
      <Header
        onMenuClick={handleMenuClick}
        menuExpanded={onListing && (isMobile ? drawerOpen : !sidebarCollapsed)}
      />
      <main className="main-content">
        <Outlet
          context={{
            isMobile,
            sidebarCollapsed,
            drawerOpen: isMobile && drawerOpen,
            openDrawer: () => setDrawerOpen(true),
            closeDrawer: () => setDrawerOpen(false),
          }}
        />
      </main>
    </div>
  );
};
