import React, {useEffect, useState} from "react";
import "./Nav.scss";

const LINKS = [
  {href: "#systems", label: "Hệ thống"},
  {href: "#projects", label: "Dự án"},
  {href: "#route", label: "Hành trình"},
  {href: "#beyond", label: "Ngoài code"},
  {href: "#about", label: "Về tôi"}
];

const Nav = ({monogram}) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = e => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`nav${scrolled ? " nav--solid" : ""}${
        open ? " nav--open" : ""
      }`}
    >
      <div className="nav__inner container">
        <a href="#top" className="nav__brand" onClick={close}>
          <span className="nav__mark" aria-hidden="true">
            {monogram}
          </span>
          <span className="nav__brand-text">Code the world</span>
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen(v => !v)}
        >
          <span className="sr-only">{open ? "Đóng menu" : "Mở menu"}</span>
          <span className="nav__bars" aria-hidden="true" />
        </button>

        <nav id="nav-menu" className="nav__menu" aria-label="Điều hướng chính">
          <ul>
            {LINKS.map(link => (
              <li key={link.href}>
                <a href={link.href} onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="btn btn--primary nav__cta"
            onClick={close}
          >
            Liên hệ
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
