import { useEffect, useState } from "react";
import useSound from "../hooks/useSound";
import "./../assets/scss/Item.scss";

export default function Item({ index, item, isSelected, onToggle, size, nItems, areaH, containerRef }) {
  const selectSound = useSound("/sounds/select_item.wav");

  const hasImage = typeof item?.img === "string" && item.img.trim() !== "";
  const label = typeof item?.label === "string" ? item.label : "";

  const [containerSize, setContainerSize] = useState(0);

  const itemSize = (containerSize * 0.5) / ((nItems / nItems) * 1.2);

  const padding = itemSize * 0.06;
  const contentPadding = itemSize * 0.04;
  const imageMaxWidth = itemSize * 0.7;
  const fontSize = Math.max(10, itemSize * 0.12);

  useEffect(() => {
    const el = containerRef.current;

    if (!el) return;

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = el.getBoundingClientRect();
      setContainerSize(Math.min(width * 0.3, height)); // <= AQUÍ tienes el valor correcto
    });

    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, []);

  const handleClick = () => {
    if (typeof onToggle === "function") {
      selectSound.play();
      onToggle(index);
    }
  };

  return (
    <button
      type="button"
      className={`item-card ${isSelected ? "item-card--selected" : ""}`}
      onClick={handleClick}
      aria-pressed={!!isSelected}
      style={{
        padding,
        width: itemSize,
        height: itemSize,
      }}
    >
      <div className={`item-card__content ${hasImage ? "item-card__content--image" : ""}`}>
        {hasImage ? (
          <img
            style={{ padding: contentPadding, maxWidth: imageMaxWidth }}
            className="item-card__image"
            src={item.img}
            alt={label || `Item ${index + 1}`}
          />
        ) : (
          <span style={{ fontSize, padding: contentPadding }} className="item-card__label">
            {label || `Item ${index + 1}`}
          </span>
        )}
      </div>
    </button>
  );
}
