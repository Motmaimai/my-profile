import React, {Suspense, lazy, useCallback, useState} from "react";
import "./Footer.scss";

const SnakeGame = lazy(() =>
  import(/* webpackChunkName: "snake" */ "./SnakeGame")
);

const Footer = ({profile}) => {
  const [playing, setPlaying] = useState(false);
  const close = useCallback(() => setPlaying(false), []);

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <p className="footer__brand">
          <span className="mono accent-signal">{profile.monogram}</span> ©{" "}
          {new Date().getFullYear()} {profile.name}
        </p>
        <p className="footer__made mono">
          Built with React &amp; Three.js · {profile.coordinates}
        </p>
        <div className="footer__actions">
          <button
            type="button"
            className="footer__egg mono"
            onClick={() => setPlaying(p => !p)}
            aria-pressed={playing}
          >
            {playing ? "■ Dừng Snake" : "▸ Nghỉ giải lao: Snake"}
          </button>
          <a href="#top" className="footer__top mono">
            Về đầu trang ↑
          </a>
        </div>
      </div>
      {playing && (
        <Suspense fallback={null}>
          <SnakeGame onClose={close} />
        </Suspense>
      )}
    </footer>
  );
};

export default Footer;
