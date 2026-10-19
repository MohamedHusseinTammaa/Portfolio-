import styles from './Doodles.module.css';

/**
 * Hand-drawn margin doodles: paperclip, coffee-ring stain,
 * tiny stars, and a curved arrow.
 */
export default function Doodles() {
  return (
    <>
      {/* Paperclip — top right corner */}
      <svg className={`${styles.doodle} ${styles.paperclip}`} width="28" height="68" viewBox="0 0 28 68" aria-hidden="true">
        <path
          d="M14 4 C6 4 4 10 4 16 L4 52 C4 60 8 64 14 64 C20 64 24 60 24 52 L24 18 C24 12 21 10 18 10 C15 10 12 12 12 18 L12 50 C12 53 14 55 16 55 C18 55 20 53 20 50 L20 20"
          stroke="var(--ink)" strokeWidth="2.5" fill="none" strokeLinecap="round"
        />
      </svg>

      {/* Coffee ring stain — bottom left */}
      <svg className={`${styles.doodle} ${styles.coffee}`} width="70" height="70" viewBox="0 0 70 70" aria-hidden="true">
        <ellipse cx="35" cy="35" rx="30" ry="29" fill="none" stroke="rgba(180,130,80,0.35)" strokeWidth="5" />
        <ellipse cx="35" cy="35" rx="25" ry="24" fill="none" stroke="rgba(180,130,80,0.15)" strokeWidth="2" />
      </svg>

      {/* Stars */}
      <svg className={`${styles.doodle} ${styles.stars}`} width="40" height="100" viewBox="0 0 40 100" aria-hidden="true">
        <path d="M20 8 L22 15 L29 15 L24 20 L26 27 L20 22 L14 27 L16 20 L11 15 L18 15 Z" fill="none" stroke="var(--mustard)" strokeWidth="1.5" />
        <path d="M10 50 L11.5 55 L16 55 L12.5 58 L14 63 L10 60 L6 63 L7.5 58 L4 55 L8.5 55 Z" fill="none" stroke="var(--tomato)" strokeWidth="1.5" />
        <path d="M25 78 L26 82 L30 82 L27 84.5 L28 88 L25 86 L22 88 L23 84.5 L20 82 L24 82 Z" fill="var(--mustard)" stroke="var(--mustard)" strokeWidth="0.5" opacity="0.5" />
      </svg>

      {/* Curved arrow */}
      <svg className={`${styles.doodle} ${styles.arrow}`} width="50" height="40" viewBox="0 0 50 40" aria-hidden="true">
        <path d="M5 20 Q20 5 42 20" stroke="var(--tomato)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M38 14 L42 20 L36 22" stroke="var(--tomato)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
}
