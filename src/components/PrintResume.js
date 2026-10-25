import React from "react";
import "./PrintResume.scss";

// A plain, ink-friendly résumé generated from the same profile data.
// Hidden on screen; when printing, it replaces the interactive site, so
// "In / lưu CV dạng PDF" produces a clean CV.
const PrintResume = ({profile}) => (
  <div className="print-resume" aria-hidden="true">
    <header>
      <p className="pr-name">{profile.name}</p>
      <p className="pr-role">{profile.role}</p>
      <p className="pr-contact">
        {profile.contact.email} · {profile.contact.phone} · {profile.location}
        {profile.socials.map(
          s => ` · ${s.url.replace(/^https?:\/\/(www\.)?/, "")}`
        )}
      </p>
    </header>

    <section>
      <p className="pr-h">Mục tiêu</p>
      <p>{profile.objective}</p>
    </section>

    <section>
      <p className="pr-h">Kinh nghiệm</p>
      {profile.experience.map(exp => (
        <div className="pr-item" key={exp.company}>
          <p className="pr-head">
            <span>
              <strong>{exp.company}</strong> — {exp.role}
            </span>
            <span>
              {exp.start === exp.end ? exp.start : `${exp.start} – ${exp.end}`}
            </span>
          </p>
          <ul>
            {exp.desc.map(d => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p className="pr-tech">{exp.techs.join(", ")}</p>
        </div>
      ))}
    </section>

    <section>
      <p className="pr-h">Dự án tiêu biểu</p>
      <ul>
        {profile.caseFiles.map(c => (
          <li key={c.name}>
            <strong>{c.name}</strong> ({c.org}) — {c.features[0]}.{" "}
            {c.tech.join(", ")}
          </li>
        ))}
        {profile.products.map(p => (
          <li key={p.name}>
            <strong>{p.name}</strong> — {p.desc} {p.tech.join(", ")}.{" "}
            {p.link.replace(/^https?:\/\//, "")}
          </li>
        ))}
      </ul>
    </section>

    <section className="pr-cols">
      <div>
        <p className="pr-h">Kỹ năng</p>
        {profile.skillGroups.map(g => (
          <p key={g.id}>
            <strong>{g.title}:</strong>{" "}
            {g.items
              .map(i => (i.level ? `${i.name} (${i.level})` : i.name))
              .join(", ")}
          </p>
        ))}
      </div>
      <div>
        <p className="pr-h">Học vấn</p>
        <p>
          {profile.education.school} — {profile.education.major} (
          {profile.education.time})
        </p>
        <p className="pr-h">Danh hiệu</p>
        <p>2024 — Nhân viên xuất sắc nhất năm 2024 (MCNEX VINA)</p>
        <p>2018 — Cộng tác viên, trợ giảng tại Bách Khoa Aptech</p>
        <p className="pr-h">Sở thích</p>
        <p>{profile.hobbies.join(", ")}</p>
      </div>
    </section>
  </div>
);

export default PrintResume;
