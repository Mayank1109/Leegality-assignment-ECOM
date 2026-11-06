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
      <MenuIcon height="26" width="26" stroke="var(--svg-color)" />
      <Searchbox />
      <div className="header__icons flex">
        <Cart height="26" width="26" fill="var(--svg-color)" />
        <WishlistIcon height="26" width="26" fill="var(--svg-color)" />
        <ProfileIcon height="26" width="26" fill="var(--svg-color)" />
      </div>
    </div>
  );
};
