# Portfolio Redesign Plan — "CODE THE WORLD"

> Engineer by mind, explorer by nature.

Tài liệu này được viết **trước** khi triển khai (Phase 1 — audit & kế hoạch) và
được cập nhật ở cuối bằng báo cáo hoàn thành (xem mục 11).

---

## 1. Tóm tắt kiến trúc dự án (audit)

| Hạng mục | Thực tế trong repo |
| --- | --- |
| Framework | Create React App — `react-scripts@5.0.1` (webpack 5, Babel, Jest) |
| UI | React **16.14** (`ReactDOM.render`), SCSS qua `sass` |
| Entry | `src/index.js` → `src/App.js` → `src/containers/Main.js` |
| Routing | Không có router — single page |
| Backend / API / DB | **Không có**. Không auth, không CMS, không form liên hệ, không analytics |
| Dữ liệu profile | Hardcode trong object `dev` bên trong `Main.js` |
| Styling | `src/containers/Main.scss` (CSS variables, glassmorphism, bento grid) + `index.css` + `App.scss` |
| Script ngoài React | `public/index.html` chứa 2 inline script: hiệu ứng glow theo chuột và **mini game Snake** chạy nền trên `<canvas id="snakeCanvas">` |
| Build/deploy | `npm run build`; `npm run deploy` → `gh-pages -b master`; `Dockerfile` chạy `npm start` (dev server) trên Node 20 |
| Test | `src/App.test.js` (smoke test) + `setupTests.js` (enzyme, jest-canvas-mock) |
| Format | Prettier (`npm run format`, `npm run check-format`), pre-commit hook |
| Repo gốc | Fork từ template *developerFolio* — README, `homepage`, `manifest.json` vẫn mang tên template; nhiều dependency của template không còn dùng (`lottie-react`, `react-reveal`, `react-headroom`, `colorthief`, …) |

### Nguồn dữ liệu đã xác thực
1. Object `dev` trong `Main.js` (bản cập nhật gần nhất của chủ sở hữu, 05/2026).
2. `src/assets/cv/resume.pdf` — CV tạo bằng TopCV. File **bị hỏng** (xem 2.3) nhưng
   đã khôi phục được text bằng cách giải nén content stream + ToUnicode CMap. Từ đây
   có thêm: chi tiết 3 dự án nội bộ ở MCNEX, dự án ở TCOM/TPBank, mốc 2018 làm
   cộng tác viên/trợ giảng tại Bách Khoa Aptech, mức tự đánh giá kỹ năng.
3. Git metadata: tài khoản GitHub `Motmaimai` (chủ của repo này).

Khi hai nguồn khác nhau (vd. tech stack TPBank), ưu tiên `Main.js` vì mới hơn, CV
dùng để bổ sung chi tiết.

## 2. Các vấn đề hiện tại

### 2.1 Giao diện & trải nghiệm
- Bố cục sidebar + cột nội dung = **CV giấy đặt lên nền tối**; không có hero, không có câu chuyện.
- Glassmorphism + bento card + badge ở mọi nơi → cảm giác template/dashboard SaaS.
- Grid nền + glow theo chuột + Snake chạy nền **liên tục** cạnh tranh với nội dung,
  phím mũi tên bị Snake "nghe" toàn cục.
- Text 12–13px ở nhiều chỗ, emoji làm icon, không có hierarchy rõ ràng.
- Desktop dùng `height: 100vh` + `overflow-y: auto` cho 2 cột → cuộn lồng nhau, khó dùng, không có điều hướng.
- Sở thích ("Du lịch, Trò chơi tốc độ, Thám hiểm") chỉ là 3 tag — mất cơ hội tạo khác biệt.
- Dự án chỉ có 1 dòng mô tả; các dự án thật sự có chiều sâu kỹ thuật (MES/ERP, giám sát thiết bị, thiết kế tem, quan trắc) thì không xuất hiện.

