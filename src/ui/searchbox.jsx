import { SearchIcon } from "../assets/appIcons.jsx";
import "./searchbox.css";

export const Searchbox = ({
  value,
  onChange,
  onSubmit,
  placeholder,
  ariaLabel,
  className = "",
  style,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form
      role="search"
      className={`searchbox flex ${className}`.trim()}
      style={style}
      onSubmit={handleSubmit}
    >
      <SearchIcon height="24" width="24" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
      />
    </form>
  );
};
