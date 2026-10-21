import { resume } from '../../data/resume';
import styles from './Hero.module.css';

/** Header with large handwritten name, stamped buttons, and opportunity sticker. */
export default function Hero() {
  const { name, title, location, pitch } = resume;

  return (
    <header id="hero" className={styles.hero}>
      <h1 className={styles.name}>{name}</h1>
      <p className={styles.title}>{title}</p>
      <p className={styles.location}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <path d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
        {location}
      </p>
      <p className={styles.pitch}>{pitch}</p>

      <div className={styles.buttons}>
        <a href={`${import.meta.env.BASE_URL}Mohamed Hussein Resume.pdf`} className={styles.stamp} download aria-label="Download CV as PDF">
          📄 Download CV
        </a>
        <a href="#contact" className={`${styles.stamp} ${styles.outline}`} aria-label="Scroll to contact section">
          ✉ Contact me
        </a>
        <span className={styles.sticker} aria-label="Open to opportunities">
          Open to opportunities
        </span>
      </div>
    </header>
  );
}