### 2.2 Accessibility / SEO / Performance
- `<html lang="en">` cho nội dung tiếng Việt; không có landmark/heading hợp lệ (`h2` → `h4` → `h3`).
- `og:image` trỏ đến `og-image.jpg` **không tồn tại**; `robots.txt` thiếu rule; `manifest.json` tên "DeveloperFolio".
- Mọi favicon (16px → 384px) đều là **cùng một file PNG 426 KB** (~2,5 MB icon), `favicon.ico` 259 KB.
- Tải Font Awesome CSS (~60 KB) nhưng không dùng.
- Không có `prefers-reduced-motion`, không có focus style.

### 2.3 Lỗi kỹ thuật phát hiện
- **`resume.pdf` bị hỏng trong git**: `.gitattributes` đặt `* text eol=lf` nhưng không khai báo `*.pdf binary`
  → Git đã chuẩn hóa CRLF trong file nhị phân. File không mở được bằng `pdfinfo`/`pdftotext`
  (sai xref). Không thể khôi phục byte gốc → không link "Tải CV" tới file này.
- Test baseline **fail**: `ReferenceError: TextDecoder is not defined` (enzyme → cheerio → undici trên jsdom).
- `npm run check-format` fail ở `Main.js`, `Main.scss`, `index.js` (và cả thư mục `build/` vì `.prettierignore` không bỏ qua nó).

## 3. Concept thiết kế được chọn

**"Bản đồ địa hình của một kỹ sư"** — toàn bộ portfolio là một bản đồ topographic tối,
trên đó một **cung đường màu hổ phách** uốn qua núi, và các **checkpoint trên cung đường
đồng thời là node của một hệ thống** (đường nối mảnh màu cyan như sơ đồ mạng).

Lý do:
- Một hình ảnh duy nhất nói được cả hai vế: *contour map + route* (phượt) và
  *node graph + data flow* (hệ thống). Không cần icon xe máy hay ma trận hacker.
- Hợp với hồ sơ thật: chủ sở hữu vừa là Full-stack Developer vừa là System Specialist
  làm việc với **giám sát thiết bị, mạng, nhà máy** — "bản đồ + node" là ngôn ngữ của chính công việc đó.
- Chỉ cần một scene 3D (terrain + route + nodes) tái sử dụng ở 2 chỗ: Hero (nhìn toàn cảnh)
  và Beyond the Code (camera chạy dọc cung đường). Ít code, nhất quán, nhẹ.

## 4. Art direction & design system

- **Màu** (CSS custom properties trong `src/styles/_tokens.scss`):
  `--ink #07090c` (nền), `--graphite #0d1117`, `--line rgba(230,237,243,.08)`,
  `--paper #e8ecef` (chữ), `--mute #8b96a3`, `--signal #5ad1e6` (cyan — công nghệ),
  `--ember #f4a259` (hổ phách — hành trình, đèn xe, hoàng hôn). Không gradient phủ trang.
- **Typography**: *Be Vietnam Pro* (thiết kế cho tiếng Việt — dấu đẹp ở cỡ lớn) cho display & body;
  *JetBrains Mono* cho nhãn kỹ thuật, tọa độ, số thứ tự. Thang chữ fluid bằng `clamp()`.
  Body tối thiểu 16–17px.
- **Grid**: container 1200px, 12 cột trên desktop, gutter 16px trên mobile.
- **Ngôn ngữ chi tiết**: nhãn mono kiểu `01 — SYSTEMS`, tọa độ, đường kẻ mảnh 1px,
  chấm checkpoint. Card chỉ dùng khi thật sự là "vật trưng bày" (project exhibit).
- **Motion tokens**: `--ease-out: cubic-bezier(.2,.7,.2,1)`, 180ms (hover), 700ms (reveal).
- **States**: focus-visible outline cyan 2px offset 3px; hover dịch chuyển ≤ 4px.
- **Breakpoints**: 600 / 900 / 1200.

## 5. Cấu trúc trang & hành trình người dùng

