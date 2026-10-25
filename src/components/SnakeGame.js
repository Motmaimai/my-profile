import React, {useEffect, useRef} from "react";
import "./SnakeGame.scss";

// The original background mini game, now an opt-in easter egg: it only runs
// (and only captures arrow keys) while open. Esc closes it.
const GRID = 20;
const TICK = 90;
const DIRS = [
  {x: 1, y: 0},
  {x: -1, y: 0},
  {x: 0, y: 1},
  {x: 0, y: -1}
];
const KEYS = {
  ArrowUp: {x: 0, y: -1},
  ArrowDown: {x: 0, y: 1},
  ArrowLeft: {x: -1, y: 0},
  ArrowRight: {x: 1, y: 0}
};

const SnakeGame = ({onClose}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas && canvas.getContext("2d");
    if (!ctx) return undefined;

    let snake = [
      {x: 100, y: 100},
      {x: 80, y: 100},
      {x: 60, y: 100}
    ];
    let direction = {x: 1, y: 0};
    let nextDirection = direction;
    const food = {x: 200, y: 200};
    let manual = false;
    let manualTimeout = 0;
    let timer = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const createFood = () => {
      food.x = Math.floor(Math.random() * (canvas.width / GRID)) * GRID;
      food.y = Math.floor(Math.random() * (canvas.height / GRID)) * GRID;
    };

    const onKey = e => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      const dir = KEYS[e.key];
      if (!dir) return;
      e.preventDefault();
      if (dir.x === -direction.x && dir.y === -direction.y) return;
      nextDirection = dir;
      manual = true;
      // Back to autopilot after 3s without input.
      clearTimeout(manualTimeout);
      manualTimeout = setTimeout(() => {
        manual = false;
      }, 3000);
    };

    const update = () => {
      if (!manual && Math.random() < 0.08) {
        const d = DIRS[Math.floor(Math.random() * DIRS.length)];
        if (d.x !== -direction.x && d.y !== -direction.y) nextDirection = d;
      }
      direction = nextDirection;
      const head = {
        x: snake[0].x + direction.x * GRID,
        y: snake[0].y + direction.y * GRID
      };
      // Wrap around the edges.
      if (head.x >= canvas.width) head.x = 0;
      if (head.x < 0) head.x = Math.floor(canvas.width / GRID) * GRID;
      if (head.y >= canvas.height) head.y = 0;
      if (head.y < 0) head.y = Math.floor(canvas.height / GRID) * GRID;
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) createFood();
      else snake.pop();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#5ad1e6";
      ctx.shadowColor = "#5ad1e6";
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(food.x + GRID / 2, food.y + GRID / 2, GRID / 3, 0, Math.PI * 2);
      ctx.fill();

      snake.forEach((part, i) => {
        const isHead = i === 0;
        ctx.fillStyle = isHead
          ? manual
            ? "#ffcf9e"
            : "#f4a259"
          : "rgba(244, 162, 89, 0.4)";
        ctx.shadowColor = "#f4a259";
        ctx.shadowBlur = isHead && manual ? 25 : 10;
        ctx.fillRect(part.x, part.y, GRID - 2, GRID - 2);
      });
    };

    const loop = () => {
      update();
      draw();
      timer = setTimeout(loop, TICK);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", resize);
    loop();

    return () => {
      clearTimeout(timer);
      clearTimeout(manualTimeout);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", resize);
    };
  }, [onClose]);

  return (
    <div className="snake" role="region" aria-label="Mini game Snake">
      <canvas ref={canvasRef} className="snake__canvas" aria-hidden="true" />
      <div className="snake__hud mono">
        <span>SNAKE · phím mũi tên để lái · Esc để thoát</span>
        <button type="button" onClick={onClose} autoFocus>
          Thoát
        </button>
      </div>
    </div>
  );
};

export default SnakeGame;
