import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import "./header.css";
import {
  Cart,
  MenuIcon,
  WishlistIcon,
  ProfileIcon,
} from "../assets/appIcons.jsx";
import { Searchbox } from "../ui/searchbox";

const ProductSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [draft, setDraft] = useState("");
  const onListing = location.pathname === "/";

  const value = onListing ? (searchParams.get("q") ?? "") : draft;

  const handleChange = (text) => {
    if (!onListing) {
      setDraft(text);
      return;
    }
    setSearchParams(
      (params) => {
        if (text) params.set("q", text);
        else params.delete("q");
        params.delete("page");
        return params;
      },
      { replace: true },
    );
  };

  const handleSubmit = (text) => {
    if (onListing) return; // already filtering live
    const q = text.trim();
    navigate(q ? `/?q=${encodeURIComponent(q)}` : "/");
    setDraft("");
  };

  return (
    <Searchbox
      value={value}
      onChange={handleChange}
      onSubmit={handleSubmit}
      placeholder="Search Products..."
      ariaLabel="Search products"
    />
  );
};

export const Header = ({ onMenuClick, menuExpanded }) => {
  return (
    <header className="header flex">
      <button
        className="header__menu"
        onClick={onMenuClick}
        aria-label={menuExpanded ? "Hide filters" : "Show filters"}
        aria-expanded={menuExpanded}
      >
        <MenuIcon height="32" width="32" stroke="var(--svg-color)" />
      </button>
      <ProductSearch />
      <div className="header__icons flex">
        <Cart height="32" width="32" fill="var(--svg-color)" />
        <WishlistIcon height="32" width="32" fill="var(--svg-color)" />
        <ProfileIcon height="32" width="32" fill="var(--svg-color)" />
      </div>
    </header>
  );
};
