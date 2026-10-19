import { forwardRef } from 'react';
import styles from './Robot.module.css';

export type RobotState =
  | 'idle'
  | 'walking'
  | 'climbing'
  | 'waving'
  | 'jumping'
  | 'flip'
  | 'stomp'
  | 'yawning';

interface RobotProps {
  state: RobotState;
}

/**
 * Inline SVG robot mascot with independent animated limbs, antenna, screen, and eyes.
 */
const Robot = forwardRef<SVGSVGElement, RobotProps>(({ state }, ref) => {
  const cls = [
    styles.robot,
    state === 'walking'  ? styles.walking  : '',
    state === 'climbing' ? styles.climbing : '',
    state === 'idle'     ? styles.idle     : '',
    state === 'waving'   ? styles.waving   : '',
    state === 'jumping'  ? styles.jumping  : '',
    state === 'flip'     ? styles.flip     : '',
    state === 'stomp'    ? styles.stomp    : '',
    state === 'yawning'  ? styles.yawning  : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <svg
      ref={ref}
      className={cls}
      viewBox="0 0 72 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A small illustrated robot mascot"
    >
      {/* ── Antenna ── */}
      <g id="antenna-group">
        <line x1="36" y1="10" x2="36" y2="22" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
        <g className={styles.antennaTip}>
          <circle cx="36" cy="8" r="5" fill="var(--mustard)" stroke="var(--ink)" strokeWidth="2" />
          <circle cx="36" cy="8" r="2.5" fill="var(--tomato)" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.2s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>

      {/* ── Body group (bobs during walk/climb) ── */}
      <g className={styles.bodyGroup}>
        {/* Left arm */}
        <g className={styles.armL}>
          <rect x="8" y="34" width="9" height="22" rx="4" fill="var(--sky)" stroke="var(--ink)" strokeWidth="2" />
          <circle cx="12.5" cy="57" r="4.5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
        </g>

        {/* Right arm + laptop */}
        <g className={styles.armR}>
          <rect x="55" y="34" width="9" height="22" rx="4" fill="var(--sky)" stroke="var(--ink)" strokeWidth="2" />
          <rect x="52" y="53" width="14" height="9" rx="2" fill="var(--ink)" />
          <rect x="53" y="54" width="12" height="7" rx="1" fill="var(--mint)" />
          <line x1="54" y1="56" x2="61" y2="56" stroke="var(--ink)" strokeWidth="0.8" opacity="0.5" />
          <line x1="54" y1="58" x2="59" y2="58" stroke="var(--ink)" strokeWidth="0.8" opacity="0.5" />
        </g>

        {/* Torso */}
        <rect x="17" y="22" width="38" height="42" rx="8" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />

        {/* Face screen */}
        <rect x="20" y="26" width="32" height="24" rx="5" fill="var(--ink)" />
        <rect x="21" y="27" width="30" height="22" rx="4" fill="var(--mint)" opacity="0.15" />

        {/* Eyes */}
        <g className={styles.eyeL}>
          <circle cx="29" cy="38" r="5" fill="var(--paper)" />
          <circle cx="30" cy="37" r="2.5" fill="var(--ink)" />
          <circle cx="31" cy="36" r="1" fill="white" opacity="0.8" />
        </g>
        <g className={styles.eyeR}>
          <circle cx="43" cy="38" r="5" fill="var(--paper)" />
          <circle cx="44" cy="37" r="2.5" fill="var(--ink)" />
          <circle cx="45" cy="36" r="1" fill="white" opacity="0.8" />
        </g>

        {/* Mouth */}
        <path d="M28 48 Q36 54 44 48" stroke="var(--mint)" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Chest buttons */}
        <circle cx="28" cy="56" r="3" fill="var(--tomato)" stroke="var(--ink)" strokeWidth="1.5" />
        <circle cx="36" cy="56" r="3" fill="var(--mustard)" stroke="var(--ink)" strokeWidth="1.5" />
        <circle cx="44" cy="56" r="3" fill="var(--mint)" stroke="var(--ink)" strokeWidth="1.5" />

        {/* Belt */}
        <rect x="17" y="59" width="38" height="5" rx="2" fill="var(--sky)" stroke="var(--ink)" strokeWidth="1.5" />
      </g>

      {/* ── Legs (outside body-group for independent stepping & climbing) ── */}
      <g className={styles.legL}>
        <rect x="22" y="64" width="12" height="24" rx="5" fill="var(--sky)" stroke="var(--ink)" strokeWidth="2" />
        <ellipse cx="28" cy="88" rx="8" ry="5" fill="var(--ink)" />
      </g>
      <g className={styles.legR}>
        <rect x="38" y="64" width="12" height="24" rx="5" fill="var(--sky)" stroke="var(--ink)" strokeWidth="2" />
        <ellipse cx="44" cy="88" rx="8" ry="5" fill="var(--ink)" />
      </g>
    </svg>
  );
});

Robot.displayName = 'Robot';
export default Robot;
