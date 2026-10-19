import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Typewriter effect hook.
 * Returns [displayedText, isTyping, start].
 *
 * Call `start(text)` to begin typing a string character-by-character.
 * If `reduced` is true the full text appears instantly (a11y).
 */
export function useTypewriter(
  reduced: boolean,
  speed = 38,
): [string, boolean, (text: string) => void] {
  const [displayed, setDisplayed] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Stable refs so the timer callback never goes stale
  const queueRef = useRef('');
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const clear = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = undefined;
  }, []);

  const start = useCallback(
    (text: string) => {
      clear();

      if (reduced) {
        setDisplayed(text);
        setIsTyping(false);
        return;
      }

      queueRef.current = text;
      indexRef.current = 0;
      setDisplayed('');
      setIsTyping(true);

      function tick() {
        const i = indexRef.current;
        const t = queueRef.current;
        if (i >= t.length) {
          setIsTyping(false);
          return;
        }
        setDisplayed(t.slice(0, i + 1));
        indexRef.current = i + 1;
        // Add slight randomness so it feels hand-typed
        timerRef.current = setTimeout(tick, speed + Math.random() * 20);
      }
      tick();
    },
    [clear, reduced, speed],
  );

  // Cleanup on unmount
  useEffect(() => clear, [clear]);

  return [displayed, isTyping, start];
}
