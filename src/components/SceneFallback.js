import React from "react";

// Static stand-in for the WebGL scene: same visual language (contours,
// amber route, cyan nodes), zero JavaScript cost.
const contours = Array.from({length: 14}, (_, i) => {
  const y = 330 + i * 42;
  const a = 18 + i * 3;
  return `M-40 ${y} C 260 ${y - a}, 420 ${y + a}, 700 ${y - a * 0.4} S 1180 ${
    y + a
  }, 1640 ${y - a * 0.6}`;
});

const nodes = [
  [1080, 300],
  [930, 430],
  [1180, 560],
  [860, 700],
  [1060, 860]
];

const SceneFallback = ({mode}) => (
  <svg
    className={`scene__fallback scene__fallback--${mode}`}
    viewBox="0 0 1600 900"
    preserveAspectRatio="xMidYMid slice"
    focusable="false"
  >
    <g fill="none" stroke="currentColor" strokeWidth="1">
      {contours.map((d, i) => (
        <path key={i} d={d} opacity={0.08 + (i % 5 === 0 ? 0.12 : 0)} />
      ))}
    </g>
    <path
      className="scene__fallback-route"
      d="M1040 240 C 1180 320, 860 360, 930 430 S 1260 500, 1180 560 S 780 640, 860 700 S 1160 800, 1060 900"
      fill="none"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <g className="scene__fallback-nodes">
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <line x1={x} y1={y} x2={x} y2={y - 60} strokeWidth="1" />
          <rect
            x={x - 7}
            y={y - 74}
            width="14"
            height="14"
            transform={`rotate(45 ${x} ${y - 67})`}
            fill="none"
            strokeWidth="1.5"
          />
          <circle cx={x} cy={y} r="10" fill="none" strokeWidth="1" />
        </g>
      ))}
    </g>
  </svg>
);

export default SceneFallback;
