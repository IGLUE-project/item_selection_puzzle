import useSound from "../hooks/useSound";
import "./../assets/scss/Item.scss";

export default function Item({ config, index, item, isSelected, onToggle, itemSize }) {
  const selectSound = useSound(config.soundSelectItem);
  const hasImage = typeof item?.img === "string" && item.img.trim() !== "";
  const hasLabel = typeof item?.label === "string" && item.label.trim() !== "";

  const padding = itemSize * 0.05;
  const imageMaxWidth = itemSize * 0.7;
  const fontSize = itemSize * 0.12;

  const handleClick = () => {
    selectSound.play();
    onToggle(index);
  };

  return (
    <button
      type="button"
      className={`item-card ${isSelected ? "item-card--selected" : ""}`}
      onClick={handleClick}
      aria-pressed={!!isSelected}
      style={{
        width: itemSize,
        height: itemSize,
        padding,
      }}
    >
      <div className={`item-card__content ${hasImage ? "item-card__content--image" : ""}`}>
        {hasImage ? (
          <>
            <img src={item.img} alt={item.label} className="item-card__image" style={{ maxWidth: imageMaxWidth }} />
            {hasLabel && (
              <span style={{ fontSize }} className="item-card__label">
                {item.label}
              </span>
            )}
          </>
        ) : (
          <span style={{ fontSize }} className="item-card__label">
            {item.label}
          </span>
        )}
      </div>
    </button>
  );
}
