import { resume } from '../../data/resume';
import { useInView } from '../../hooks/useInView';
import styles from './Experience.module.css';

/**
 * Experience section with dotted timeline, stamp dates, and bank doodle.
 */
export default function Experience() {
  const [ref, visible] = useInView<HTMLElement>();
  const { experience } = resume;

  return (
    <section
      id="experience"
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ''}`}
      aria-labelledby="exp-heading"
    >
      <h2 className={styles.heading} id="exp-heading">Experience</h2>

      {/* Decorative margin doodle */}
      <svg className={styles.bankDoodle} width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
        <rect x="3" y="18" width="30" height="12" rx="1" stroke="var(--ink)" strokeWidth="1.8" fill="none" />
        <rect x="7" y="10" width="4" height="8" stroke="var(--ink)" strokeWidth="1.5" fill="none" />
        <rect x="16" y="10" width="4" height="8" stroke="var(--ink)" strokeWidth="1.5" fill="none" />
        <rect x="25" y="10" width="4" height="8" stroke="var(--ink)" strokeWidth="1.5" fill="none" />
        <path d="M1 30 H35" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 3 L33 10 H3 Z" stroke="var(--ink)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      </svg>

      <div className={styles.timeline}>
        {experience.map((exp, idx) => {
          const isPresent = exp.date.includes('Present');
          return (
            <div key={idx} className={styles.item}>
              <div
                className={`${styles.dot} ${isPresent ? styles.activeDot : ''}`}
                aria-hidden="true"
              />
              <div className={styles.entry}>
                <div className={styles.header}>
                  <div>
                    <h3 className={styles.role}>{exp.role}</h3>
                    <p className={styles.company}>{exp.company}</p>
                    <p className={styles.location}>{exp.location}</p>
                  </div>
                  <span
                    className={`${styles.dateBadge} ${
                      isPresent ? styles.activeDateBadge : ''
                    }`}
                  >
                    {exp.date}
                  </span>
                </div>
                <ul className={styles.list} aria-label="Responsibilities">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
