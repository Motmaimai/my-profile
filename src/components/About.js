import React from "react";
import SectionHead from "./SectionHead";
import {useReveal} from "../hooks/motion";
import "./About.scss";

const About = ({profile}) => {
  const bodyRef = useReveal();
  const factsRef = useReveal();
  const facts = [
    ["Base", profile.location],
    [
      "Học",
      `${profile.education.major} · ${profile.education.school} (${profile.education.time})`
    ],
    ["Hiện tại", profile.currentTitle],
    ["Thành tích", "Nhân viên xuất sắc nhất năm 2024"],
    ["Ngoài giờ", profile.hobbies.join(" · ")]
  ];

  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead
          index="05"
          label="About"
          id="about-title"
          title={
            <>
              Hai chiếc mũ: <em>người xây</em> và người giữ cho hệ thống chạy.
            </>
          }
        />
        <div className="about__grid">
          <div className="about__story reveal" ref={bodyRef}>
            {profile.about.map((para, i) => (
              <p key={i} className={i === 0 ? "about__lede" : undefined}>
                {para}
              </p>
            ))}
          </div>
          <dl className="about__facts reveal" ref={factsRef}>
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="label">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default About;
