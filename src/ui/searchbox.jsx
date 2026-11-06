import { SearchIcon } from "../assets/appIcons.jsx";
import "./searchbox.css";
export const Searchbox = (props) => {
  return (
    <div className="searchbox flex" style={{ ...props.style }}>
      <SearchIcon height="24" width="24" />
      <input type="text" placeholder={props.placeholder} />
    </div>
  );
};
