import { resume, type ProjectDoodle } from '../../data/resume';
import { useInView } from '../../hooks/useInView';
import styles from './Projects.module.css';

function ProjectIcon({ doodle }: { doodle: ProjectDoodle }) {
  if (doodle === 'pdf') {
    return (
      <svg className={styles.doodleIcon} viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 4h12l7 7v19a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <polyline points="21 4 21 11 28 11" />
        <path d="M12 17h12" />
        <path d="M12 21h8" />
        <path d="M12 25h5" />
      </svg>
    );
  }

  if (doodle === 'face-check') {
    return (
      <svg className={styles.doodleIcon} viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="5" width="26" height="26" rx="6" strokeDasharray="3 3" />
        <circle cx="13" cy="15" r="2" fill="currentColor" />
        <circle cx="23" cy="15" r="2" fill="currentColor" />
        <path d="M14 23c2 2 6 2 8 0" />
        <polyline points="22 8 26 12 33 5" stroke="var(--mint)" strokeWidth="2.5" />
      </svg>
    );
  }

  // huffman: binary tree
  return (
    <svg className={styles.doodleIcon} viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="8" r="4" fill="var(--paper)" stroke="var(--ink)" />
      <line x1="15" y1="11" x2="10" y2="20" />
      <line x1="21" y1="11" x2="26" y2="20" />
      <circle cx="9" cy="23" r="3.5" fill="var(--mint)" stroke="var(--ink)" />
      <circle cx="27" cy="23" r="3.5" fill="var(--mustard)" stroke="var(--ink)" />
      <text x="18" y="34" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle" fill="currentColor" stroke="none">0101</text>
    </svg>
  );
}

/**
 * Featured projects with hand-sketched preview icons, stamp tags, and live links.
 */
export default function Projects() {
  const [ref, visible] = useInView<HTMLElement>();
  const { projects } = resume;

  return (
    <section
      id="projects"
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ''}`}
      aria-labelledby="projects-heading"
    >
      <div className={styles.header}>
        <h2 className={styles.heading} id="projects-heading">Selected Projects</h2>
        <span className={styles.subNote} aria-hidden="true">✏️ built & shipped</span>
      </div>

      <div className={styles.projectList}>
        {projects.map((proj) => {
          const isExternal = proj.link.startsWith('http');
          return (
            <article key={proj.title} className={styles.projectCard}>
              <div className={styles.iconWrap}>
                <ProjectIcon doodle={proj.doodle} />
              </div>

              <div className={styles.content}>
                <div className={styles.topRow}>
                  <h3 className={styles.title}>{proj.title}</h3>
                  <span className={styles.dateBadge}>{proj.date}</span>
                </div>

                <p className={styles.desc}>{proj.desc}</p>

                <div className={styles.footerRow}>
                  {isExternal ? (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkButton}
                      aria-label={`Visit ${proj.title} website`}
                    >
                      <span>{proj.linkLabel}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </a>
                  ) : (
                    <span className={styles.privateBadge}>
                      🔒 {proj.linkLabel}
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
