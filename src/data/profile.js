// Single source of truth for portfolio content.
//
// Sources (verified, nothing invented):
//  - the `dev` object previously hardcoded in src/containers/Main.js
//  - text recovered from src/assets/cv/resume.pdf (TopCV export)
//  - the GitHub account that owns this repository
//
// Optional fields (role, challenge, impact, photos, ...) are rendered only when
// filled in, so the owner can enrich entries later without touching components.

export const profile = {
  name: "Nguyễn Trọng Nhất",
  shortName: "Trọng Nhất",
  monogram: "NTN",
  brand: "NTN Code Dạo",
  role: "Full Stack Developer · System Administrator",
  currentTitle: "R&D Developer & System Specialist tại MCNEX VINA",
  location: "Nghi Sơn, Thanh Hóa",
  // Approximate coordinates of Nghi Sơn town (public geography, used as HUD decor).
  coordinates: "19.4°N · 105.7°E",
  codingSince: 2021,
  tagline:
    "Tôi xây phần mềm cho những nơi máy móc, dữ liệu và con người gặp nhau — và khi tắt máy, tôi đi tìm những cung đường mới.",
  objective:
    "Với gần 5 năm kinh nghiệm, tôi kết hợp tư duy tối ưu hệ thống của một System Admin với kỹ năng xây dựng giải pháp của một Full Stack Developer. Tôi đam mê tạo ra các sản phẩm AI và nền tảng số có độ ổn định cao, mang lại giá trị thực cho cộng đồng.",

  contact: {
    email: "trongnhat05032000@gmail.com",
    phone: "0981772022",
    phoneIntl: "+84981772022"
  },

  socials: [
    {label: "GitHub", handle: "Motmaimai", url: "https://github.com/Motmaimai"},
    {
      label: "Facebook",
      handle: "ntn.programmer",
      url: "https://www.facebook.com/ntn.programmer"
    }
  ],

  // The PDF in src/assets/cv is corrupted (see PORTFOLIO_REDESIGN_PLAN.md).
  // Put a valid file in /public and set e.g. "/cv-nguyen-trong-nhat.pdf".
  resumeUrl: null,

  education: {
    school: "Bách Khoa Aptech",
    major: "Lập trình Website",
    time: "2018 – 2021"
  },

  // Grouped by the role each technology plays in a system.
  // `level` is the owner's own rating from the CV — shown as words, never bars.
  skillGroups: [
    {
      id: "lang",
      title: "Ngôn ngữ",
      note: "Công cụ tư duy",
      items: [
        {name: "JavaScript"},
        {name: "TypeScript"},
        {name: "PHP", level: "Advanced"},
        {name: "Python", level: "Intermediate"},
        {name: "C#", level: "Intermediate"},
        {name: "Java", level: "Intermediate"}
      ]
    },
    {
      id: "ui",
      title: "Giao diện",
      note: "Nơi người dùng chạm vào hệ thống",
      items: [
        {name: "ReactJS", level: "Advanced"},
        {name: "VueJS", level: "Advanced"},
        {name: "Angular", level: "Advanced"},
        {name: "HTML"}
      ]
    },
    {
      id: "svc",
      title: "Dịch vụ & API",
      note: "Logic nghiệp vụ, tích hợp thiết bị",
      items: [
        {name: "NodeJS", level: "Advanced"},
        {name: "Express"},
        {name: "Laravel", level: "Advanced"},
        {name: ".NET (C#)", level: "Intermediate"},
        {name: "Java", level: "Intermediate"},
        {name: "Python", level: "Intermediate"}
      ]
    },
    {
      id: "data",
      title: "Dữ liệu",
      note: "Lưu trữ, truy vấn, đối soát",
      items: [
        {name: "MySQL"},
        {name: "PostgreSQL"},
        {name: "SQL Server"},
        {name: "MongoDB"},
        {name: "Oracle"}
      ]
    },
    {
      id: "ops",
      title: "Hạ tầng & vận hành",
      note: "Giữ cho hệ thống luôn chạy",
      items: [
        {name: "Docker"},
        {name: "Nginx"},
        {name: "System Monitoring"},
        {name: "AWS"}
      ]
    },
    {
      id: "tools",
      title: "Cách làm việc",
      note: "Công cụ & thói quen",
      items: [
        {name: "Git / GitHub"},
        {name: "Jira"},
        {name: "Figma"},
        {name: "Teamwork"},
        {name: "Logic thinking"},
        {name: "Self-learning"}
      ]
    }
  ],

  // Real systems from the CV, drawn as data-flow diagrams in the Systems section.
  // Each flow is a left-to-right chain of stages.
  systems: [
    {
      id: "monitor",
      name: "Giám sát thiết bị",
      stack: "Node.js · React",
      summary:
        "Theo dõi tình trạng thiết bị trong nhà máy qua địa chỉ IP, ghi log server theo chu kỳ và hiển thị vị trí thiết bị trên bản đồ nhà máy.",
      flow: [
        {label: "Thiết bị", detail: "định danh theo IP"},
        {label: "Probe", detail: "ping · SMTP · API thiết bị"},
        {label: "Node.js service", detail: "thu thập theo chu kỳ"},
        {label: "Log server", detail: "trạng thái · thông số"},
        {label: "React dashboard", detail: "bản đồ nhà máy"}
      ]
    },
    {
      id: "label",
      name: "Thiết kế tem",
      stack: "Node.js · Vue.js · Desktop (Windows)",
      summary:
        "Ứng dụng desktop cho phép thiết kế mẫu tem bằng kéo thả, in, xuất và import mẫu — đóng gói để cài đặt dễ dàng trên Windows.",
      flow: [
        {label: "Editor kéo thả", detail: "phần tử tem"},
        {label: "Mẫu tem", detail: "lưu · import · export"},
        {label: "Render", detail: "chuẩn bị bản in"},
        {label: "Máy in tem", detail: "in tại xưởng"}
      ]
    },
    {
      id: "env",
      name: "Quan trắc",
      stack: "Node.js · React · Desktop (Windows)",
      summary:
        "Đọc dữ liệu quan trắc xuất ra file Excel theo thời gian thực, lưu lịch sử, gửi lên hệ thống quan trắc và hiển thị trực tiếp cho người vận hành.",
      flow: [
        {label: "Trạm quan trắc", detail: "xuất file Excel"},
        {label: "File watcher", detail: "đọc theo thời gian thực"},
        {label: "Lịch sử", detail: "lưu bản ghi"},
        {label: "Hệ thống quan trắc", detail: "đồng bộ dữ liệu"},
        {label: "Client", detail: "hiển thị realtime"}
      ]
    }
  ],

  experience: [
    {
      company: "MCNEX VINA",
      role: "R&D Developer & System Specialist",
      start: "2022",
      end: "Hiện tại",
      achievement: "Nhân viên xuất sắc nhất năm 2024",
      desc: [
        "Nghiên cứu & phát triển trên hệ thống MES - ERP quy mô lớn, nắm cấu trúc dự án và dữ liệu sản xuất",
        "Xử lý xung đột dữ liệu phát sinh khi sản xuất và tối ưu hóa truy vấn hệ thống",
        "Phát triển công cụ giám sát môi trường, thiết bị và phần mềm phục vụ sản xuất, quản lý"
      ],
      techs: ["Java", "Oracle", "C#", "Node.js", "React", "Vue.js"]
    },
    {
      company: "TCOM",
      role: "Web Developer",
      start: "2022",
      end: "2022",
      desc: [
        "Tham gia các dự án outsource cho thị trường Nhật Bản",
        "Xử lý logic phức tạp, fix bug theo yêu cầu khách hàng và tối ưu hiệu năng frontend"
      ],
      techs: ["VueJS", "PHP", "Laravel", "AWS"]
    },
    {
      company: "TPBank",
      role: "Frontend Developer",
      start: "2021",
      end: "2022",
      desc: [
        "Phát triển, thiết kế giao diện cho hệ thống LiveBank",
        "Đảm bảo tính nhất quán của trải nghiệm người dùng trên web portal"
      ],
      techs: ["ReactJS", "Styled Components"]
    }
  ],

  // Milestones for the career route (oldest first).
  milestones: [
    {
      year: "2018",
      title: "Bắt đầu học lập trình Website",
      place: "Bách Khoa Aptech",
      text: "Chuyên ngành Lập trình Website (2018 – 2021). Cùng năm được nhận làm cộng tác viên, trợ giảng cho trung tâm."
    },
    {
      year: "2021",
      title: "Frontend Developer",
      place: "TPBank",
      text: "Xây dựng giao diện cho hệ thống LiveBank — bài học đầu tiên về sự nhất quán khi phần mềm phục vụ khách hàng ngân hàng."
    },
    {
      year: "2022",
      title: "Web Developer",
      place: "TCOM",
      text: "Dự án outsource cho thị trường Nhật Bản: logic phức tạp, yêu cầu chặt chẽ, tối ưu hiệu năng frontend."
    },
    {
      year: "2022",
      title: "R&D Developer & System Specialist",
      place: "MCNEX VINA",
      text: "Đi sâu vào MES - ERP, dữ liệu sản xuất và hạ tầng nhà máy; tự xây công cụ giám sát thiết bị, thiết kế tem, quan trắc."
    },
    {
      year: "2024",
      title: "Nhân viên xuất sắc nhất năm",
      place: "MCNEX VINA",
      text: "Danh hiệu “Nhân viên xuất sắc nhất năm 2024”.",
      highlight: true
    },
    {
      year: "Tiếp theo",
      title: "Sản phẩm AI & nền tảng số ổn định",
      place: "Định hướng",
      text: "Tạo ra các sản phẩm AI và nền tảng số có độ ổn định cao, mang lại giá trị thực cho cộng đồng.",
      future: true
    }
  ],

  // Work done inside companies — internal, no public links.
  caseFiles: [
    {
      name: "Phần mềm giám sát thiết bị",
      org: "MCNEX VINA",
      type: "Internal tool · Monitoring",
      problem:
        "Nhà máy cần biết thiết bị nào đang hoạt động, server nào bất thường, và thiết bị đó nằm ở đâu.",
      features: [
        "Theo dõi tình trạng thiết bị qua IP bằng ping, SMTP và API của thiết bị",
        "Ghi log trạng thái, thông số kỹ thuật của server theo chu kỳ cố định",
        "Hiển thị vị trí thiết bị trên bản đồ nhà máy"
      ],
      tech: ["Node.js", "React"]
    },
    {
      name: "Phần mềm thiết kế tem",
      org: "MCNEX VINA",
      type: "Desktop app · Production",
      problem:
        "Bộ phận sản xuất cần tự tạo và quản lý mẫu tem mà không phụ thuộc lập trình viên cho mỗi thay đổi.",
      features: [
        "Thiết kế mẫu tem bằng cách kéo thả phần tử",
        "In, xuất và import các mẫu tem đã thiết kế",
        "Đóng gói thành ứng dụng desktop, tương thích Windows để cài đặt thuận tiện"
      ],
      tech: ["Node.js", "Vue.js", "Desktop build"]
    },
    {
      name: "Phần mềm quan trắc",
      org: "MCNEX VINA",
      type: "Desktop app · Realtime data",
      problem:
        "Dữ liệu quan trắc được xuất ra file Excel — cần được đọc, lưu lịch sử và chuyển lên hệ thống quan trắc theo thời gian thực.",
      features: [
        "Đọc và lưu lịch sử dữ liệu quan trắc xuất ra định dạng Excel theo thời gian thực",
        "Gửi dữ liệu ghi nhận được lên hệ thống quan trắc",
        "Client hiển thị dữ liệu đọc từ file theo thời gian thực"
      ],
      tech: ["Node.js", "React", "Desktop build"]
    },
    {
      name: "Website tin tức trường học",
      org: "TCOM",
      type: "Outsource · Web",
      problem: "Trường học cần kênh đăng tin, quảng bá và giới thiệu khóa học.",
      features: [
        "Đăng tin, đăng bài quảng cáo trường học",
        "Đăng tin các khóa học"
      ],
      tech: ["PHP", "Laravel"]
    },
    {
      name: "Website LiveBank",
      org: "TPBank",
      type: "Banking · Web portal",
      problem:
        "Giao diện web portal cần hiển thị tin tức, nội dung, banner và được chỉnh sửa nhất quán.",
      features: [
        "Phát triển, thiết kế giao diện website LiveBank",
        "Hiển thị tin tức, nội dung, banner; chỉnh sửa các giao diện trên website"
      ],
      tech: ["ReactJS", "Styled Components", "WebPortal"]
    }
  ],

  // Independent products with public links.
  // Optional fields: role, challenge, impact, repo — rendered only when present.
  products: [
    {
      name: "vietnamcong.com",
      desc: "Agency nhận thiết kế website và quảng bá thương hiệu.",
      type: "Agency",
      tech: ["Laravel", "Tailwind"],
      link: "https://vietnamcong.com"
    },
    {
      name: "chocong.vn",
      desc: "Sàn TMĐT hải sản. Tối ưu trải nghiệm mua sắm địa phương.",
      type: "E-Commerce",
      tech: ["Laravel", "MySQL"],
      link: "https://chocong.vn"
    },
    {
      name: "promptagents.vn",
      desc: "Thị trường mua bán Prompt AI. Tích hợp thanh toán tự động.",
      type: "AI Marketplace",
      tech: ["React", "NodeJS"],
      link: "https://promptagents.vn"
    },
    {
      name: "ittrackingtool",
      desc: "Giám sát bản quyền phần mềm và phần cứng doanh nghiệp.",
      type: "System Tool",
      tech: ["Python", "C#"],
      link: "https://ittrackingtool.vietnamcong.com"
    },
    {
      name: "onepos",
      desc: "Phần mềm POS thế hệ mới hỗ trợ đa nền tảng.",
      type: "Management",
      tech: ["Laravel", "Vue"],
      link: "https://onepos.vietnamcong.com"
    },
    {
      name: "quizlogix",
      desc: "Nền tảng thi trắc nghiệm và hỗ trợ giảng dạy AI.",
      type: "EdTech",
      tech: ["NodeJS", "Socket.io"],
      link: "https://quizlogix.vietnamcong.com"
    }
  ],

  hobbies: ["Du lịch", "Phượt", "Trò chơi tốc độ", "Thám hiểm"],

  // "Beyond the code" — how the owner reads the road. Interpretation, not proof.
  journey: {
    intro:
      "Ngoài giờ làm, tôi thích xách xe lên và đi. Du lịch, thám hiểm, cảm giác tốc độ — những thứ kéo tôi ra khỏi màn hình và nhắc tôi rằng thế giới thật không chạy theo kịch bản.",
    checkpoints: [
      {
        code: "CP-01",
        title: "Tò mò",
        text: "Khúc cua phía trước luôn hấp dẫn hơn đoạn đường đã biết. Với công nghệ cũng vậy: tôi muốn hiểu thứ nằm sau lớp giao diện."
      },
      {
        code: "CP-02",
        title: "Thích nghi",
        text: "Trời đổi, đường xấu, kế hoạch phải sửa giữa chừng. Trên đường hay trong một hệ thống đang chạy, bình tĩnh xử lý là kỹ năng đáng giá."
      },
      {
        code: "CP-03",
        title: "Lên kế hoạch",
        text: "Một chuyến đi tốt bắt đầu từ bản đồ, điểm dừng và phương án dự phòng — giống như thiết kế trước khi viết dòng code đầu tiên."
      },
      {
        code: "CP-04",
        title: "Bền bỉ",
        text: "Những hành trình dài không xong trong một ngày. Sản phẩm tốt cũng vậy: từng chặng nhỏ, đều đặn, cho tới đích."
      }
    ],
    // Add real trip photos here: {src, alt, caption}. Nothing renders while empty.
    photos: []
  },

  about: [
    "Tôi là Trọng Nhất, sinh năm 2000, đến từ Nghi Sơn, Thanh Hóa. Tôi học lập trình web tại Bách Khoa Aptech và cùng năm bắt đầu học (2018) đã được nhận làm cộng tác viên, trợ giảng cho trung tâm — giải thích cho người khác là cách tôi hiểu một thứ đến nơi đến chốn.",
    "Từ giao diện LiveBank ở TPBank, dự án outsource cho Nhật ở TCOM, đến R&D tại MCNEX VINA, tôi dần bị cuốn vào loại vấn đề nằm giữa phần mềm và thế giới vật lý: thiết bị mất kết nối, dữ liệu sản xuất xung đột, một chiếc máy in tem cần đúng mẫu đúng lúc.",
    "Tôi làm việc với hai cái mũ: của một Full Stack Developer — xây cho ra sản phẩm, và của một System Admin — giữ cho nó chạy ổn định. Ngoài công việc chính, tôi còn tham gia xây dựng các sản phẩm web — từ agency, sàn thương mại điện tử, POS tới nền tảng AI.",
    "Điều tôi đang hướng tới: những sản phẩm AI và nền tảng số có độ ổn định cao, mang lại giá trị thật."
  ]
};

export default profile;
