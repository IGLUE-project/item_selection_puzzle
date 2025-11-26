import { useEffect, useState } from "react";
import useSound from "../hooks/useSound";
import "./../assets/scss/Item.scss";

export default function Item({ index, item, isSelected, onToggle, itemSize }) {
  const selectSound = useSound("/sounds/select_item.wav");

  const hasImage = typeof item?.img === "string" && item.img.trim() !== "";
  const label = typeof item?.label === "string" ? item.label : "";

  const padding = itemSize * 0.06;
  const contentPadding = itemSize * 0.04;
  const imageMaxWidth = itemSize * 0.7;
  const fontSize = Math.max(10, itemSize * 0.12);

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
          <img
            src={item.img}
            alt={label || `Item ${index + 1}`}
            className="item-card__image"
            style={{ padding: contentPadding, maxWidth: imageMaxWidth }}
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
