import "./../assets/scss/Item.scss";

export default function Item({ index, item, isSelected, onToggle }) {
  const hasImage = typeof item?.img === "string" && item.img.trim() !== "";
  const label = typeof item?.label === "string" ? item.label : "";

  const handleClick = () => {
    if (typeof onToggle === "function") {
      onToggle(index);
    }
  };

  return (
    <button
      type="button"
      className={`item-card ${isSelected ? "item-card--selected" : ""}`}
      onClick={handleClick}
      aria-pressed={!!isSelected}
    >
      <div className={`item-card__content ${hasImage ? "item-card__content--image" : ""}`}>
        {hasImage ? (
          <img className="item-card__image" src={item.img} alt={label || `Item ${index + 1}`} />
        ) : (
          <span className="item-card__label">{label || `Item ${index + 1}`}</span>
        )}
      </div>
    </button>
  );
}
