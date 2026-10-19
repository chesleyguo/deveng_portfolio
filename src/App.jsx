import { useEffect, useState } from 'react';
import './App.css';
import {
  profile,
  socials,
  navLinks,
  education,
  experience,
  research,
  researchFilters,
  skills,
  honors,
  extensionStudy,
  stats,
} from './data';
import {
  Boop,
  Counter,
  HeartButton,
  Reveal,
  ScrollProgress,
  Sparkles,
  ThemeToggle,
  Typewriter,
  WaveDivider,
} from './components';

/**
 * Jiayi (Chesley) Guo's Portfolio
 * Content is defined in ./data.js; this component only handles rendering and interaction.
 */

const validators = {
  name: (v) => (v.trim().length < 2 ? 'Name must be at least 2 characters' : ''),
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address',
  message: (v) => (v.trim().length < 10 ? 'Message must be at least 10 characters' : ''),
};

const emptyForm = { name: '', email: '', subject: '', message: '' };

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);

  // ============================================
  // SMOOTH SCROLL & ACTIVE NAV HIGHLIGHT
  // ============================================

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      document.querySelectorAll('section').forEach((section) => {
        if (
          scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight
        ) {
          setActiveSection(section.id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ============================================
  // FORM VALIDATION
  // ============================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setTouched((t) => ({ ...t, [name]: true }));
    setSent(false);
    if (validators[name]) {
      setErrors((errs) => ({ ...errs, [name]: validators[name](value) }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const nextErrors = Object.fromEntries(
      Object.entries(validators).map(([field, validate]) => [field, validate(form[field])])
    );
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.values(nextErrors).every((msg) => !msg)) {
      // No backend yet: open the visitor's mail client with the message pre-filled
      const subject = encodeURIComponent(form.subject || `Portfolio inquiry from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setForm(emptyForm);
      setErrors({});
      setTouched({});
      setSent(true);
    }
  };

  const fieldClass = (field) => {
    if (!touched[field]) return '';
    return errors[field] ? 'error' : 'success';
  };

  const visibleResearch =
    filter === 'all' ? research : research.filter((p) => p.category === filter);
  const categoryLabel = (id) => researchFilters.find((f) => f.id === id)?.label ?? id;

  return (
    <>
      <ScrollProgress />

      {/* Navigation Bar */}
      <nav id="navbar">
        <div className="nav-brand">
          <a href="#home" onClick={(e) => scrollTo(e, 'home')}>
            {profile.shortName}
          </a>
        </div>
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`nav-link ${activeSection === id ? 'active' : ''}`}
                onClick={(e) => scrollTo(e, id)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <ThemeToggle />
          <button
            type="button"
            className={`nav-toggle ${menuOpen ? 'active' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-blobs" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="hero-content">
          <p className="hero-greeting">
            Hi there, I&apos;m{' '}
            <span className="wave-hand" role="img" aria-label="waving hand">
              👋
            </span>
          </p>
          <h1 className="hero-title">{profile.name}</h1>
          <p className="hero-subtitle">
            {profile.degree} @ <Sparkles>{profile.school}</Sparkles>
          </p>
          <p className="hero-focus">
            I love <Typewriter words={profile.passions} />
          </p>
          <p className="hero-tagline">{profile.tagline}</p>
          <div className="hero-buttons">
            <a
              href="#research"
              className="btn btn-primary"
              onClick={(e) => scrollTo(e, 'research')}
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="btn btn-secondary"
              onClick={(e) => scrollTo(e, 'contact')}
            >
              Get In Touch
            </a>
          </div>
        </div>
        <WaveDivider />
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2>About Me</h2>
          <div className="about-grid">
            <div className="about-text">
              {profile.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              <div className="about-details">
                <div className="detail-item">
                  <span className="detail-icon">
                    <Boop rotation={-15} scale={1.3}>
                      📍
                    </Boop>
                  </span>
                  <span>{profile.location}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">
                    <Boop rotation={15} scale={1.3}>
                      ✉️
                    </Boop>
                  </span>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">
                    <Boop y={-4} scale={1.3}>
                      💼
                    </Boop>
                  </span>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">
                    linkedin.com/in/jg1023
                  </a>
                </div>
              </div>
            </div>
            <div className="about-availability">
              <h3>Currently Open To</h3>
              <div className="availability-tags">
                {profile.openTo.map((item) => (
                  <span key={item} className="tag tag-available">
                    {item}
                  </span>
                ))}
              </div>
              <p className="availability-note">{profile.availability}</p>
            </div>
          </div>

          <h3 className="subsection-title">Education</h3>
          <div className="education-grid">
            {education.map((edu, i) => (
              <Reveal key={edu.school} delay={i * 120}>
                <div className="education-card">
                  <div className="card-row">
                    <h4>{edu.school}</h4>
                    <span className="card-date">{edu.date}</span>
                  </div>
                  <p className="card-role">{edu.degree}</p>
                  <p className="card-meta">{edu.detail}</p>
                  <p className="card-meta">GPA: {edu.gpa} / 4.0</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section id="numbers" className="section section-band">
        <div className="container">
          <h2>By the Numbers</h2>
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <div className="stat">
                  <span className="stat-value">
                    <Counter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section section-alt">
        <div className="container">
          <h2>Experience</h2>
          <div className="timeline">
            {experience.map((job) => (
              <Reveal key={job.company} className="timeline-item">
                <div className="card-row">
                  <h3 className="timeline-company">{job.company}</h3>
                  <span className="card-date">{job.date}</span>
                </div>
                <div className="card-row">
                  <p className="card-role">{job.role}</p>
                  <span className="card-meta">{job.location}</span>
                </div>
                <p className="card-meta">{job.team}</p>
                <ul className="timeline-highlights">
                  {job.highlights.map((point) => (
                    <li key={point.slice(0, 32)}>{point}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="section">
        <div className="container">
          <h2>Research & Projects</h2>

          <div className="filter-buttons">
            {researchFilters.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={`filter-btn ${filter === id ? 'active' : ''}`}
                onClick={() => setFilter(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {visibleResearch.map((project, i) => (
              <Reveal key={project.title} delay={(i % 3) * 100}>
                <div className={`project-card ${project.featured ? 'featured' : ''}`}>
                  <div className="project-content">
                    <div className="project-header">
                      <span className="project-category">{categoryLabel(project.category)}</span>
                      <span className="card-date">{project.date}</span>
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-org">{project.org}</p>
                    <p className="card-meta">{project.role}</p>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        className="project-link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Learn more →
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section section-alt">
        <div className="container">
          <h2>Skills & Tools</h2>
          <div className="skills-grid">
            {skills.map((skill, i) => (
              <Reveal key={skill.group} delay={(i % 3) * 100}>
                <div className="skill-card">
                  <div className="skill-header">
                    <span className="skill-icon">
                      <Boop rotation={20} scale={1.25}>
                        {skill.icon}
                      </Boop>
                    </span>
                    <h3 className="skill-name">{skill.group}</h3>
                  </div>
                  <div className="skill-items">
                    {skill.items.map((item) => (
                      <span key={item} className="skill-item">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Honors Section */}
      <section id="honors" className="section">
        <div className="container">
          <h2>Honors & Awards</h2>
          <ul className="honors-list">
            {honors.map((honor) => (
              <li key={honor.title} className="honor-item">
                <span className="honor-year">{honor.year}</span>
                <span>{honor.title}</span>
              </li>
            ))}
          </ul>

          <h3 className="subsection-title">Extension Study</h3>
          <ul className="honors-list">
            {extensionStudy.map((item) => (
              <li key={item} className="honor-item">
                <span className="honor-year">🎓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section section-alt">
        <div className="container">
          <h2>Get In Touch</h2>
          <div className="contact-content">
            <p>
              I&apos;m looking for full-time data science and AI product roles starting January
              2027. Feel free to reach out about opportunities, research collaborations, or just to
              say hello!
            </p>

            <form id="contact-form" className="contact-form" onSubmit={handleFormSubmit} noValidate>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    className={fieldClass('name')}
                    onChange={handleInputChange}
                  />
                  {touched.name && errors.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    className={fieldClass('email')}
                    onChange={handleInputChange}
                  />
                  {touched.email && errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={form.message}
                    className={fieldClass('message')}
                    onChange={handleInputChange}
                  ></textarea>
                  {touched.message && errors.message && (
                    <span className="error-message">{errors.message}</span>
                  )}
                </div>

                <div className="form-group form-group-full">
                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                  {sent && (
                    <div className="success-message">
                      Thanks for reaching out! Your email app should open now.
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <HeartButton />
            <p>
              &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
            <div className="social-links">
              {socials.map(({ label, url }) => (
                <a
                  key={label}
                  href={url}
                  className="social-link"
                  {...(url.startsWith('http') && { target: '_blank', rel: 'noreferrer' })}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
