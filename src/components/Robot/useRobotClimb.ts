import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RobotState } from './Robot';

gsap.registerPlugin(ScrollTrigger);

export const SECTIONS = [
  'hero',
  'summary',
  'education',
  'experience',
  'skills',
  'projects',
  'courses',
  'contact',
] as const;

export type SectionId = (typeof SECTIONS)[number];

export interface PaperDentData {
  id: number;
  x: number;
  y: number;
  scale?: number;
}

interface RobotClimbResult {
  activeSection: SectionId;
  robotState: RobotState;
  showBubble: boolean;
  flipped: boolean;
  position: { x: number; y: number };
  isAirborne: boolean;
  isSquashing: boolean;
  dents: PaperDentData[];
  customMessage: string | null;
  triggerRobotTrick: () => void;
  jumpToPosition: (x: number, y: number, message?: string) => void;
}

/**
 * Advanced physical navigation hook for the robot mascot.
 * Drives 2D parabolic jumps and climbing across physical landmarks on the paper resume.
 */
export function useRobotClimb(
  paperRef: React.RefObject<HTMLElement | null>,
  reducedMotion: boolean,
): RobotClimbResult {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [robotState, setRobotState] = useState<RobotState>('idle');
  const [showBubble, setShowBubble] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [position, setPosition] = useState({ x: 120, y: 140 });
  const [isAirborne, setIsAirborne] = useState(false);
  const [isSquashing, setIsSquashing] = useState(false);
  const [dents, setDents] = useState<PaperDentData[]>([]);
  const [customMessage, setCustomMessage] = useState<string | null>(null);

  const trickIndexRef = useRef(0);
  const isMovingRef = useRef(false);
  const curPosRef = useRef({ x: 120, y: 140 });

  // Add a paper dent ripple at given coordinates
  const addDent = useCallback((x: number, y: number, scale = 1) => {
    const id = Date.now() + Math.random();
    setDents((prev) => [...prev.slice(-6), { id, x, y, scale }]);
    // Auto-remove dent after 2.5s
    setTimeout(() => {
      setDents((prev) => prev.filter((d) => d.id !== id));
    }, 2500);
  }, []);

  // Calculate landmark perch coordinates for each section inside #paper
  const getSectionTarget = useCallback((section: SectionId): { x: number; y: number; targetEl?: HTMLElement } => {
    const paper = paperRef.current;
    if (!paper) return { x: 80, y: 100 };

    const paperRect = paper.getBoundingClientRect();
    const secEl = document.getElementById(section);
    if (!secEl) return { x: 80, y: 100 };

    let landmark: Element | null = null;
    let offsetX = 40;
    let offsetY = -80;

    switch (section) {
      case 'hero':
        landmark = secEl.querySelector('[class*="sticker"]') || secEl.querySelector('h1');
        offsetX = 10;
        offsetY = -82;
        break;
      case 'summary':
        landmark = secEl.querySelector('[class*="heading"]');
        offsetX = 140;
        offsetY = -80;
        break;
      case 'education':
        // Perch on top edge of ticket stub
        landmark = secEl.querySelector('[class*="ticket"]');
        offsetX = 28;
        offsetY = -84;
        break;
      case 'experience':
        // Perch on bank timeline card
        landmark = secEl.querySelector('[class*="card"]');
        offsetX = 160;
        offsetY = -82;
        break;
      case 'skills':
        // Climb onto first skill card pin
        landmark = secEl.querySelector('[class*="card"]');
        offsetX = 36;
        offsetY = -84;
        break;
      case 'projects':
        // Perch on first project card
        landmark = secEl.querySelector('[class*="projectCard"]');
        offsetX = 110;
        offsetY = -84;
        break;
      case 'courses':
        // Perch on courses credential seal
        landmark = secEl.querySelector('[class*="card"]');
        offsetX = 45;
        offsetY = -84;
        break;
      case 'contact':
        // Perch on top of the air-mail envelope
        landmark = secEl.querySelector('[class*="envelope"]');
        offsetX = 100;
        offsetY = -84;
        break;
    }

    const targetNode = (landmark as HTMLElement) || secEl;
    const rect = targetNode.getBoundingClientRect();

    const maxX = Math.max(20, paperRect.width - 95);
    const x = Math.min(maxX, Math.max(20, rect.left - paperRect.left + offsetX));
    const y = Math.max(20, rect.top - paperRect.top + offsetY);

    return { x, y, targetEl: targetNode };
  }, [paperRef]);

  // Execute a parabolic jump to (targetX, targetY)
  const jumpTo = useCallback(
    (
      targetX: number,
      targetY: number,
      targetEl?: HTMLElement,
      onLandedMessage?: string,
    ) => {
      if (isMovingRef.current) return;
      isMovingRef.current = true;
      setShowBubble(false);

      const start = { ...curPosRef.current };
      const dx = targetX - start.x;
      const dy = targetY - start.y;

      // Face direction of motion
      if (Math.abs(dx) > 10) {
        setFlipped(dx < 0);
      }

      if (reducedMotion) {
        // Skip animation for reduced motion preference
        curPosRef.current = { x: targetX, y: targetY };
        setPosition({ x: targetX, y: targetY });
        addDent(targetX + 36, targetY + 86);
        isMovingRef.current = false;
        setShowBubble(true);
        if (onLandedMessage) setCustomMessage(onLandedMessage);
        return;
      }

      // 1. Crouch / squash anticipation
      setIsSquashing(true);
      setRobotState('idle');

      setTimeout(() => {
        setIsSquashing(false);
        setIsAirborne(true);

        const isClimbing = dy < -30;
        setRobotState(isClimbing ? 'climbing' : 'jumping');

        // Distance-based duration
        const distance = Math.hypot(dx, dy);
        const duration = Math.min(1.3, Math.max(0.65, distance / 700));

        // Parabolic arc height
        const arcHeight = Math.max(50, Math.min(150, Math.abs(dx) * 0.45 + Math.abs(dy) * 0.25));
        const peakY = Math.min(start.y, targetY) - arcHeight;

        const proxy = { t: 0 };
        gsap.to(proxy, {
          t: 1,
          duration,
          ease: 'power1.inOut',
          onUpdate: () => {
            const t = proxy.t;
            // Linear horizontal progress
            const currentX = start.x + dx * t;
            // Parabolic vertical trajectory (quadratic bezier)
            const currentY =
              (1 - t) * (1 - t) * start.y +
              2 * (1 - t) * t * peakY +
              t * t * targetY;

            curPosRef.current = { x: currentX, y: currentY };
            setPosition({ x: currentX, y: currentY });
          },
          onComplete: () => {
            // Impact moment
            setIsAirborne(false);
            setIsSquashing(true);
            setRobotState('stomp');

            // Paper dent ripple under feet
            addDent(targetX + 36, targetY + 86, 1.2);

            // Paper / card surface spring deflection
            if (targetEl) {
              targetEl.classList.remove('paperSurfaceRecoil');
              void targetEl.offsetWidth; // trigger reflow
              targetEl.classList.add('paperSurfaceRecoil');
            }

            // Settle from impact to wave / idle
            setTimeout(() => {
              setIsSquashing(false);
              setRobotState('waving');

              setTimeout(() => {
                setRobotState('idle');
                setShowBubble(true);
                if (onLandedMessage) {
                  setCustomMessage(onLandedMessage);
                } else {
                  setCustomMessage(null);
                }
                isMovingRef.current = false;
              }, 600);
            }, 350);
          },
        });
      }, 160);
    },
    [reducedMotion, addDent],
  );

  // Jump to specific custom coordinate (e.g. user clicked on paper)
  const jumpToPosition = useCallback(
    (x: number, y: number, message?: string) => {
      const paper = paperRef.current;
      const maxX = paper ? paper.clientWidth - 80 : 600;
      const clampedX = Math.max(10, Math.min(maxX, x - 36));
      const clampedY = Math.max(10, y - 86);
      jumpTo(clampedX, clampedY, undefined, message || '> exploring this spot! 🔍');
    },
    [paperRef, jumpTo],
  );

  // Interactive Tricks when user clicks on robot mascot
  const triggerRobotTrick = useCallback(() => {
    if (isMovingRef.current) return;
    const trick = trickIndexRef.current % 4;
    trickIndexRef.current++;

    setShowBubble(false);

    if (trick === 0) {
      // Trick 0: High Backflip 360°
      setRobotState('flip');
      setIsAirborne(true);
      setTimeout(() => {
        setIsAirborne(false);
        setIsSquashing(true);
        addDent(curPosRef.current.x + 36, curPosRef.current.y + 86, 1.4);
        setTimeout(() => {
          setIsSquashing(false);
          setRobotState('waving');
          setShowBubble(true);
          setCustomMessage('> whoa! 360° backflip executed cleanly! 🤸');
          setTimeout(() => setRobotState('idle'), 800);
        }, 300);
      }, 750);
    } else if (trick === 1) {
      // Trick 1: Heavy Paper Stomp Test
      setRobotState('stomp');
      addDent(curPosRef.current.x + 36, curPosRef.current.y + 86, 1.3);
      setTimeout(() => {
        addDent(curPosRef.current.x + 36, curPosRef.current.y + 86, 1.5);
        setCustomMessage('> testing paper tensile strength... 100% solid! 📄');
        setShowBubble(true);
        setTimeout(() => setRobotState('idle'), 600);
      }, 450);
    } else if (trick === 2) {
      // Trick 2: Cheerful Jump & Dance
      setRobotState('jumping');
      setIsAirborne(true);
      setTimeout(() => {
        setIsAirborne(false);
        setRobotState('waving');
        addDent(curPosRef.current.x + 36, curPosRef.current.y + 86, 1.1);
        setShowBubble(true);
        setCustomMessage('> backend systems ready to scale! ✨');
        setTimeout(() => setRobotState('idle'), 900);
      }, 450);
    } else {
      // Trick 3: Secret summon tip
      setRobotState('waving');
      setShowBubble(true);
      setCustomMessage('> pro tip: click anywhere on the paper to summon me! 🎯');
      setTimeout(() => setRobotState('idle'), 1200);
    }
  }, [addDent]);

  // Setup ScrollTriggers for each section on the resume
  useEffect(() => {
    const paper = paperRef.current;
    if (!paper) return;

    // Initial position on Hero
    const heroTarget = getSectionTarget('hero');
    curPosRef.current = { x: heroTarget.x, y: heroTarget.y };
    setPosition({ x: heroTarget.x, y: heroTarget.y });
    addDent(heroTarget.x + 36, heroTarget.y + 86, 1.2);
    const bubbleTimer = setTimeout(() => setShowBubble(true), 800);

    // ScrollTriggers for landmarks
    const triggers = SECTIONS.map((secId) => {
      const el = document.getElementById(secId);
      if (!el) return null;

      return ScrollTrigger.create({
        trigger: el,
        start: 'top 70%',
        end: 'bottom 30%',
        onEnter: () => {
          setActiveSection(secId);
          const t = getSectionTarget(secId);
          jumpTo(t.x, t.y, t.targetEl);
        },
        onEnterBack: () => {
          setActiveSection(secId);
          const t = getSectionTarget(secId);
          jumpTo(t.x, t.y, t.targetEl);
        },
      });
    }).filter(Boolean);

    // Click on paper to summon robot to clicked coordinates
    const handlePaperClick = (e: MouseEvent) => {
      // Ignore clicks on buttons, links, or inputs
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[class*="companionWrapper"]') ||
        target.closest('[class*="toggle"]') ||
        target.closest('nav')
      ) {
        return;
      }

      const rect = paper.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Provide playful contextual message based on what section was clicked
      let note = '> inspecting clicked coordinates! 📍';
      const clickedSection = target.closest('section, header, article');
      if (clickedSection?.id === 'skills') {
        note = '> analyzing skill tools... ⚙️';
      } else if (clickedSection?.id === 'projects') {
        note = '> inspecting project build specs! 🚀';
      } else if (clickedSection?.id === 'education') {
        note = '> verified cs degree ticket 🎓';
      } else if (clickedSection?.id === 'experience') {
        note = '> ealb banking security logs 🔐';
      } else if (clickedSection?.id === 'contact') {
        note = '> air-mail ready for dispatch! 📮';
      }

      jumpToPosition(clickX, clickY, note);
    };

    paper.addEventListener('click', handlePaperClick);

    return () => {
      triggers.forEach((t) => t?.kill());
      clearTimeout(bubbleTimer);
      paper.removeEventListener('click', handlePaperClick);
    };
  }, [paperRef, getSectionTarget, jumpTo, jumpToPosition, addDent]);

  return {
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
    jumpToPosition,
  };
}
