/* Change this file to get your personal Portfolio */

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; 

// Splash Screen
const splashScreen = {
  enabled: true, 
  animation: splashAnimation,
  duration: 2000 
};

// Summary And Greeting Section
const illustration = {
  animated: true 
};

const greeting = {
  username: "Nguyễn Trọng Nhất",
  title: "Hi all, I'm Nhất",
  subTitle: emoji(
    "Một Full Stack Software Developer đầy nhiệt huyết với gần 5 năm kinh nghiệm. Tôi có nền tảng vững chắc về nhiều ngôn ngữ và kiến trúc dự án, chuyên xây dựng các hệ thống quản lý sản xuất và giải pháp web hiện đại."
  ),
  resumeLink: require("./assets/cv/resume.pdf"), 
  displayGreeting: true 
};

// Social Media Links
const socialMediaLinks = {
  github: "https://github.com/Motmaimai",
  gmail: "trongnhat05032000@gmail.com",
  facebook: "https://www.facebook.com/ntn.programmer",
  display: true 
};

// Skills Section
const skillsSection = {
  title: "Kỹ năng & Chuyên môn",
  subTitle: "FULL STACK DEVELOPER VỚI TƯ DUY LOGIC VÀ KHẢ NĂNG TỰ NGHIÊN CỨU TỐT",
  skills: [
    emoji("⚡ Phát triển phần mềm phục vụ sản xuất và quản lý quy mô doanh nghiệp (MES - ERP)"),
    emoji("⚡ Xây dựng ứng dụng Desktop và Web bằng hệ sinh thái Node.js, React, Vue và PHP"),
    emoji("⚡ Thiết kế hệ thống giám sát thiết bị thời gian thực và quản lý dữ liệu lớn")
  ],

  softwareSkills: [
    { skillName: "JavaScript", fontAwesomeClassname: "fab fa-js" },
    { skillName: "TypeScript", fontAwesomeClassname: "fab fa-js-square" },
    { skillName: "PHP", fontAwesomeClassname: "fab fa-php" },
    { skillName: "Python", fontAwesomeClassname: "fab fa-python" },
    { skillName: "Reactjs", fontAwesomeClassname: "fab fa-react" },
    { skillName: "Vuejs", fontAwesomeClassname: "fab fa-vuejs" },
    { skillName: "Nodejs", fontAwesomeClassname: "fab fa-node" },
    { skillName: "MySQL", fontAwesomeClassname: "fas fa-database" },
    { skillName: "Docker", fontAwesomeClassname: "fab fa-docker" },
    { skillName: "Git", fontAwesomeClassname: "fab fa-github" }
  ],
  display: true 
};

// Education Section
const educationInfo = {
  display: true, 
  schools: [
    {
      schoolName: "Trung tâm Bách Khoa Aptech",
      logo: require("./assets/images/bachkhoaaptech.png"),
      subHeader: "Lập trình viên - Chuyên ngành Website",
      duration: "2018 - 2021",
      desc: "Nghiên cứu và phát triển website trên các nền tảng PHP, C#, Java, Python.",
      descBullets: [
        "Làm cộng tác viên và trợ giảng tại trung tâm từ năm 2018"
      ]
    },
  ]
};

// Tech Stack Proficiency
const techStack = {
  viewSkillBars: true, 
  experience: [
    { Stack: "Frontend (React, Vue, HTML/CSS)", progressPercentage: "85%" },
    { Stack: "Backend (Node.js, PHP, Python)", progressPercentage: "80%" },
    { Stack: "Database & DevOps (SQL, Docker)", progressPercentage: "70%" }
  ],
  displayCodersrank: false 
};

// Work experience section
const workExperiences = {
  display: true, 
  experience: [
    {
      role: "Chuyên viên Nghiên cứu và Phát triển",
      company: "MCNEX VINA",
      companylogo: require("./assets/images/mcnex.png"),
      date: "2022 - Nay",
      desc: "Vận hành hệ thống MES - ERP, phát triển các ứng dụng giám sát thiết bị và quản lý sản xuất.",
      descBullets: [
        "Đạt danh hiệu 'Nhân viên xuất sắc nhất năm 2024'",
        "Xây dựng phần mềm giám sát phần cứng/phần mềm máy tính và cảnh báo ứng dụng blacklist",
        "Phát triển hệ thống theo dõi tình trạng Server và thiết bị qua IP thời gian thực"
      ]
    },
    {
      role: "Nhân viên Lập trình",
      company: "TCOM",
      companylogo: require("./assets/images/tcom.png"),
      date: "2022 - 2022",
      desc: "Phát triển các dự án outsource từ Nhật Bản trên nền tảng PHP Laravel.",
      descBullets: [
        "Xây dựng Website tin tức trường học và hệ thống đăng bài quảng cáo khóa học"
      ]
    },
    {
      role: "Nhân viên Lập trình",
      company: "TPBank",
      companylogo: require("./assets/images/Icon-TPBank.webp"),
      date: "2021 - 2022",
      desc: "Phát triển và thiết kế giao diện website LiveBank.",
      descBullets: [
        "Tối ưu giao diện WebPortal, hiển thị nội dung tin tức và banner"
      ]
    }
  ]
};

// Big Projects
const bigProjects = {
  title: "Dự án tiêu biểu",
  subtitle: "CÁC GIẢI PHÁP PHẦN MỀM ĐÃ TRIỂN KHAI THỰC TẾ",
  projects: [
    {
      image: require("./assets/images/mcnex.png"),
      projectName: "Hệ thống giám sát thiết bị",
      projectDesc: "Theo dõi tình trạng Server, UPS, Switch thông qua IP và hiển thị vị trí trên bản đồ nhà máy.",
      footerLink: [{ name: "Github", url: "https://github.com/Motmaimai/monitor-app" }]
    },
    {
      image: require("./assets/images/label_design.png"),
      projectName: "Phần mềm thiết kế tem",
      projectDesc: "Ứng dụng Desktop (Vue.js) cho phép thiết kế mẫu tem kéo thả và in ấn trực tiếp cho sản xuất.",
      footerLink: [{ name: "Demo", url: "https://label-design-vue-master.vercel.app" }]
    },
    {
      image: require("./assets/images/tracking_folder.png"),
      projectName: "Phần mềm quan trắc",
      projectDesc: "Đọc và ghi nhận dữ liệu từ file Excel theo thời gian thực, đồng bộ lên hệ thống quan trắc tập trung.",
      footerLink: [{ name: "Github", url: "https://github.com/Motmaimai/tracking-folder" }]
    }
  ],
  display: true 
};

// Achievement Section
const achievementSection = {
  title: emoji("Danh hiệu & Giải thưởng 🏆"),
  subtitle: "Những ghi nhận cho sự nỗ lực trong quá trình làm việc và học tập",
  achievementsCards: [
    {
      title: "Nhân viên xuất sắc nhất năm 2024",
      subtitle: "Ghi nhận đóng góp tại Công ty MCNEX VINA",
      image: require("./assets/images/mcnex.png"),
      footerLink: []
    }
  ],
  display: true 
};

const contactInfo = {
  title: emoji("Liên hệ ☎️"),
  subtitle: "Tôi luôn sẵn sàng thảo luận về các dự án mới hoặc cơ hội hợp tác.",
  number: "0981772022",
  email_address: "trongnhat05032000@gmail.com"
};

const resumeSection = {
  title: "Hồ sơ năng lực",
  subtitle: "Bạn có thể tải bản PDF đầy đủ tại đây",
  display: true 
};

const isHireable = true; 

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  bigProjects,
  achievementSection,
  contactInfo,
  isHireable,
  resumeSection
};