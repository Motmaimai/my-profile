import React, {useRef, useState} from "react";
import SectionHead from "./SectionHead";
import {useReveal} from "../hooks/motion";
import "./Systems.scss";

const pad = n => String(n).padStart(2, "0");

const SystemExplorer = ({systems}) => {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const system = systems[active];

  // WAI-ARIA tabs: arrow keys move between tabs.
  const onKeyDown = e => {
    const last = systems.length - 1;
    let next = null;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    if (tabs.current[next]) tabs.current[next].focus();
  };

  return (
    <div className="explorer">
      <div className="explorer__bar">
        <span className="label">system_explorer</span>
        <div
          className="explorer__tabs"
          role="tablist"
          aria-label="Hệ thống đã xây dựng"
        >
          {systems.map((s, i) => (
            <button
              key={s.id}
              ref={el => (tabs.current[i] = el)}
              type="button"
              role="tab"
              id={`tab-${s.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${s.id}`}
              tabIndex={i === active ? 0 : -1}
              className="explorer__tab"
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
            >
              <span className="mono">{pad(i + 1)}</span> {s.name}
            </button>
          ))}
        </div>
      </div>

      <div
        className="explorer__panel"
        role="tabpanel"
        id={`panel-${system.id}`}
        aria-labelledby={`tab-${system.id}`}
        key={system.id}
      >
        <ol className="flow" aria-label={`Luồng dữ liệu: ${system.name}`}>
          {system.flow.map((stage, i) => (
            <li key={stage.label} className="flow__stage" style={{"--i": i}}>
              <span className="flow__node mono">{pad(i + 1)}</span>
              <span className="flow__label">{stage.label}</span>
              <span className="flow__detail mono">{stage.detail}</span>
            </li>
          ))}
        </ol>
        <div className="explorer__meta">
          <p className="explorer__summary">{system.summary}</p>
          <p className="explorer__stack mono">
            <span className="accent-ember">stack</span> {system.stack}
          </p>
          <p className="explorer__note mono">
            Dự án nội bộ tại MCNEX VINA — sơ đồ minh họa luồng chức năng, không
            phải tài liệu kiến trúc chính thức.
          </p>
        </div>
      </div>
    </div>
  );
};

const SkillGroup = ({group, index}) => {
  const ref = useReveal();
  return (
    <section
      className="skill reveal"
      ref={ref}
      style={{"--delay": `${index * 70}ms`}}
      aria-labelledby={`skill-${group.id}`}
    >
      <p className="skill__index mono">{pad(index + 1)}</p>
      <h3 className="skill__title" id={`skill-${group.id}`}>
        {group.title}
      </h3>
      <p className="skill__note">{group.note}</p>
      <ul className="skill__items">
        {group.items.map(item => (
          <li key={item.name}>
            {item.name}
            {item.level && (
              <abbr
                className={`skill__level skill__level--${item.level.toLowerCase()}`}
                title={`${item.level} — tự đánh giá trong CV`}
              >
                {item.level === "Advanced" ? "ADV" : "INT"}
              </abbr>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

const Systems = ({profile}) => {
  const explorerRef = useReveal();
  return (
    <section
      className="section systems"
      id="systems"
      aria-labelledby="systems-title"
    >
      <div className="container">
        <SectionHead
          index="01"
          label="Systems"
          id="systems-title"
          title={
            <>
              Tôi nghĩ bằng <em>luồng dữ liệu</em>, không chỉ bằng màn hình.
            </>
          }
          lead="Phần lớn những gì tôi xây nằm giữa phần mềm và thế giới vật lý: thiết bị trong nhà máy, máy in tem, trạm quan trắc. Đây là ba hệ thống như vậy — chọn một để xem dữ liệu đi qua những đâu."
        />

        <div className="reveal" ref={explorerRef}>
          <SystemExplorer systems={profile.systems} />
        </div>

        <div className="systems__stack">
          <div className="systems__stack-head">
            <h3 className="systems__stack-title">Stack, xếp theo vai trò</h3>
            <p className="systems__legend mono">
              <abbr className="skill__level skill__level--advanced">ADV</abbr>{" "}
              Advanced ·{" "}
              <abbr className="skill__level skill__level--intermediate">
                INT
              </abbr>{" "}
              Intermediate — mức tự đánh giá trong CV
            </p>
          </div>
          <div className="systems__grid">
            {profile.skillGroups.map((group, i) => (
              <SkillGroup key={group.id} group={group} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Systems;
