import React from "react";
import SceneCanvas from "./SceneCanvas";
import "./Hero.scss";

const Hero = ({profile}) => (
  <section className="hero" id="top" aria-labelledby="hero-title">
    <SceneCanvas mode="hero" />
    <div className="hero__scrim" aria-hidden="true" />

    <div className="hero__content container">
      <p className="hero__kicker label">
        <span className="accent-signal">{profile.brand}</span>
        <span aria-hidden="true"> — </span>
        Engineer by mind, explorer by nature
      </p>
      <h1 id="hero-title" className="hero__title">
        {profile.name}
      </h1>
      <p className="hero__role">{profile.role}</p>
      <p className="hero__tagline">{profile.tagline}</p>
      <div className="hero__actions">
        <a href="#projects" className="btn btn--primary">
          Xem dự án <span className="btn__arrow">→</span>
        </a>
        <a href="#contact" className="btn">
          Liên hệ / CV
        </a>
      </div>
    </div>

    <dl className="hero__hud container mono">
      <div>
        <dt>Base</dt>
        <dd>
          {profile.location}{" "}
          <span className="hero__coord">{profile.coordinates}</span>
        </dd>
      </div>
      <div>
        <dt>Now</dt>
        <dd>{profile.currentTitle}</dd>
      </div>
      <div>
        <dt>Since</dt>
        <dd>Viết code chuyên nghiệp từ {profile.codingSince}</dd>
      </div>
    </dl>

    <a href="#systems" className="hero__scroll label">
      <span className="hero__scroll-line" aria-hidden="true" />
      Cuộn để khám phá
    </a>
  </section>
);

export default Hero;
