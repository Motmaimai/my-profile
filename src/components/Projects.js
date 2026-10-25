import React from "react";
import SectionHead from "./SectionHead";
import {useReveal} from "../hooks/motion";
import "./Projects.scss";

const pad = n => String(n).padStart(2, "0");

const hostOf = url => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const CaseFile = ({item, index}) => {
  const ref = useReveal();
  return (
    <article className="case reveal" ref={ref}>
      <div className="case__meta">
        <span className="case__index mono">{pad(index + 1)}</span>
        <span className="label">{item.org}</span>
        <span className="case__type mono">{item.type}</span>
      </div>
      <div className="case__body">
        <h4 className="case__name">{item.name}</h4>
        <p className="case__problem">
          <span className="case__key mono">Vấn đề</span>
          {item.problem}
        </p>
        {item.role && (
          <p className="case__problem">
            <span className="case__key mono">Vai trò</span>
            {item.role}
          </p>
        )}
      </div>
      <div className="case__detail">
        <ul className="case__features">
          {item.features.map(f => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        {item.challenge && (
          <p className="case__extra">
            <span className="case__key mono">Thách thức</span>
            {item.challenge}
          </p>
        )}
        {item.impact && (
          <p className="case__extra">
            <span className="case__key mono">Kết quả</span>
            {item.impact}
          </p>
        )}
        <ul className="chip-list" aria-label="Công nghệ">
          {item.tech.map(t => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

// Subtle 3D tilt that follows the pointer (skipped for touch / reduced motion).
const tilt = e => {
  if (e.pointerType !== "mouse") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.setProperty("--rx", `${(-y * 5).toFixed(2)}deg`);
  el.style.setProperty("--ry", `${(x * 7).toFixed(2)}deg`);
  el.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
  el.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
};

const untilt = e => {
  const el = e.currentTarget;
  el.style.setProperty("--rx", "0deg");
  el.style.setProperty("--ry", "0deg");
};

const Exhibit = ({item, index}) => {
  const ref = useReveal();
  return (
    <article
      className="exhibit reveal"
      ref={ref}
      style={{"--delay": `${(index % 3) * 80}ms`}}
      onPointerMove={tilt}
      onPointerLeave={untilt}
    >
      <div className="exhibit__inner">
        <div className="exhibit__url mono" aria-hidden="true">
          <span className="exhibit__dot" />
          {hostOf(item.link)}
        </div>
        <div className="exhibit__head">
          <span className="exhibit__index mono">{pad(index + 1)}</span>
          <span className="label">{item.type}</span>
        </div>
        <h4 className="exhibit__name">{item.name}</h4>
        <p className="exhibit__desc">{item.desc}</p>
        {item.role && (
          <p className="exhibit__extra">
            <span className="case__key mono">Vai trò</span>
            {item.role}
          </p>
        )}
        {item.challenge && (
          <p className="exhibit__extra">
            <span className="case__key mono">Thách thức</span>
            {item.challenge}
          </p>
        )}
        {item.impact && (
          <p className="exhibit__extra">
            <span className="case__key mono">Kết quả</span>
            {item.impact}
          </p>
        )}
        <ul className="chip-list" aria-label="Công nghệ">
          {item.tech.map(t => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="exhibit__links">
          <a
            className="exhibit__link"
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Truy cập {item.name}
            <span aria-hidden="true"> ↗</span>
            <span className="sr-only"> (mở tab mới)</span>
          </a>
          {item.repo && (
            <a
              className="exhibit__link exhibit__link--quiet"
              href={item.repo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
              <span aria-hidden="true"> ↗</span>
              <span className="sr-only"> (mở tab mới)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

const Projects = ({profile}) => (
  <section
    className="section projects"
    id="projects"
    aria-labelledby="projects-title"
  >
    <div className="container">
      <SectionHead
        index="02"
        label="Built"
        id="projects-title"
        title={
          <>
            Những gì tôi đã <em>xây</em>.
          </>
        }
        lead="Hai phòng trưng bày: hệ thống tôi phát triển bên trong doanh nghiệp — nơi mã nguồn không công khai — và những sản phẩm web có link công khai để bạn tự trải nghiệm."
      />

      <div className="projects__group">
        <div className="projects__group-head">
          <h3>Hệ thống trong doanh nghiệp</h3>
          <p className="mono">Case files · nội bộ, không công khai mã nguồn</p>
        </div>
        <div className="cases">
          {profile.caseFiles.map((item, i) => (
            <CaseFile key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>

      <div className="projects__group">
        <div className="projects__group-head">
          <h3>Sản phẩm web</h3>
          <p className="mono">Exhibits · link công khai</p>
        </div>
        <div className="exhibits">
          {profile.products.map((item, i) => (
            <Exhibit key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Projects;
