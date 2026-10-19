import Robot from './Robot';
import SpeechBubble from '../SpeechBubble/SpeechBubble';
import { useRobotClimb, type SectionId } from './useRobotClimb';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useTypewriter } from '../../hooks/useTypewriter';
import styles from './RobotCompanion.module.css';

const DEFAULT_SECTION_MESSAGES: Record<SectionId, string> = {
  hero: "> hi! i'm your guide-bot 🤖",
  summary: '> inspecting backend systems...',
  education: '> b.sc. computer science @ elshorouk',
  experience: '> banking security & database integrity 🔐',
  skills: '> node · c# · sql · databases loaded ⚙️',
  projects: '> amplicv · fixpay · huffman tool 🚀',
  courses: '> depi backend .net certified 📜',
  contact: '> ready for dispatch! lets connect 📮',
};

interface RobotCompanionProps {
  paperRef: React.RefObject<HTMLElement | null>;
}

/**
 * Physical robot mascot companion that lives directly on the paper sheet.
 * Climbs and leaps between section cards, casts dynamic ground shadows,
 * leaves tactile paper indentations, and performs acrobatics when clicked.
 */
export default function RobotCompanion({ paperRef }: RobotCompanionProps) {
  const reducedMotion = useReducedMotion();

  const {
    activeSection,
    robotState,
    showBubble,
    flipped,
    position,
    isAirborne,
    isSquashing,
    dents,
    customMessage,
    triggerRobotTrick,
  } = useRobotClimb(paperRef, reducedMotion);

  const activeMessage =
    customMessage || DEFAULT_SECTION_MESSAGES[activeSection] || '> hello!';

  const { displayedText, isTyping } = useTypewriter(
    showBubble ? activeMessage : '',
    {
      speed: 28,
      delay: 120,
      enabled: !reducedMotion,
    },
  );

  return (
    <>
      {/* ── Paper Crease & Indentation Impressions on Paper Surface ── */}
      <div className={styles.paperDentContainer} aria-hidden="true">
        {dents.map((dent) => (
          <div
            key={dent.id}
            className={styles.dentRipple}
            style={{
              left: dent.x,
              top: dent.y,
              transform: `scale(${dent.scale || 1})`,
            }}
          >
            <div className={styles.dentRing} />
            <div className={styles.treadL} />
            <div className={styles.treadR} />
          </div>
        ))}
      </div>

      {/* ── Robot Character & Ground Shadow ── */}
      <div
        className={styles.companionWrapper}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        {/* Dynamic Shadow on the paper directly beneath feet */}
        <div
          className={`${styles.groundShadow} ${
            isAirborne ? styles.shadowAir : ''
          } ${isSquashing ? styles.shadowSquash : ''}`}
          aria-hidden="true"
        />

        {/* Robot Body with squash/stretch & click reactions */}
        <div
          className={`${styles.robotHitbox} ${flipped ? styles.flipped : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            triggerRobotTrick();
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              triggerRobotTrick();
            }
          }}
          aria-label="Interactive guide robot, click to perform backflips and tricks"
          title="Click me to do backflips or stomp the paper!"
        >
          <div
            className={`${styles.robotBody} ${
              isAirborne ? styles.bodyAirborne : ''
            } ${isSquashing ? styles.bodySquash : ''}`}
          >
            <Robot state={robotState} />
          </div>

          <SpeechBubble
            text={displayedText}
            visible={showBubble && displayedText.length > 0}
            isTyping={isTyping}
            flipped={flipped}
          />
        </div>
      </div>
    </>
  );
}
