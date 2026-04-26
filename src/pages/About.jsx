import Navbar from "../components/Navbar";
import "./About.css";

const features = [
  {
    icon: "🎾",
    title: "Word Word Word",
    desc: "Word word word word word word word word word word word word word.",
  },
  {
    icon: "🏆",
    title: "Word Word Word",
    desc: "Word word word word word word word word word word word word word.",
  },
  {
    icon: "👥",
    title: "Word Word Word",
    desc: "Word word word word word word word word word word word word word.",
  },
];

const team = [
  { name: "Word Word", role: "Word, Word", emoji: "👤" },
  { name: "Word Word", role: "Word Word", emoji: "👤" },
  { name: "Word Word", role: "Word Word", emoji: "👤" },
  { name: "Word Word", role: "Word", emoji: "👤" },
];

const footerLinks = {
  "Linkuri Utile": ["Acasă", "Despre Noi", "Vânzări", "Contactați-ne"],
  "Suport": ["Centru Ajutor", "Contactați-ne", "Livrări", "Retururi"],
};

export default function About() {
  return (
    <div className="about-page">
      <Navbar />

      {/* ── HERO BANNER ── */}
      <div className="about-hero">
        {/* <img src="/images/about-hero.jpg" alt="Despre Noi" /> */}
        <h1 className="about-hero-title">Despre Noi</h1>
      </div>

      {/* ── INTRO ── */}
      <section className="about-intro">
        <div className="about-eyebrow">
          <span>Despre Noi</span>
        </div>
        <div className="about-intro-grid">
          <h2 className="about-intro-title">
            <span>Word Word</span> Word Word Word!
          </h2>
          <p className="about-intro-text">
            Word word word word word word word word word word word word word word
            word word word word word word word word word word word word word word
            word word word word word word word word word word word word.
          </p>
          <p className="about-intro-text">
            Word word word word word word word word word word word word word word
            word word word word word word word word word word word word word word
            word word word word word word word word word word word word.
          </p>
        </div>
      </section>

      {/* ── FEATURE CARDS ── */}
      <div className="about-features" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 4rem 5rem" }}>
        {features.map((f, i) => (
          <div key={i} className="feature-card">
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-text">
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── IMAGES ── */}
      <div className="about-images">
        <div className="about-images-inner">
          <div className="about-img-main">
            {/* <img src="/images/about-team.jpg" alt="Echipa noastră" /> */}
            🎾
          </div>
          <div className="about-img-secondary">
            {/* <img src="/images/about-video.jpg" alt="Video" /> */}
            🏟️
            <button className="play-btn">▶</button>
          </div>
        </div>
      </div>

      {/* ── TEAM ── */}
      <section className="about-team">
        <div className="team-header">
          <div className="team-eyebrow">
            <span>Echipa Noastră</span>
          </div>
          <h2 className="team-title">
            <span>Echipa</span> AceZone
          </h2>
          <p className="team-subtitle">
            Word word word word word word word word word word word word word
            word word word word word word word word word.
          </p>
        </div>

        <div className="team-grid">
          {team.map((member, i) => (
            <div key={i} className="team-card">
              <div className="team-card-img">
                {/* <img src={`/images/team-${i+1}.jpg`} alt={member.name} /> */}
                {member.emoji}
              </div>
              <div className="team-card-info">
                <p className="team-card-name">{member.name}</p>
                <p className="team-card-role">{member.role}</p>
              </div>
              <div className="team-card-socials">
                <a href="#" className="social-btn">f</a>
                <a href="#" className="social-btn">t</a>
                <a href="#" className="social-btn">in</a>
                <a href="#" className="social-btn">ig</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="about-footer">
        <div className="about-footer-grid">
          {/* Brand */}
          <div>
            <p className="footer-brand-name">AceZone</p>
            <p className="footer-brand-desc">
              Word word word word word word word word word word word word word
              word word word word word word word word word.
            </p>
            <div className="footer-socials">
              {["f", "t", "yt", "ig"].map((s) => (
                <button key={s} className="footer-social">{s}</button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="footer-col-title">{title}</p>
              <ul className="footer-links">
                {links.map((l) => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <p className="footer-col-title">Contact</p>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">📍</div>
              <p className="footer-contact-text">Word word word word, Word</p>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">📞</div>
              <p className="footer-contact-text">+0 (000) 000-00 00</p>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">✉️</div>
              <p className="footer-contact-text">word@acezone.com</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 AceZone. Word word word word.</p>
        </div>
      </footer>
    </div>
  );
}