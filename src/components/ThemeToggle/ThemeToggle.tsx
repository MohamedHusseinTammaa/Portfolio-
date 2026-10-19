import { useEffect, useState, useCallback } from 'react';
import styles from './ThemeToggle.module.css';

/** A tiny lamp-switch toggle (fixed top-right). */
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const apply = useCallback((dark: boolean) => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
  }, []);

  // Sync on mount
  useEffect(() => { apply(isDark); }, [isDark, apply]);

  const toggle = () => setIsDark((d) => { apply(!d); return !d; });

  return (
    <button
      className={styles.toggle}
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className={styles.lamp} aria-hidden="true">{isDark ? '💡' : '🔦'}</span>
      <span className={styles.label}>{isDark ? 'light' : 'dark'}</span>
    </button>
  );
}
