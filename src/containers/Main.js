
import React from "react";
import "./Main.scss";

const Main = () => {
  const dev = {
    name: "Nguyễn Trọng Nhất",
    role: "Full Stack Developer | System Administrator",
    dob: "05/03/2000",
    phone: "0981772022",
    email: "trongnhat05032000@gmail.com",
    location: "Nghi Sơn, Thanh Hóa",
    facebook: "https://www.facebook.com/ntn.programmer",

    objective:
      "Với gần 5 năm kinh nghiệm, tôi kết hợp tư duy tối ưu hệ thống của một System Admin với kỹ năng xây dựng giải pháp của một Full Stack Developer. Tôi đam mê tạo ra các sản phẩm AI và nền tảng số có độ ổn định cao, mang lại giá trị thực cho cộng đồng.",

    education: {
      school: "Bách Khoa Aptech",
      major: "Lập trình Website",
      time: "2018 - 2021"
    },

    skills: {
      languages: ["JavaScript", "TypeScript", "PHP", "Python", "C#", "Java"],
      frontend: ["ReactJS", "VueJS", "Angular", "HTML"],
      backend: ["NodeJS", "Express", "PHP", "Java", "Python"],
      database: ["MongoDB", "MySQL", "PostgreSQL", "SQL Server"],
      devops: ["Docker", "Nginx"],
      tools: ["Git", "GitHub", "Figma", "Jira"],
      soft: ["Teamwork", "Logic thinking", "Self-learning"]
    },

    experience: [
      {
        company: "MCNEX VINA",
        role: "R&D Developer & System Specialist",
        time: "2022 - Hiện tại",
        achievement: "Nhân viên xuất sắc năm 2024",
        desc: [
          "Nghiên cứu & phát triển hệ thống MES - ERP quy mô lớn",
          "Xử lý xung đột dữ liệu và tối ưu hóa truy vấn hệ thống",
          "Phát triển công cụ giám sát môi trường và thiết bị nội bộ"
        ],
        techs: ["Java", "Oracle", "C#", "System Monitoring"]
      },
      {
        company: "TCOM",
        role: "Web Developer",
        time: "2022",
        desc: [
          "Tham gia các dự án Outsource thị trường Nhật Bản",
          "Xử lý logic phức tạp và tối ưu hiệu năng Frontend"
        ],
        techs: ["VueJS", "PHP", "AWS"]
      },
      {
        company: "TPBank",
        role: "Frontend Developer",
        time: "2021 - 2022",
        desc: [
          "Xây dựng giao diện UI cho hệ thống LiveBank",
          "Đảm bảo tính nhất quán của trải nghiệm người dùng"
        ],
        techs: ["ReactJS", "Styled Components"]
      }
    ],

    projects: [
      {
        name: "vietnamcong.com",
        desc: "Agency nhận thiết kế website và quảng bá thương hiệu.",
        type: "Agency",
        tech: "Laravel, Tailwind",
        link: "https://vietnamcong.com"
      },
      {
        name: "chocong.vn",
        desc: "Sàn TMĐT hải sản. Tối ưu trải nghiệm mua sắm địa phương.",
        type: "E-Commerce",
        tech: "Laravel, MySQL",
        link: "https://chocong.vn"
      },
      {
        name: "promptagents.vn",
        desc: "Thị trường mua bán Prompt AI. Tích hợp thanh toán tự động.",
        type: "AI Marketplace",
        tech: "React, NodeJS",
        link: "https://promptagents.vn"
      },
      {
        name: "ittrackingtool",
        desc: "Giám sát bản quyền phần mềm và phần cứng doanh nghiệp.",
        type: "System Tool",
        tech: "Python, C#",
        link: "https://ittrackingtool.vietnamcong.com"
      },
      {
        name: "onepos",
        desc: "Phần mềm POS thế hệ mới hỗ trợ đa nền tảng.",
        type: "Management",
        tech: "Laravel, Vue",
        link: "https://onepos.vietnamcong.com"
      },
      {
        name: "quizlogix",
        desc: "Nền tảng thi trắc nghiệm và hỗ trợ giảng dạy AI.",
        type: "EdTech",
        tech: "NodeJS, Socket.io",
        link: "https://quizlogix.vietnamcong.com"
      }
    ],
    hobbies: ["Du lịch", "Trò chơi tốc độ", "Thám hiểm"]
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="avatar-wrapper">
          {/* Nếu bạn để ảnh trong thư mục public */}
          <img 
            src="/logo.png" 
            alt="NTN Logo" 
            className="avatar-img" 
          />
          
          {/* Hoặc nếu bạn dùng ảnh logo vừa tạo, hãy thay path vào đây */}
          {/* <img src={require('./path-to-your-logo.png')} alt="NTN" className="avatar-img" /> */}

          <div className="status-dot"></div>
        </div>
        <h2>{dev.name}</h2>
        <p className="role">{dev.role}</p>

        <div className="contact-info">
          <div className="info-item">
            <span className="icon">📞</span> {dev.phone}
          </div>
          <div className="info-item">
            <span className="icon">📧</span> <small>{dev.email}</small>
          </div>
          <div className="info-item">
            <span className="icon">📍</span> {dev.location}
          </div>
        </div>

        <div className="bento-skills">
          <h4>{`// Skill Matrix`}</h4>
          
          <div className="skills-grid">
            {/* Ô lớn nhất: Ngôn ngữ & Backend (Thế mạnh chính) */}
            <div className="skill-cell wide glow">
              <h5>Main Stack</h5>
              <div className="tag-cloud">
                {dev.skills.languages.map((s, i) => <span key={i} className="tag core">{s}</span>)}
                {dev.skills.backend.filter(s => !dev.skills.languages.includes(s)).map((s, i) => (
                  <span key={i} className="tag core">{s}</span>
                ))}
              </div>
            </div>

            {/* Ô trung bình: Frontend */}
            <div className="skill-cell">
              <h5>Frontend</h5>
              <div className="tag-cloud">
                {dev.skills.frontend.map((s, i) => <span key={i} className="tag">{s}</span>)}
              </div>
            </div>

            {/* Ô trung bình: Database */}
            <div className="skill-cell">
              <h5>Databases</h5>
              <div className="tag-cloud">
                {dev.skills.database.map((s, i) => <span key={i} className="tag">{s}</span>)}
              </div>
            </div>

            {/* Ô nhỏ: DevOps & Tools */}
            <div className="skill-cell medium">
              <h5>Infrastructure & Tools</h5>
              <div className="tag-cloud">
                {dev.skills.devops.map((s, i) => <span key={i} className="tag-mini">{s}</span>)}
                {dev.skills.tools.map((s, i) => <span key={i} className="tag-mini">{s}</span>)}
              </div>
            </div>

            {/* Ô nhỏ: Soft Skills */}
            <div className="skill-cell small">
              <h5>Soft Skills</h5>
              <ul className="skill-list">
                {dev.skills.soft.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <div className="glass-header">
          <div className="dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="file-name">portfolio.ts</span>
        </div>

        <div className="hero-code">
          <pre>
{`class Developer {
  constructor() {
    this.name = "${dev.name}";
    this.exp = "5+ Years";
    this.focus = ["System", "Fullstack"];
  }
}`}
          </pre>
        </div>

        <section className="section">
          <h3>{`// Profile`}</h3>
          <p className="glass-text">{dev.objective}</p>
        </section>

        <section className="section">
          <h3>{`// Work History`}</h3>
          <div className="experience-list">
            {dev.experience.map((exp, i) => (
              <div key={i} className="exp-card">
                <div className="exp-header">
                  <h4>{exp.company}</h4>
                  <span className="time-badge">{exp.time}</span>
                </div>
                <p className="role-text">{exp.role}</p>
                {exp.achievement && <p className="award">🏆 {exp.achievement}</p>}
                <ul className="desc-list">
                  {exp.desc.map((d, j) => <li key={j}>{d}</li>)}
                </ul>
                <div className="tech-tags">
                  {exp.techs.map((t, k) => <span key={k} className="mini-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h3>{`// Featured Projects`}</h3>
          <div className="bento-grid">
            {dev.projects.map((proj, i) => (
              <div key={i} className="project-bento-card">
                <div className="card-top">
                  <span className="badge">{proj.type}</span>
                  <a target="_blank" href={proj.link} className="link">↗</a>
                </div>
                <h4>{proj.name}</h4>
                <p>{proj.desc}</p>
                <div className="card-footer">
                   <code>{proj.tech}</code>
                </div>
                <div className="glass-glow"></div>
              </div>
            ))}
          </div>
        </section>

        <section className="section footer-info">
          <div className="hobby-wrap">
            <h3>{`// Hobbies`}</h3>
            <div className="tags">
              {dev.hobbies.map((h, i) => <span key={i} className="tag">{h}</span>)}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Main;
