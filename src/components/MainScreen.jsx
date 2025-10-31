import { useEffect, useMemo, useState } from "react";
import "./../assets/scss/MainScreen.scss";
import Item from "./Item";

export default function MainScreen({ config, sendResult }) {
  const rounds = useMemo(() => {
    if (Array.isArray(config?.rounds) && config.rounds.length > 0) {
      return config.rounds;
    }
    return [Array.isArray(config?.items) ? config.items : []];
  }, [config?.rounds, config?.items]);

  const [currentRound, setCurrentRound] = useState(0);
  const [roundSelections, setRoundSelections] = useState(() => rounds.map(() => []));
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    setCurrentRound(0);
    setRoundSelections(rounds.map(() => []));
    setHasSubmitted(false);
  }, [rounds]);

  const items = rounds[currentRound] || [];
  const selectedPositions = roundSelections[currentRound] || [];

  const handleToggle = (index) => {
    setRoundSelections((prev) =>
      prev.map((positions, roundIndex) => {
        if (roundIndex !== currentRound) {
          return positions;
        }
        return positions.includes(index) ? positions.filter((position) => position !== index) : [...positions, index];
      }),
    );
  };

  const handleReset = () => {
    setCurrentRound(0);
    setRoundSelections(rounds.map(() => []));
    setHasSubmitted(false);
  };

  const handleSend = () => {
    if (hasSubmitted) {
      return;
    }

    if (currentRound < rounds.length - 1) {
      setCurrentRound((prev) => prev + 1);
      return;
    }

    if (typeof sendResult === "function") {
      const formatted = roundSelections
        .map((positions, roundIndex) => {
          const currentPositions = roundIndex === currentRound ? selectedPositions : positions;
          const ordered = [...currentPositions].sort((a, b) => a - b);
          if (ordered.length === 0) {
            return "";
          }
          return ordered.map((position) => String(position + 1)).join(",");
        })
        .join(";")
        .replace(/;+$/, "");
      sendResult(formatted);
    }

    setHasSubmitted(true);
  };

  return (
    <div
      id="MainScreen"
      className="screen_wrapper"
      style={{ backgroundImage: config?.backgroundImg ? `url(${config.backgroundImg})` : "none" }}
    >
      <div className="content_wrapper">
        {config?.title && <h1 className="title">{config.title}</h1>}
        {config?.rounds?.length > 1 && (
          <div className="round_indicator">
            Ronda: {currentRound + 1}/{rounds.length}
          </div>
        )}
        {config?.instructions && <p className="instructions">{config.instructions}</p>}
        <div className="items_wrapper">
          {items.map((item, index) => (
            <Item
              key={index}
              index={index}
              item={item}
              isSelected={selectedPositions.includes(index)}
              onToggle={handleToggle}
            />
          ))}
        </div>
        <div className="controls">
          <button
            type="button"
            className="controls__button controls__button--send"
            onClick={handleSend}
            disabled={hasSubmitted}
          >
            Enviar
          </button>
          <button
            type="button"
            className="controls__button controls__button--reset"
            onClick={handleReset}
            disabled={hasSubmitted}
          >
            Resetear
          </button>
        </div>
      </div>
    </div>
  );
}