| # | Section | Mục đích cho nhà tuyển dụng |
| --- | --- | --- |
| 0 | **Hero** — tên, chức danh, 1 câu định vị, CTA "Xem dự án" + "Liên hệ", HUD tọa độ, gợi ý cuộn | Hiểu ngay: ai, làm gì, khám phá tiếp ở đâu |
| 1 | **Systems** (Developer Environment) — sơ đồ luồng dữ liệu tương tác của 3 hệ thống thật đã xây ở MCNEX + nhóm công nghệ theo vai trò | Thấy cách người này nghĩ về hệ thống |
| 2 | **Built** (Project Showcase) — "case file" cho dự án doanh nghiệp + "exhibit" cho sản phẩm độc lập có link | Bằng chứng năng lực |
| 3 | **Route** (Career Timeline) — các mốc 2018 → nay như checkpoint trên một cung đường | Kinh nghiệm, tiến triển |
| 4 | **Beyond the Code** — scene 3D camera chạy dọc cung đường + 4 checkpoint giá trị cá nhân | Khác biệt, con người |
| 5 | **About** — câu chuyện ngắn ngôi thứ nhất | Văn hóa làm việc, định hướng |
| 6 | **Contact** — "điểm đến": email, điện thoại, GitHub, Facebook, nút in/lưu CV PDF | Hành động |

Navigation cố định tối giản (logo NTN + 5 anchor + CTA liên hệ), có skip-link.

## 6. Kiến trúc component

```
src/
  data/profile.js            ← nguồn nội dung duy nhất (thay object `dev` cũ)
  styles/_tokens.scss         ← design tokens + mixins
  styles/global.scss          ← reset, typography, utilities, print
  hooks/useReveal.js          ← IntersectionObserver reveal (no-op nếu không hỗ trợ)
  hooks/usePrefersReducedMotion.js
  three/terrainWorld.js       ← Three.js thuần: terrain shader + route + nodes, API create/dispose
  components/
    SceneCanvas.js            ← lazy-load three, kiểm tra WebGL, pause khi ngoài viewport, fallback SVG
    SceneFallback.js
    Nav.js  Hero.js  Systems.js  Projects.js  Timeline.js
    Journey.js  About.js  Contact.js  Footer.js
    SnakeGame.js              ← mini game cũ, chuyển thành easter egg bật/tắt
    PrintResume.js            ← CV in được (chỉ hiện khi in)
    SectionHeading.js
  containers/Main.js          ← ghép section (giữ đường dẫn cũ, App.js không đổi)
```

## 7. Chiến lược 3D & animation

- **Thư viện**: chỉ thêm `three` (vanilla). Không dùng React Three Fiber vì R3F v8+ yêu cầu
  React 18 — nâng React chỉ để có 3D là rủi ro không cần thiết. Không thêm GSAP/Framer Motion:
  reveal dùng IntersectionObserver + CSS transition.
- **Code splitting**: `import("three")` động trong `SceneCanvas` → nội dung HTML hiển thị trước,
  chunk 3D tải sau, chỉ khi scene gần viewport.
- **Scene**: PlaneGeometry hiển thị bằng ShaderMaterial vẽ **đường đồng mức** (contour) theo độ cao
  + fog; CatmullRom route → Tube với xung sáng chạy dọc (uniform thời gian); node octahedron +
  pin dọc + cạnh nối mảnh kiểu graph; hạt "data packet" di chuyển trên route.
- **Hero**: camera cao, parallax nhẹ theo chuột (lerp), xoay rất chậm.
- **Journey**: section cao ~260vh với canvas `position: sticky`; tiến trình cuộn → vị trí camera trên route.
  Không khóa cuộn, không scroll-jacking.
- **Tiết kiệm tài nguyên**: DPR ≤ 1.75 (≤ 1.25 trên mobile), giảm segment trên thiết bị yếu,
  dừng render loop khi ngoài viewport / tab ẩn, `dispose()` geometry/material/renderer khi unmount,
  xử lý `webglcontextlost`.
- **Fallback**: không có WebGL / lỗi tải chunk → SVG tĩnh cùng ngôn ngữ (contour + route).
  Reduced motion → render 1 frame tĩnh, không loop, không parallax.

## 8. Chiến lược nội dung cá nhân

