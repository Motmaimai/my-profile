import React, {useEffect, useRef, useState} from "react";
import SceneFallback from "./SceneFallback";
import {usePrefersReducedMotion} from "../hooks/motion";
import "./SceneCanvas.scss";

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGL2RenderingContext && canvas.getContext("webgl2")
    );
  } catch (e) {
    return false;
  }
}

function pickQuality() {
  const nav = window.navigator || {};
  const small = window.innerWidth < 760;
  const fewCores = nav.hardwareConcurrency && nav.hardwareConcurrency <= 4;
  const saveData = nav.connection && nav.connection.saveData;
  return small || fewCores || saveData ? "low" : "high";
}

// Mounts the Three.js world lazily: the chunk is only downloaded when the
// scene is about to enter the viewport, the render loop pauses off-screen or
// in a hidden tab, and everything is disposed on unmount. Any failure (no
// WebGL, chunk error, context loss) swaps in a static SVG fallback.
const SceneCanvas = ({mode = "hero", getProgress, className = ""}) => {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const [status, setStatus] = useState("idle"); // idle | ready | fallback
  const progressRef = useRef(getProgress);
  progressRef.current = getProgress;

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;
    if (!("IntersectionObserver" in window) || !hasWebGL()) {
      setStatus("fallback");
      return undefined;
    }

    let world = null;
    let disposed = false;
    let visible = false;
    let ro = null;

    const syncRunning = () => {
      if (!world) return;
      if (visible && !document.hidden) world.start();
      else world.stop();
    };

    const fail = () => {
      if (world) world.dispose();
      world = null;
      if (!disposed) setStatus("fallback");
    };

    const load = () =>
      import(/* webpackChunkName: "world" */ "../three/terrainWorld")
        .then(({createWorld}) => {
          if (disposed) return;
          world = createWorld(canvas, {
            mode,
            quality: pickQuality(),
            reducedMotion,
            getProgress: () => (progressRef.current ? progressRef.current() : 0)
          });
          const resize = () => {
            const rect = wrap.getBoundingClientRect();
            if (world) world.resize(rect.width, rect.height);
          };
          resize();
          if ("ResizeObserver" in window) {
            ro = new ResizeObserver(resize);
            ro.observe(wrap);
          } else {
            window.addEventListener("resize", resize);
            ro = {
              disconnect: () => window.removeEventListener("resize", resize)
            };
          }
          setStatus("ready");
          syncRunning();
        })
        .catch(fail);

    let loading = null;
    const io = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        // Start loading a little before the scene is on screen.
        if (entry.isIntersecting && !loading) loading = load();
        visible = entry.intersectionRatio > 0;
        syncRunning();
      },
      {rootMargin: "200px 0px", threshold: [0, 0.01]}
    );
    io.observe(wrap);

    const onVisibility = () => syncRunning();
    document.addEventListener("visibilitychange", onVisibility);

    const onPointer = e => {
      if (!world) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      world.setPointer(x, y);
    };
    window.addEventListener("pointermove", onPointer, {passive: true});

    const onLost = e => {
      e.preventDefault();
      fail();
    };
    canvas.addEventListener("webglcontextlost", onLost);

    // Reduced-motion mode renders on demand only; keep journey camera in sync.
    const onScroll = () => {
      if (world && reducedMotion && mode === "journey") world.refresh();
    };
    window.addEventListener("scroll", onScroll, {passive: true});

    return () => {
      disposed = true;
      io.disconnect();
      if (ro) ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      canvas.removeEventListener("webglcontextlost", onLost);
      if (world) world.dispose();
    };
  }, [mode, reducedMotion]);

  return (
    <div
      ref={wrapRef}
      className={`scene scene--${mode} scene--${status} ${className}`}
      aria-hidden="true"
    >
      {status !== "fallback" && (
        // A context is lost on dispose, so a new world needs a fresh canvas.
        <canvas
          key={`${mode}-${reducedMotion}`}
          ref={canvasRef}
          className="scene__canvas"
        />
      )}
      {status !== "ready" && <SceneFallback mode={mode} />}
    </div>
  );
};

export default SceneCanvas;
