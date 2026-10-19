import { resume } from '../../data/resume';
import { useInView } from '../../hooks/useInView';
import styles from './Education.module.css';

/** Ticket / certificate style education block. */
export default function Education() {
  const [ref, visible] = useInView<HTMLElement>();
  const { degree, school, location, date } = resume.education;

  return (
    <section
      id="education"
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ''}`}
      aria-labelledby="edu-heading"
    >
      <h2 className={styles.heading} id="edu-heading">Education</h2>

      <div className={styles.ticket}>
        <div className={styles.stub} aria-hidden="true">B.Sc.</div>
        <div className={styles.body}>
          <p className={styles.degree}>{degree}</p>
          <p className={styles.school}>{school}</p>
          <p className={styles.meta}>{location}</p>
          <p className={styles.date}>{date}</p>
        </div>
      </div>
    </section>
  );
}