- Chỉ dùng dữ liệu đã xác thực ở mục 1. Không thêm dự án, số liệu, khách hàng, cung đường, km.
- Dự án nội bộ MCNEX/TCOM/TPBank: ghi rõ "Dự án nội bộ — không công khai", không link.
- Sản phẩm độc lập: dùng link có sẵn; trường `role`, `challenge`, `impact` để trống sẽ **không hiển thị** —
  cấu trúc dữ liệu sẵn sàng để chủ sở hữu bổ sung.
- Phần phượt: kể bằng giá trị (tò mò, thích nghi, lập kế hoạch, bền bỉ) — trình bày là cách
  chủ sở hữu nhìn nhận, không phải "bằng chứng kỹ năng". Gallery ảnh chỉ render khi có ảnh thật trong `profile.js`.
- Kỹ năng: nhóm theo vai trò; cấp độ "Advanced/Intermediate" lấy nguyên từ CV, hiển thị bằng chữ — không progress bar.

## 9. SEO, accessibility, performance

- `lang="vi"`, title/description mới, OG/Twitter đầy đủ, `og-image.jpg` thật (1200×630) chụp từ chính hero.
- JSON-LD `Person` chỉ với dữ liệu có thật (name, jobTitle, email, address locality, sameAs GitHub/Facebook).
- Favicon resize đúng kích thước; bỏ Font Awesome; `robots.txt` hợp lệ; manifest đúng tên.
- Heading 1 `h1` duy nhất, mỗi section `h2`; landmark `header/nav/main/footer`; skip-link.
- Mọi nội dung là HTML thật — đọc được khi tắt JS/WebGL (trừ phần React render), không phụ thuộc canvas.
- Link ngoài: `target="_blank" rel="noopener noreferrer"`.

## 10. Kế hoạch kiểm thử & tiêu chí nghiệm thu

Regression list (chức năng hiện có):
1. Build production thành công (`npm run build`).
2. Toàn bộ dữ liệu cũ (tên, chức danh, liên hệ, 3 kinh nghiệm, 6 dự án + link, kỹ năng, sở thích) vẫn hiển thị.
3. Link dự án mở tab mới an toàn.
4. Mini game Snake vẫn chơi được (giờ là easter egg bật/tắt, phím mũi tên chỉ bị bắt khi đang chơi).
5. Favicon / manifest vẫn hợp lệ. `npm run deploy` (gh-pages) không đổi.

Kiểm thử:
- `npm test` (sửa lỗi TextDecoder baseline + test render nội dung chính, link an toàn, fallback khi không có WebGL).
- `npm run build`, `prettier --check` cho file đã sửa.
- Playwright (Chromium có sẵn): chụp desktop 1440, tablet 834, mobile 390; kiểm tra console error,
  WebGL render thật, reduced-motion, không horizontal scroll.

---

## 11. Báo cáo hoàn thành

### 11.1 Những thay đổi đã thực hiện
- Viết lại toàn bộ giao diện thành single-page "Code the world" gồm 7 khu vực: Hero → Systems →
  Built → Route → Beyond the Code → About → Contact, có nav cố định, skip-link, footer.
- Toàn bộ nội dung chuyển vào `src/data/profile.js` — gộp dữ liệu cũ trong `Main.js` với chi tiết khôi
  phục từ CV PDF. Không thêm dự án, số liệu, link, cung đường hay địa điểm nào không có trong nguồn.
- Mini game Snake trước đây chạy nền liên tục trong `index.html` → giờ là easter egg bật/tắt ở footer
  (`SnakeGame.js`, tải lazy), chỉ bắt phím mũi tên khi đang chơi, Esc để thoát. Logic game giữ nguyên.
- "In / lưu CV dạng PDF": bản CV sạch dựng từ cùng dữ liệu, chỉ hiện khi in (`PrintResume.js`).
  Khi có file PDF hợp lệ, đặt `resumeUrl` trong `profile.js` → nút đổi thành "Tải CV (PDF)".
- SEO: `lang="vi"`, title/description mới, OG/Twitter, `og-image.jpg` 1200×630 chụp từ chính hero,
  JSON-LD `Person` (chỉ dữ liệu thật), `robots.txt` hợp lệ, manifest đúng tên/màu, nội dung `<noscript>`.
