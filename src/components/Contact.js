import React, {useState} from "react";
import {useReveal} from "../hooks/motion";
import "./Contact.scss";

const Contact = ({profile}) => {
  const [copied, setCopied] = useState(false);
  const ref = useReveal();
  const {email, phone, phoneIntl} = profile.contact;
  const canCopy = typeof navigator !== "undefined" && navigator.clipboard;

  const copyEmail = () => {
    navigator.clipboard.writeText(email).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      },
      () => {}
    );
  };

  return (
    <section
      className="section contact"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <div className="contact__inner reveal" ref={ref}>
          <p className="section-head__index">06 — Destination</p>
          <h2 className="contact__title" id="contact-title">
            Chặng tiếp theo có thể bắt đầu từ <em>một email</em>.
          </h2>
          <p className="contact__lead">
            Tôi luôn sẵn sàng trao đổi về những cơ hội xây sản phẩm cần cả tư
            duy sản phẩm lẫn sự ổn định của hệ thống. Nếu đội của bạn cần một
            người như vậy, hãy nói chuyện.
          </p>

          <div className="contact__email">
            <a href={`mailto:${email}`} className="contact__email-link">
              {email}
            </a>
            {canCopy && (
              <button
                type="button"
                className="contact__copy mono"
                onClick={copyEmail}
              >
                {copied ? "Đã chép ✓" : "Chép email"}
              </button>
            )}
            <span className="sr-only" aria-live="polite">
              {copied ? "Đã chép địa chỉ email" : ""}
            </span>
          </div>

          <ul className="contact__channels">
            <li>
              <span className="label">Điện thoại</span>
              <a className="text-link" href={`tel:${phoneIntl}`}>
                {phone}
              </a>
            </li>
            {profile.socials.map(s => (
              <li key={s.label}>
                <span className="label">{s.label}</span>
                <a
                  className="text-link"
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.handle}
                  <span aria-hidden="true"> ↗</span>
                  <span className="sr-only"> (mở tab mới)</span>
                </a>
              </li>
            ))}
            <li>
              <span className="label">Base</span>
              <span>{profile.location}</span>
            </li>
          </ul>

          <div className="contact__actions">
            <a href={`mailto:${email}`} className="btn btn--primary">
              Gửi email <span className="btn__arrow">→</span>
            </a>
            {profile.resumeUrl ? (
              <a href={profile.resumeUrl} className="btn" download>
                Tải CV (PDF)
              </a>
            ) : (
              <button
                type="button"
                className="btn"
                onClick={() => window.print()}
              >
                In / lưu CV dạng PDF
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
