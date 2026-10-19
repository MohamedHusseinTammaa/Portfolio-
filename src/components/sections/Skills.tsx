import { resume } from '../../data/resume';
import { useInView } from '../../hooks/useInView';
import styles from './Skills.module.css';

/**
 * Skills section displaying technical and soft skills organized as
 * hand-pinned category cards with tactile tag badges.
 */
export default function Skills() {
  const [ref, visible] = useInView<HTMLElement>();
  const { skills } = resume;

  return (
    <section
      id="skills"
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ''}`}
      aria-labelledby="skills-heading"
    >
      <div className={styles.header}>
        <h2 className={styles.heading} id="skills-heading">Skills & Toolbelt</h2>
        <span className={styles.subDoodle} aria-hidden="true">⚙️ backend craft</span>
      </div>

      <div className={styles.grid}>
        {skills.map((group, idx) => (
          <div
            key={group.category}
            className={styles.card}
            style={{ '--card-idx': idx } as React.CSSProperties}
          >
            <div className={styles.pin} aria-hidden="true" />
            <h3 className={styles.categoryTitle}>{group.category}</h3>
            <ul className={styles.tags} aria-label={`${group.category} skills`}>
              {group.items.map((item) => (
                <li key={item} className={styles.tag}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
