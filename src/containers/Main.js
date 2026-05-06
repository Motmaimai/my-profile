import React from "react";
import "./Main.scss";

const Main = () => {
  const dev = {
    name: "Nguyễn Trọng Nhất",
    role: "Software Developer",
    dob: "05/03/2000",
    phone: "0981772022",
    email: "trongnhat05032000@gmail.com",
    location: "Nghi Sơn, Thanh Hóa",
    facebook: "https://www.facebook.com/ntn.programmer",

    objective:
      "Với gần 5 năm kinh nghiệm lập trình, tôi có nền tảng vững chắc về kiến trúc hệ thống và phát triển phần mềm. Mong muốn làm việc trong môi trường chuyên nghiệp để nâng cao kỹ năng và đóng góp vào sự phát triển bền vững của công ty.",

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
        role: "R&D Developer",
        time: "2022 - Present",
        achievement: "Best Employee 2024",
        desc: [
          "MES - ERP system research",
          "Fix data conflicts",
          "Develop internal software",
          "Manage system data"
        ],
        projects: [
          "Hardware & Software Monitoring",
          "Device Monitoring System",
          "Label Design Software",
          "Environmental Monitoring"
        ]
      },
      {
        company: "TCOM",
        role: "Developer",
        time: "2022",
        desc: [
          "Outsource Nhật Bản",
          "Fix bug theo yêu cầu"
        ]
      },
      {
        company: "TPBank",
        role: "Frontend Developer",
        time: "2021 - 2022",
        desc: [
          "Thiết kế UI LiveBank",
          "Customize website"
        ]
      }
    ],

    awards: [
      "Best Employee 2024",
      "Teaching Assistant - Aptech 2018"
    ],

    hobbies: ["Travel", "Speed games", "Adventure"]
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="avatar">NTN</div>
        <h2>{dev.name}</h2>
        <p className="role">{dev.role}</p>

        <div className="info">
          <p>📞 {dev.phone}</p>
          <p>📧 {dev.email}</p>
          <p>📍 {dev.location}</p>
        </div>

        <div className="block">
          // eslint-disable-next-line react/jsx-no-comment-textnodes
          <h4>// Skills</h4>
          {Object.values(dev.skills).flat().map((s, i) => (
            <span key={i} className="tag">{s}</span>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        {/* Fake VSCode header */}
        <div className="editor-header">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="file">developer.profile.ts</span>
        </div>

        {/* Code preview */}
        <div className="code">
          <pre>
{`const developer = {
  name: "${dev.name}",
  role: "${dev.role}",
  experience: "5+ years",
  location: "${dev.location}"
}`}
          </pre>
        </div>

        {/* Objective */}
        <section>
          <h3>// Objective</h3>
          <p>{dev.objective}</p>
        </section>

        {/* Experience */}
        <section>
          <h3>// Experience</h3>
          {dev.experience.map((exp, i) => (
            <div key={i} className="card">
              <h4>{exp.company}</h4>
              <p>{exp.role} | {exp.time}</p>

              {exp.achievement && (
                <p className="highlight">🏆 {exp.achievement}</p>
              )}

              <ul>
                {exp.desc.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
        <section>
          <h3>// Education</h3>
          <div className="card">
            <h4>{dev.education.school}</h4>
            <p>{dev.education.major}</p>
            <p>{dev.education.time}</p>
          </div>
        </section>

        {/* Awards */}
        <section>
          <h3>// Awards</h3>
          <ul>
            {dev.awards.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>

        {/* Hobbies */}
        <section>
          <h3>// Hobbies</h3>
          <div className="tags">
            {dev.hobbies.map((h, i) => (
              <span key={i} className="tag">{h}</span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Main;