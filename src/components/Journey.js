import React, {useCallback, useRef, useState} from "react";
import SceneCanvas from "./SceneCanvas";
import {useReveal, useScrollProgress} from "../hooks/motion";
import "./Journey.scss";

// "Beyond the code": a tall section whose sticky stage shows the 3D world
// with the camera riding the route. Scroll position drives the camera — the
// page itself scrolls normally, nothing is locked or hijacked.
const Journey = ({journey}) => {
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const [active, setActive] = useState(0);
  const count = journey.checkpoints.length;

  const progress = useScrollProgress(trackRef, p => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    const next = Math.min(count - 1, Math.floor(p * count));
    setActive(prev => (prev === next ? prev : next));
  });
  const getProgress = useCallback(() => progress.current, [progress]);
  const galleryRef = useReveal();

  return (
    <section
      className="journey"
      id="beyond"
      aria-labelledby="beyond-title"
      style={{"--count": count}}
    >
      <div className="journey__track" ref={trackRef}>
        <div className="journey__stage">
          <SceneCanvas mode="journey" getProgress={getProgress} />
          <div className="journey__scrim" aria-hidden="true" />

          <div className="journey__content container">
            <header className="journey__head">
              <p className="section-head__index">04 — Beyond the code</p>
              <h2 className="section-head__title" id="beyond-title">
                Ngoài những dòng code, <em>là những cung đường</em>.
              </h2>
              <p className="journey__intro">{journey.intro}</p>
            </header>

            <ol className="journey__checkpoints">
              {journey.checkpoints.map((cp, i) => (
                <li
                  key={cp.code}
                  className={`checkpoint${i === active ? " is-active" : ""}${
                    i < active ? " is-passed" : ""
                  }`}
                >
                  <span className="checkpoint__code mono">{cp.code}</span>
                  <h3 className="checkpoint__title">{cp.title}</h3>
                  <p className="checkpoint__text">{cp.text}</p>
                </li>
              ))}
            </ol>

            <div className="journey__hud mono" aria-hidden="true">
              <span>
                CHECKPOINT {String(active + 1).padStart(2, "0")} /{" "}
                {String(count).padStart(2, "0")}
              </span>
              <span className="journey__bar">
                <span ref={barRef} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {journey.photos.length > 0 && (
        <div className="journey__gallery container reveal" ref={galleryRef}>
          {journey.photos.map(photo => (
            <figure key={photo.src}>
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              {photo.caption && <figcaption>{photo.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
    </section>
  );
};

export default Journey;
