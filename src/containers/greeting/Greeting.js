import React, { useContext, useState, useEffect } from "react";
import "./Greeting.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { greeting } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Greeting() {
  const { isDark } = useContext(StyleContext);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!greeting.displayGreeting) return null;

  return (
    <section className={`hero-dashboard ${isDark ? "dark" : "light"}`} id="greeting">
      <div className="dashboard-grid">
        
        {/* Khối 1: Terminal - Trung tâm điều khiển */}
        <div className="grid-item terminal-core">
          <div className="terminal-header">
            <div className="controls">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="terminal-title">system_admin@nguyentrongnhat: ~</div>
          </div>
          <div className="terminal-body">
            <div className="code-line">
              <span className="command">git log</span> --author="Nhất" --latest
            </div>
            <h1 className="main-title">
              {greeting.title}
              <span className="cursor">_</span>
            </h1>
            <p className="description-text">
              {greeting.subTitle}
            </p>
            <div className="terminal-actions">
              <a href="#contact" className="action-btn primary">Deploy Connection</a>
              {greeting.resumeLink && (
                <a href={greeting.resumeLink} className="action-btn ghost">Fetch_Resume.pdf</a>
              )}
            </div>
          </div>
        </div>

        {/* Khối 2: Status Monitor */}
        <div className="grid-item status-monitor">
          <div className="monitor-header">System Status</div>
          <div className="stats">
            <div className="stat-row">
              <span>Uptime:</span>
              <span className="value">99.9%</span>
            </div>
            <div className="stat-row">
              <span>Location:</span>
              <span className="value">Ninh Binh, VN</span>
            </div>
            <div className="stat-row">
              <span>Time:</span>
              <span className="value">{time}</span>
            </div>
          </div>
          <div className="radar-circle">
            <div className="scanner"></div>
          </div>
        </div>

        {/* Khối 3: Social Connectivity */}
        <div className="grid-item connect-hub">
          <div className="hub-label">Network Hub</div>
          <SocialMedia />
        </div>

      </div>
    </section>
  );
}