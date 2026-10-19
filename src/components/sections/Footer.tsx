import styles from './Footer.module.css';

/**
 * Footer with hand-crafted signoff stamp and quick return-to-top.
 */
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.quote}>
          “A good backend is like good plumbing — invisible when it works flawlessly, indispensable to everything.”
        </p>

        <div className={styles.credits}>
          <p>Hand-crafted with code, tea & ink on paper.</p>
          <p>© {new Date().getFullYear()} Mohamed Hussein Tammaa</p>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className={styles.topButton}
          aria-label="Back to top of resume"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
          <span>back to top</span>
        </button>
      </div>
    </footer>
  );
}
