import { useContext, useEffect, useMemo, useRef, useState } from "react";
import useSound from "../hooks/useSound";
import Item from "./Item";
import MessageScreen from "./MessageScreen";
import { GlobalContext } from "./GlobalContext";
import "./../assets/scss/MainScreen.scss";

const messageVisible = { opacity: 1, visibility: "visible", transform: "scale(1)", zIndex: 150 };

export default function MainScreen({ config, sendResult, submitPuzzleSolution, solved, solvedTrigger }) {
  const { escapp, I18n } = useContext(GlobalContext);
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
  const [currentRound, setCurrentRound] = useState(0);
  const [roundSelections, setRoundSelections] = useState(() => rounds.map(() => []));
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [itemSize, setItemSize] = useState(0);
  const [titleFontSize, setTitleFontSize] = useState(20);
  const [showMessage, setShowMessage] = useState(false);

  const containerRef = useRef(null);
  const titleRef = useRef(null);

  const items = rounds[currentRound].items || [];
  const selectedPositions = roundSelections[currentRound] || [];
  const showTitle = rounds[currentRound]?.title || rounds[currentRound]?.img;

  const sendSound = useSound("/sounds/next_round.mp3");
  const resetSound = useSound("/sounds/reset.mp3");
  const winSound = useSound("/sounds/win.wav");

  useEffect(() => {
    if (solvedTrigger < 1) {
      return;
    }

    if (solved) {
      if (config.actionAfterSolve === "SHOW_MESSAGE") {
        setShowMessage(true);
      }
      winSound.play();
    } else {
      setShowMessage(true);
    }
  }, [solvedTrigger]);

  // Calcula el tamaño dinámico del título basado en el contenedor
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const resize = () => {
      const styles = getComputedStyle(el);
      const height = parseFloat(styles.height);
      const width = parseFloat(styles.width);
      const maxFontByHeight = height * 0.35;
      const maxFontByWidth = width * 0.1;
      const finalSize = Math.min(maxFontByHeight, maxFontByWidth);
      setTitleFontSize(finalSize);
    };

    resize();
    const obs = new ResizeObserver(resize);
    obs.observe(el);

    return () => obs.disconnect();
  }, [size.height, size.width]);

  // Calcula el tamaño óptimo de los items en función del espacio disponible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const calculate = () => {
      const width = el.clientWidth;
      const height = el.clientHeight;
      const count = items.length;

      let bestSize = 0;

      for (let cols = 1; cols <= count; cols++) {
        const rows = Math.ceil(count / cols);
        const sizeX = width / cols;
        const sizeY = height / rows;
        const size = Math.min(sizeX, sizeY);
        if (size > bestSize) bestSize = size;
      }

      setItemSize(bestSize * 0.9);
    };

    calculate();
    const resizeObserver = new ResizeObserver(calculate);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [items]);

  useEffect(() => {
    setCurrentRound(0);
    setRoundSelections(rounds.map(() => []));
    setHasSubmitted(false);
  }, [rounds]);

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
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
    setShowMessage(false);
    resetSound.play();
  };
  const handleReturn = () => {
    if (currentRound === 0) return;
    setCurrentRound(currentRound - 1);
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

    const formatted = roundSelections
      .map((positions, roundIndex) => {
        const currentPositions = roundIndex === currentRound ? selectedPositions : positions;
        const ordered = [...currentPositions].sort((a, b) => a - b);
        if (ordered.length === 0) {
          return "";
        }
        return ordered.map((position) => String(position + 1)).join(";");
      })
      .join("&")
      .replace(/;+$/, "");
    sendResult(formatted);

    setHasSubmitted(true);
  };

  return (
    <div
      id="MainScreen"
      className="screen_wrapper"
      style={{ backgroundImage: config?.backgroundImg ? `url(${config.backgroundImg})` : "none" }}
    >
      <div
        className="content_wrapper"
        style={showMessage ? { filter: "blur(6px)", pointerEvents: "none", userSelect: "none" } : {}}
      >
        {showTitle && (
          <div
            ref={titleRef}
            className="title_wrapper"
            style={{
              padding: `${size.height * 0.02}px`,
              fontSize: size.height * 0.02,
              gap: size.height * 0.02,
              borderRadius: size.height * 0.02,
            }}
          >
            <img
              src={rounds[currentRound].img}
              style={{ height: size.height * 0.1 + size.width * 0.02, maxHeight: "12vh" }}
            />
            <h1 className="title" style={{ fontSize: titleFontSize }}>
              {rounds[currentRound]?.title}
            </h1>
          </div>
        )}
        <div ref={containerRef} className="items_wrapper" style={{ height: size.height * 0.7, gap: itemSize * 0.05 }}>
          {items.map((item, index) => (
            <Item
              key={index}
              index={index}
              item={item}
              isSelected={selectedPositions.includes(index)}
              onToggle={handleToggle}
              itemSize={itemSize}
            />
          ))}
        </div>
        <div
          className="controls"
          style={{
            padding: `${size.height * 0.01}px 10%`,
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
            disabled={hasSubmitted || roundSelections[currentRound].length === 0}
            style={{ borderRadius: size.height * 0.01 }}
          >
            {currentRound === rounds.length - 1 ? I18n.getTrans("i.end") : I18n.getTrans("i.continue")}
          </button>
          {rounds.length > 1 && (
            <button
              type="button"
              className="controls__button controls__button--reset"
              onClick={() => {
                handleReturn();
              }}
              disabled={hasSubmitted || currentRound === 0}
              style={{ borderRadius: size.height * 0.01 }}
            >
              {I18n.getTrans("i.return")}
            </button>
          )}
        </div>
      </div>
      <div className="victory" style={showMessage ? messageVisible : {}}>
        <MessageScreen sendSolution={submitPuzzleSolution} resetPuzle={handleReset} solved={solved} />
      </div>
    </div>
  );
}
