import styles from './SpeechBubble.module.css';

interface SpeechBubbleProps {
  text: string;
  visible: boolean;
  isTyping: boolean;
  /** When the robot wrapper is flipped (scaleX -1) we need to mirror the bubble back. */
  flipped: boolean;
}

/**
 * Terminal-style speech bubble above the robot.
 * Uses JetBrains Mono and a blinking cursor while typing.
 */
export default function SpeechBubble({ text, visible, isTyping, flipped }: SpeechBubbleProps) {
  return (
    <div
      className={`${styles.bubble} ${visible ? styles.visible : ''}`}
      style={flipped ? { transform: 'scaleX(-1)' } : undefined}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className={styles.text}>{text}</span>
      {isTyping && <span className={styles.cursor} aria-hidden="true" />}
    </div>
  );
}
