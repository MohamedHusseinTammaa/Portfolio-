import { useEffect, useState } from 'react';
import styles from './Nav.module.css';

const TABS = [
  { id: 'hero',       label: 'top'     },
  { id: 'summary',    label: 'about'   },
  { id: 'education',  label: 'edu'     },
  { id: 'experience', label: 'exp'     },
  { id: 'skills',     label: 'skills'  },
  { id: 'projects',   label: 'work'    },
  { id: 'courses',    label: 'courses' },
  { id: 'contact',    label: 'say hi'  },
] as const;

/** Sticky nav bar styled as paper tabs. */
export default function Nav() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const handler = () => {
      const scrollMid = window.scrollY + window.innerHeight * 0.4;
      let current = 'hero';
      for (const { id } of TABS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= scrollMid) {
          current = id;
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={styles.nav} aria-label="Page sections">
      {TABS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`${styles.tab} ${active === id ? styles.active : ''}`}
          aria-label={`${label} section`}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
