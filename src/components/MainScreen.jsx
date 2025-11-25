import { useContext, useEffect, useMemo, useRef, useState } from "react";
import "./../assets/scss/MainScreen.scss";
import Item from "./Item";
import MessageScreen from "./MessageScreen";
import useSound from "../hooks/useSound";
import { GlobalContext } from "./GlobalContext";

export default function MainScreen({ config, sendResult, submitPuzzleSolution, solved, solvedTrigger }) {
  const { I18n } = useContext(GlobalContext);
  const rounds = useMemo(() => {
    if (Array.isArray(config?.rounds) && config.rounds.length > 0) {
      return config.rounds;
    }
    return [Array.isArray(config?.items) ? config.items : []];
  }, [config?.rounds, config?.items]);

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [itemsAreaH, setItemsAreaH] = useState(window.innerHeight * 0.6);
  const [currentRound, setCurrentRound] = useState(0);
  const [roundSelections, setRoundSelections] = useState(() => rounds.map(() => []));
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const containerRef = useRef(null);

  const items = rounds[currentRound] || [];
  const selectedPositions = roundSelections[currentRound] || [];

  const sendSound = useSound("/sounds/next_round.mp3");
  const resetSound = useSound("/sounds/reset.mp3");

  useEffect(() => {
    if (solved) {
      //show message
    } else {
      handleReset();
    }
  }, [solvedTrigger]);

  useEffect(() => {
    setCurrentRound(0);
    setRoundSelections(rounds.map(() => []));
    setHasSubmitted(false);
  }, [rounds]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setItemsAreaH(height * 0.6);
      setSize({ width, height });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    resetSound.play();
  };

  const handleSend = () => {
    if (hasSubmitted) {
      return;
    }
    sendSound.play();
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
        <div style={{ height: size.height * 0.15 }}>
          {config?.title && (
            <h1 className="title" style={{ fontSize: size.width * 0.015 + size.height * 0.05 }}>
              {config.title}
            </h1>
          )}
          {config?.rounds?.length > 1 && (
            <div className="round_indicator" style={{ fontSize: size.width * 0.005 + size.height * 0.03 }}>
              {I18n.getTrans("i.rounds")}
              {currentRound + 1}/{rounds.length}
            </div>
          )}
        </div>
        {config?.instructions && <p className="instructions">{config.instructions}</p>}
        <div ref={containerRef} className="items_wrapper" style={{ height: size.height * 0.6 }}>
          {items.map((item, index) => (
            <Item
              key={index}
              index={index}
              item={item}
              isSelected={selectedPositions.includes(index)}
              onToggle={handleToggle}
              size={size}
              nItems={items.length}
              areaH={itemsAreaH}
              containerRef={containerRef}
            />
          ))}
        </div>
        <div
          className="controls"
          style={{
            paddingLeft: "10%",
            paddingRight: "10%",
            paddingTop: size.height * 0.01,
            paddingBottom: size.height * 0.01,
            fontSize: size.height * 0.02,
            gap: size.height * 0.02,
            borderRadius: size.height * 0.02,
            height: size.height * 0.07,
          }}
        >
          <button
            type="button"
            className="controls__button controls__button--send"
            onClick={() => {
              handleSend();
            }}
            disabled={hasSubmitted}
            style={{ padding: "2% 10%", borderRadius: size.height * 0.01 }}
          >
            {I18n.getTrans("i.send")}
          </button>
          <button
            type="button"
            className="controls__button controls__button--reset"
            onClick={() => {
              handleReset();
            }}
            disabled={hasSubmitted}
            style={{ padding: "2% 10%", borderRadius: size.height * 0.01 }}
          >
            {I18n.getTrans("i.reset")}
          </button>
        </div>
      </div>
      <div className="victory">
        <MessageScreen sendSolution={submitPuzzleSolution} />
      </div>
    </div>
  );
}
