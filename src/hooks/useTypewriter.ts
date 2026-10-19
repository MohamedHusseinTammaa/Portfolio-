import { useState, useEffect } from 'react';

interface TypewriterOptions {
  speed?: number; // ms per char
  delay?: number; // ms before typing starts
  enabled?: boolean;
}

/**
 * Custom hook to produce a terminal-style typewriter effect.
 *
 * Types text character by character with configurable speed and initial delay.
 */
export function useTypewriter(
  fullText: string,
  { speed = 35, delay = 150, enabled = true }: TypewriterOptions = {},
): { displayedText: string; isTyping: boolean } {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(fullText);
      setIsTyping(false);
      return;
    }

    setDisplayedText('');
    setIsTyping(true);

    let currentIndex = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const delayTimeout = setTimeout(() => {
      timer = setInterval(() => {
        currentIndex++;
        setDisplayedText(fullText.slice(0, currentIndex));

        if (currentIndex >= fullText.length) {
          if (timer) clearInterval(timer);
          setIsTyping(false);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(delayTimeout);
      if (timer) clearInterval(timer);
    };
  }, [fullText, speed, delay, enabled]);

  return { displayedText, isTyping };
}
