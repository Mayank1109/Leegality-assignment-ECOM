import { Outlet } from "react-router";
import { Header } from "./header";

// Shared shell for every screen: header on top, current route below.
export const Layout = () => {
  return (
    <div className="app-shell">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};
