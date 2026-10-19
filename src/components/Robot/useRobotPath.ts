import { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RobotState } from './Robot';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  'hero', 'summary', 'education', 'experience',
  'skills', 'projects', 'courses', 'contact',
] as const;

export type SectionId = (typeof SECTIONS)[number];

interface RobotPathResult {
  /** Currently active (closest) section id */
  activeSection: SectionId;
  /** Current animation state */
  robotState: RobotState;
  /** Whether the speech bubble should be visible */
  showBubble: boolean;
  /** Whether the robot is flipped (facing left) */
  flipped: boolean;
  /** Force a new state (used for click-jump) */
  setRobotState: (s: RobotState) => void;
  setShowBubble: (v: boolean) => void;
}

/**
 * Drives the robot along a scroll-linked path.
 *
 * How it works:
 * 1. One ScrollTrigger per section fires `onEnter` / `onEnterBack`.
 * 2. When the active section changes, GSAP tweens the robot wrapper's
 *    `x` position to a pre-calculated target on that section's side.
 * 3. After arrival the state machine goes walking → waving → idle,
 *    then the speech bubble appears.
 *
 * On mobile the robot is pinned to a bottom corner and hops instead
 * of walking across.
 */
export function useRobotPath(
  wrapRef: React.RefObject<HTMLDivElement>,
  reducedMotion: boolean,
): RobotPathResult {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [robotState, setRobotState] = useState<RobotState>('idle');
  const [showBubble, setShowBubble] = useState(false);
  const [flipped, setFlipped] = useState(false);

  // Track current section to debounce scroll changes
  const currentRef = useRef<SectionId>('hero');
  const busyRef = useRef(false);

  /** Target x-position for each section (viewport-relative). */
  const getTargetX = useCallback((section: SectionId): number => {
    const vw = window.innerWidth;
    const isMobile = vw <= 600;
    // On desktop the robot walks near the paper's edge.
    // On mobile it stays in the bottom-left area.
    const pad = isMobile ? 16 : Math.max(60, (vw - 780) / 2 - 20);
    const right = isMobile ? vw - 80 : Math.min(vw - 80, (vw + 780) / 2 + 20);

    const targets: Record<SectionId, number> = {
      hero:       pad,
      summary:    right,
      education:  pad + 30,
      experience: right - 30,
      skills:     pad + 60,
      projects:   right,
      courses:    pad,
      contact:    right - 60,
    };
    return targets[section];
  }, []);

  /** Animate the robot to a new section. */
  const moveRobot = useCallback(
    (section: SectionId) => {
      if (section === currentRef.current || busyRef.current) return;
      currentRef.current = section;
      busyRef.current = true;

      const wrap = wrapRef.current;
      if (!wrap) { busyRef.current = false; return; }

      // Hide bubble during travel
      setShowBubble(false);
      setActiveSection(section);

      const targetX = getTargetX(section);

      // Determine direction and flip
      const currentX = gsap.getProperty(wrap, 'x') as number;
      const goRight = targetX >= currentX;
      setFlipped(!goRight);

      if (reducedMotion) {
        // Skip animation — instant move
        gsap.set(wrap, { x: targetX });
        setRobotState('idle');
        setShowBubble(true);
        busyRef.current = false;
        return;
      }

      setRobotState('walking');

      const dist = Math.abs(targetX - currentX);
      const duration = Math.min(1.4, Math.max(0.4, dist / 500));

      gsap.to(wrap, {
        x: targetX,
        duration,
        ease: 'power2.inOut',
        onComplete: () => {
          // Walking → waving → idle + bubble
          setRobotState('waving');
          setTimeout(() => {
            setRobotState('idle');
            setShowBubble(true);
            busyRef.current = false;

            // Yawn near the footer after a delay
            if (section === 'contact') {
              setTimeout(() => {
                // Only yawn if still on contact
                if (currentRef.current === 'contact') {
                  setRobotState('yawning');
                  setTimeout(() => setRobotState('idle'), 2000);
                }
              }, 5000);
            }
          }, 1100);
        },
      });
    },
    [wrapRef, getTargetX, reducedMotion],
  );

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Set initial position
    gsap.set(wrap, { x: getTargetX('hero') });

    // Create one ScrollTrigger per section
    const triggers = SECTIONS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => moveRobot(id),
        onEnterBack: () => moveRobot(id),
      });
    }).filter(Boolean);

    // Initial bubble after a beat
    const initTimer = setTimeout(() => setShowBubble(true), 900);

    return () => {
      triggers.forEach((t) => t?.kill());
      clearTimeout(initTimer);
    };
  }, [wrapRef, getTargetX, moveRobot]);

  return { activeSection, robotState, showBubble, flipped, setRobotState, setShowBubble };
}
