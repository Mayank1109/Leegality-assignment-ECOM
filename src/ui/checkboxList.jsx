import { useState } from "react";

/**
 * Reusable checkbox list with "Show all / Show less" collapsing.
 * items: { value: string, label: string }[]
 */
export const CheckboxList = ({
  items,
  isChecked,
  onToggle,
  collapsedCount = 6,
}) => {
  const [expanded, setExpanded] = useState(false);

  // Collapsed: the first few items, plus any checked ones further down.
  const visible = expanded
    ? items
    : items.filter((item, i) => i < collapsedCount || isChecked(item.value));

  return (
    <>
      <ul className="filter__list">
        {visible.map(({ value, label }) => (
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

      {items.length > collapsedCount && (
        <button className="filter__more" onClick={() => setExpanded((e) => !e)}>
          {expanded ? "Show less" : `Show all (${items.length})`}
        </button>
      )}
    </>
  );
};
