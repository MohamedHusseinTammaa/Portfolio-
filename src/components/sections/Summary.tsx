import { resume } from '../../data/resume';
import { useInView } from '../../hooks/useInView';
import styles from './Summary.module.css';

/** Short about-me paragraph with hand-drawn highlighter effect on key phrases. */
export default function Summary() {
  const [ref, visible] = useInView<HTMLElement>();
  const { summary, highlights } = resume;

  // Build HTML with highlighted spans
  let html = summary;
  highlights.forEach(({ text, color }) => {
    const cls = color === 'yellow' ? styles.hlYellow : styles.hlMint;
    html = html.replace(text, `<mark class="${cls}">${text}</mark>`);
  });

  return (
    <section
      id="summary"
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ''}`}
      aria-labelledby="summary-heading"
    >
      <h2 className={styles.heading} id="summary-heading">About me</h2>
      {/* The summary is static data, safe to set as HTML */}
      <p className={styles.body} dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}
