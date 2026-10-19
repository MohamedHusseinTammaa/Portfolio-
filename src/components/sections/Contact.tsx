import { useState } from 'react';
import { resume } from '../../data/resume';
import { useInView } from '../../hooks/useInView';
import styles from './Contact.module.css';

/**
 * Contact section styled like a vintage envelope or business card with
 * postal stamp, quick-copy feedback, and direct links with logos.
 */
export default function Contact() {
  const [ref, visible] = useInView<HTMLElement>();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const { contact, location } = resume;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ''}`}
      aria-labelledby="contact-heading"
    >
      <div className={styles.header}>
        <h2 className={styles.heading} id="contact-heading">Get in Touch</h2>
        <span className={styles.subNote} aria-hidden="true">📮 open for backend roles</span>
      </div>

      <div className={styles.envelope}>
        {/* Postmark stamp in corner */}
        <div className={styles.postmark} aria-hidden="true">
          <div className={styles.postmarkCircle}>
            <span>CAIRO</span>
            <span className={styles.postmarkDate}>AIR MAIL</span>
          </div>
          <div className={styles.wavyLines}>
            <span /><span /><span />
          </div>
        </div>

        <p className={styles.intro}>
          I'm currently seeking backend engineer opportunities where I can contribute to core systems, databases, and APIs. Let's build something solid together!
        </p>

        <div className={styles.grid}>
          {/* Email */}
          <div className={styles.item}>
            <span className={styles.itemLabel}>Email</span>
            <div className={styles.actionRow}>
              <a href={`mailto:${contact.email}`} className={styles.itemLink}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>{contact.email}</span>
              </a>
              <button
                type="button"
                className={styles.copyButton}
                onClick={() => handleCopy(contact.email, 'email')}
                aria-label="Copy email address"
              >
                {copiedKey === 'email' ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Phone */}
          <div className={styles.item}>
            <span className={styles.itemLabel}>Phone</span>
            <div className={styles.actionRow}>
              <a href={`tel:${contact.phone}`} className={styles.itemLink}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>{contact.phone}</span>
              </a>
              <button
                type="button"
                className={styles.copyButton}
                onClick={() => handleCopy(contact.phone, 'phone')}
                aria-label="Copy phone number"
              >
                {copiedKey === 'phone' ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* LinkedIn with official Logo */}
          <div className={styles.item}>
            <span className={styles.itemLabel}>LinkedIn</span>
            <div className={styles.actionRow}>
              <a
                href={`https://www.${contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.itemLinkWithLogo}
                aria-label="Mohamed Tammaa on LinkedIn"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className={`${styles.logoIcon} ${styles.linkedinLogo}`}
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                </svg>
                <span>Mohamed Tammaa</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>

          {/* GitHub with official Logo */}
          <div className={styles.item}>
            <span className={styles.itemLabel}>GitHub</span>
            <div className={styles.actionRow}>
              <a
                href={`https://${contact.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.itemLinkWithLogo}
                aria-label="Mohamed Hussein on GitHub"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className={`${styles.logoIcon} ${styles.githubLogo}`}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                <span>{contact.github}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>

          {/* Location */}
          <div className={styles.item}>
            <span className={styles.itemLabel}>Based in</span>
            <span className={styles.itemPlain}>📍 {location} (Open to Remote / Relocation)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
