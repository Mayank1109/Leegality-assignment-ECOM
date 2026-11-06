import { useState } from "react";

export const CheckboxList = ({
  items,
  isChecked,
  onToggle,
  query = "",
  collapsedCount = 6,
}) => {
  const [expanded, setExpanded] = useState(false);
  const needle = query.trim().toLowerCase();

  if (needle) {
    const matches = items.filter((item) =>
      item.label.toLowerCase().includes(needle),
    );
    if (matches.length === 0) {
      return <p className="filter__status">No matches.</p>;
    }
    return (
      <OptionList items={matches} isChecked={isChecked} onToggle={onToggle} />
    );
  }

  const visible = expanded
    ? items
    : items.filter((item, i) => i < collapsedCount || isChecked(item.value));

  return (
    <>
      <OptionList items={visible} isChecked={isChecked} onToggle={onToggle} />
      {items.length > collapsedCount && (
        <button className="filter__more" onClick={() => setExpanded((e) => !e)}>
          {expanded ? "Show less" : `Show all (${items.length})`}
        </button>
      )}
    </>
  );
};

const OptionList = ({ items, isChecked, onToggle }) => (
  <ul className="filter__list">
    {items.map(({ value, label }) => (
      <li key={value}>
        <label className="filter__option">
          <input
            type="checkbox"
            checked={isChecked(value)}
            onChange={() => onToggle(value)}
          />
          {label}
        </label>
      </li>
    ))}
  </ul>
);