- Hiệu năng: favicon resize đúng kích thước (16px: 426 KB → 0,7 KB; tổng icon ~2,6 MB → ~0,3 MB),
  bỏ Font Awesome không dùng, bỏ 2 inline script chạy liên tục (glow chuột + Snake).
- `.gitattributes`: thêm `*.pdf/*.jpg/*.ico/*.gif binary` để file nhị phân không bị hỏng như CV cũ.
- Sửa test baseline đang fail (bỏ setup enzyme eager — không test nào dùng enzyme) và viết 6 test mới.

### 11.2 Các section & trải nghiệm 3D
| Section | Trải nghiệm |
| --- | --- |
| Hero | Scene Three.js: địa hình contour (shader đường đồng mức + lưới tọa độ), cung đường hổ phách có xung sáng chạy dọc, 6 checkpoint-node nối thành graph, packet dữ liệu chạy trên đường; parallax chuột nhẹ, camera trôi chậm. HUD Base/Now/Since. |
| Systems | System explorer dạng tab (WAI-ARIA, phím mũi tên) — sơ đồ luồng dữ liệu của 3 hệ thống thật ở MCNEX (giám sát thiết bị, thiết kế tem, quan trắc), connector có packet chạy. Stack theo 6 vai trò, mức ADV/INT lấy nguyên từ CV, không progress bar. |
| Built | 5 "case file" (MCNEX ×3, TCOM, TPBank): vấn đề → chức năng → công nghệ. 6 "exhibit" sản phẩm có link, tilt 3D CSS theo chuột. Trường `role/challenge/impact/repo` tự hiển thị khi được bổ sung. |
| Route | Timeline 2018 → nay → "Tiếp theo"; rail tô màu theo tiến trình cuộn, checkpoint sáng lên khi tới; mốc công ty kèm trách nhiệm & tech. |
| Beyond the Code | Cùng thế giới 3D, camera chase chạy dọc cung đường theo tiến trình cuộn (sticky, không khóa cuộn); 4 checkpoint giá trị cá nhân; HUD tiến trình. Gallery ảnh chỉ render khi có ảnh thật. |
| About / Contact | Câu chuyện ngôi thứ nhất từ dữ liệu thật + bảng facts; điểm đến: email (copy), điện thoại, GitHub, Facebook, nút in CV. |

Fallback & tiết kiệm: chunk 3D (`three` ~137 KB gzip) chỉ tải khi scene sắp vào viewport; render loop dừng
khi ngoài viewport/tab ẩn; dispose geometry/material/texture/renderer khi unmount; xử lý context lost;
không có WebGL2 → SVG tĩnh cùng phong cách; `prefers-reduced-motion` → 1 frame tĩnh, không parallax,
Journey thành danh sách thường; mobile (<900px) → chất lượng thấp (ít segment, DPR ≤ 1.25) và layout tĩnh.

### 11.3 File quan trọng
- Mới: `src/data/profile.js`, `src/three/terrainWorld.js`, `src/hooks/motion.js`,
  `src/styles/_tokens.scss`, `src/styles/global.scss`, `src/components/*` (Nav, Hero, SceneCanvas,
  SceneFallback, SectionHead, Systems, Projects, Timeline, Journey, About, Contact, Footer, SnakeGame,
  PrintResume + SCSS tương ứng), `public/og-image.jpg`, file này.
- Sửa: `src/containers/Main.js` (chỉ ghép section), `public/index.html`, `public/manifest.json`,
  `public/robots.txt`, `public/browserconfig.xml`, favicon/icon PNG, `src/index.css`, `src/setupTests.js`,
  `src/App.test.js`, `.gitattributes`, `package.json`, `package-lock.json`.
- Xóa: `src/containers/Main.scss` (thay bằng design system mới; chỉ `Main.js` dùng nó).
- `App.js`, `index.js` (chỉ prettier), `Dockerfile`, script `deploy` không đổi.

