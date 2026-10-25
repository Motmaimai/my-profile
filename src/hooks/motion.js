import {useEffect, useRef, useState} from "react";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(REDUCED_QUERY).matches;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion);
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia(REDUCED_QUERY);
    const onChange = () => setReduced(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else if (mq.removeListener) mq.removeListener(onChange);
    };
  }, []);
  return reduced;
}

// Adds `is-visible` once the element scrolls into view. Content is only hidden
// by CSS when <html> has the `can-reveal` class, which Main sets on mount —
// so nothing is hidden without JavaScript or IntersectionObserver.
export function useReveal(options) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return undefined;
    }
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      {rootMargin: "0px 0px -10% 0px", threshold: 0.1, ...options}
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options]);
  return ref;
}

// Progress (0 → 1) of an element scrolling through the viewport.
// Without `anchor` it is "sticky" progress: 0 when the element's top reaches
// the viewport top, 1 when its bottom reaches the viewport bottom. With
// `anchor` (fraction of viewport height) it is how much of the element has
// passed that line. Kept in a ref to avoid re-renders; `onChange` runs at
// most once per animation frame.
export function useScrollProgress(ref, onChange, anchor) {
  const progress = useRef(0);
  const cb = useRef(onChange);
  cb.current = onChange;
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      let p;
      if (anchor !== undefined) {
        p = (vh * anchor - rect.top) / (rect.height || 1);
      } else {
        const total = rect.height - vh;
        p = total > 0 ? -rect.top / total : rect.top < 0 ? 1 : 0;
      }
      p = Math.min(1, Math.max(0, p));
      progress.current = p;
      if (cb.current) cb.current(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, {passive: true});
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, anchor]);
  return progress;
}
