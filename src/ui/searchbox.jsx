import { SearchIcon } from "../assets/appIcons.jsx";
import "./searchbox.css";
export const Searchbox = () => {
  return (
    <div className="searchbox flex">
      <SearchIcon height="24" width="24" />
      <input type="text" placeholder="Search..." />
    </div>
  );
};
