import { resume } from '../../data/resume';
import { useInView } from '../../hooks/useInView';
import styles from './Courses.module.css';

/**
 * Courses and training section with certificate / seal visual badge.
 */
export default function Courses() {
  const [ref, visible] = useInView<HTMLElement>();
  const { courses } = resume;

  return (
    <section
      id="courses"
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ''}`}
      aria-labelledby="courses-heading"
    >
      <div className={styles.header}>
        <h2 className={styles.heading} id="courses-heading">Certificates & Training</h2>
        <span className={styles.subNote} aria-hidden="true">📜 continuous learning</span>
      </div>

      <div className={styles.list}>
        {courses.map((course) => (
          <div key={course.name} className={styles.card}>
            <div className={styles.seal} aria-hidden="true">
              <svg viewBox="0 0 40 40" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="20" cy="20" r="16" strokeDasharray="3 3" />
                <circle cx="20" cy="20" r="11" fill="var(--paper)" />
                <path d="M16 20l3 3 5-6" stroke="var(--tomato)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className={styles.body}>
              <div className={styles.topRow}>
                <h3 className={styles.name}>{course.name}</h3>
                <span className={styles.date}>{course.date}</span>
              </div>
              <p className={styles.org}>{course.org}</p>
              <p className={styles.desc}>{course.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
