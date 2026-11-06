import "./header.css";
import {
  Cart,
  MenuIcon,
  WishlistIcon,
  ProfileIcon,
} from "../assets/appIcons.jsx";
import { Searchbox } from "../ui/searchbox";

export const Header = () => {
  return (
    <div className="header flex">
      <MenuIcon height="32" width="32" stroke="var(--svg-color)" />
      <Searchbox placeholder="Search Products..." />
      <div className="header__icons flex">
        <Cart height="32" width="32" fill="var(--svg-color)" />
        <WishlistIcon height="32" width="32" fill="var(--svg-color)" />
        <ProfileIcon height="32" width="32" fill="var(--svg-color)" />
      </div>
    </div>
  );
};