### 11.4 Thư viện mới
- `three@0.185.1` — duy nhất. Không dùng R3F (cần React 18, repo đang React 16.14), không GSAP/Framer
  (IntersectionObserver + CSS là đủ). Lockfile chỉ thêm đúng entry `three`.

### 11.5 Kết quả kiểm tra thực tế
- `CI=true npm test` → **6/6 pass** (trước đó suite fail vì `TextDecoder`).
- `npm run build` → **Compiled successfully**, không warning. main 54 KB gzip, CSS 7 KB; three/world tải sau.
- `prettier -c` cho toàn bộ `src/**/*.{js,scss,css}` → pass. (`npm run check-format` vẫn báo `build/`
  vì `.prettierignore` không loại thư mục build — có sẵn từ trước.)
- Playwright + Chromium (WebGL qua SwiftShader), build production:
  - Desktop 1440×900, tablet 834×1112, mobile 390×844: không cuộn ngang, không lỗi console/pageerror,
    cả 2 scene chuyển sang trạng thái `ready` và render thật.
  - Reduced motion: scene tĩnh, Journey dạng danh sách.
  - Tab hệ thống điều khiển được bằng bàn phím; menu mobile mở/đóng; Snake bật, phím mũi tên không
    cuộn trang, Esc thoát; xuất PDF chế độ print → CV 2 trang A4.

### 11.6 Vấn đề còn tồn tại
- **`src/assets/cv/resume.pdf` hỏng** (Git đã chuẩn hóa line ending trên file nhị phân). Không thể sửa từ repo.
- Không xác minh được 6 link sản phẩm và Facebook/GitHub do proxy môi trường chặn — link giữ nguyên từ dữ liệu cũ.
- `og:url` = `https://vietnamcong.com/` (giữ từ bản cũ) và `og:image` là đường dẫn tương đối — mạng xã hội
  cần URL tuyệt đối. Chưa biết domain thật của portfolio nên chưa thêm canonical/sitemap.
- `package.json` `homepage` và `README.md` vẫn của template developerFolio; các dependency của template
  (`lottie-react`, `react-reveal`, `react-headroom`, `colorthief`, `react-twitter-embed`, `enzyme`…) và asset
  cũ (logo Harvard/Stanford/Airbnb…, lottie) không còn được import — chưa xóa theo nguyên tắc an toàn.
- `Dockerfile` chạy dev server (`npm start`) trên `node:20.0-alpine`, không phải bản build production.
- Font tải từ Google Fonts (có fallback hệ thống).

### 11.7 Cần chủ sở hữu bổ sung
1. File CV PDF hợp lệ → `public/` + `resumeUrl` trong `src/data/profile.js`.
2. Với từng sản phẩm (`products`): vai trò thực tế, thách thức kỹ thuật, kết quả có số liệu, link source (nếu public).
3. Ảnh chuyến đi thật (`journey.photos`: `{src, alt, caption}`) — gallery tự xuất hiện.
4. LinkedIn (nếu có) → thêm vào `socials`.
5. Domain chính thức → cập nhật `og:url`, `og:image` tuyệt đối, canonical, sitemap.
6. Duyệt lại các đoạn kể chuyện ngôi thứ nhất (`about`, `journey.intro`, `journey.checkpoints`, `tagline`) —
   đây là diễn giải từ dữ liệu thật, cần chủ sở hữu xác nhận giọng văn.
7. Tọa độ HUD `19.4°N · 105.7°E` là tọa độ xấp xỉ của Nghi Sơn — chỉnh nếu muốn.

### 11.8 Cách chạy & triển khai
```bash
npm ci
npm start          # dev server http://localhost:3000
npm test           # jest (CI=true để chạy 1 lần)
npm run build      # bản production vào build/
npm run deploy     # gh-pages -b master (như trước)
```
Nội dung: chỉ cần sửa `src/data/profile.js`. Màu/typography: `src/styles/global.scss`.
Scene 3D: `src/three/terrainWorld.js` (hằng số `ROUTE_POINTS`, `CHECKPOINT_T`, `COLORS`, `QUALITY`).
