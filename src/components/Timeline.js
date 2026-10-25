import React, {useRef} from "react";
import SectionHead from "./SectionHead";
import {useReveal, useScrollProgress} from "../hooks/motion";
import "./Timeline.scss";

// Stable options object so useReveal does not re-subscribe on every render.
const REVEAL_LATE = {rootMargin: "0px 0px -30% 0px"};

const Milestone = ({item, experience}) => {
  const ref = useReveal(REVEAL_LATE);
  const cls = [
    "milestone",
    "reveal",
    item.highlight && "milestone--highlight",
    item.future && "milestone--future"
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={cls} ref={ref}>
      <span className="milestone__year mono">{item.year}</span>
      <span className="milestone__dot" aria-hidden="true" />
      <div className="milestone__body">
        <p className="milestone__place label">{item.place}</p>
        <h3 className="milestone__title">{item.title}</h3>
        <p className="milestone__text">{item.text}</p>
        {experience && (
          <>
            <p className="milestone__period mono">
              {experience.start === experience.end
                ? experience.start
                : `${experience.start} – ${experience.end}`}
            </p>
            <ul className="milestone__desc">
              {experience.desc.map(d => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <ul className="chip-list" aria-label="Công nghệ">
              {experience.techs.map(t => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </li>
  );
};

const Timeline = ({profile}) => {
  const trackRef = useRef(null);
  const lineRef = useRef(null);

  // Fill the rail up to the line 60% down the viewport.
  useScrollProgress(
    trackRef,
    p => {
      if (lineRef.current) lineRef.current.style.transform = `scaleY(${p})`;
    },
    0.6
  );

  const findExperience = m =>
    profile.experience.find(e => e.company === m.place && e.role === m.title);

  return (
    <section
      className="section timeline"
      id="route"
      aria-labelledby="route-title"
    >
      <div className="container">
        <SectionHead
          index="03"
          label="Route"
          id="route-title"
          title={
            <>
              Hành trình nghề nghiệp, <em>từng checkpoint</em> một.
            </>
          }
          lead="Từ lớp học lập trình web đến R&D trong nhà máy — mỗi chặng thêm một lớp hiểu biết về cách phần mềm chạy ngoài đời thật."
        />

        <div className="timeline__track" ref={trackRef}>
          <div className="timeline__rail" aria-hidden="true">
            <span className="timeline__progress" ref={lineRef} />
          </div>
          <ol className="timeline__list">
            {profile.milestones.map(m => (
              <Milestone
                key={`${m.year}-${m.title}`}
                item={m}
                experience={findExperience(m)}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
