import type { ReactNode } from 'react';
import styles from './StickyNote.module.css';

interface StickyNoteProps {
  /** CSS background override, e.g. "var(--mint)" */
  color?: string;
  /** Slight rotation in degrees */
  rotate?: number;
  /** Whether to invert text colour for dark backgrounds */
  invertText?: boolean;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

/**
 * Reusable sticky-note card with shadow, curl effect, and a subtle
 * adhesive strip at the top.
 */
export default function StickyNote({
  color = 'var(--mustard)',
  rotate = 0,
  invertText = false,
  children,
  className = '',
  ariaLabel,
}: StickyNoteProps) {
  return (
    <div
      className={`${styles.note} ${invertText ? styles.invert : ''} ${className}`}
      style={{ background: color, transform: `rotate(${rotate}deg)` }}
      role="listitem"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}
