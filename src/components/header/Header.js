import React, {useContext, useState} from "react";
import Headroom from "react-headroom";
import "./Header.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import StyleContext from "../../contexts/StyleContext";
import {
  greeting,
  workExperiences,
  skillsSection,
  bigProjects, 
  achievementSection,
  resumeSection
} from "../../portfolio";

function Header() {
  const {isDark} = useContext(StyleContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // Kiểm tra hiển thị dựa trên các keys chính xác trong portfolio.js mới
  const viewSkills = skillsSection.display;
  const viewExperience = workExperiences.display;
  const viewProjects = bigProjects.display;
  const viewAchievement = achievementSection.display;
  const viewResume = resumeSection.display;

  return (
    <Headroom>
      <header className={`header-container ${isDark ? "dark-mode" : "light-mode"}`}>
        <a href="/" className="logo">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">{greeting.username}</span>
          <span className="logo-bracket">/&gt;</span>
        </a>
        
        <input 
          className="menu-btn" 
          type="checkbox" 
          id="menu-btn" 
          onChange={() => setMenuOpen(!menuOpen)} 
        />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className={`navicon ${isDark ? "navicon-dark" : ""}`}></span>
        </label>

        <ul className={`menu-list ${menuOpen ? "open" : ""}`}>
          {viewSkills && (
            <li><a href="#skills" onClick={() => setMenuOpen(false)}>Kỹ năng</a></li>
          )}
          {viewExperience && (
            <li><a href="#experience" onClick={() => setMenuOpen(false)}>Kinh nghiệm</a></li>
          )}
          {viewProjects && (
            <li><a href="#projects" onClick={() => setMenuOpen(false)}>Dự án</a></li>
          )}
          {viewAchievement && (
            <li><a href="#achievements" onClick={() => setMenuOpen(false)}>Thành tựu</a></li>
          )}
          {viewResume && (
            <li><a href="#resume" onClick={() => setMenuOpen(false)}>Hồ sơ</a></li>
          )}
          <li>
            <a href="#contact" className="contact-nav" onClick={() => setMenuOpen(false)}>Liên hệ</a>
          </li>
          <li className="toggle-wrapper">
            <ToggleSwitch />
          </li>
        </ul>
      </header>
    </Headroom>
  );
}

export default Header;