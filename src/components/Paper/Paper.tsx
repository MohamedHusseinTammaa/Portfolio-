import { forwardRef, type ReactNode } from 'react';
import WashiTape from './WashiTape';
import Doodles from './Doodles';
import styles from './Paper.module.css';

interface PaperProps {
  children: ReactNode;
}

/**
 * The paper sheet that sits on the desk surface.
 * Includes washi tape strips, faint ruled lines, and margin doodles.
 */
const Paper = forwardRef<HTMLElement, PaperProps>(({ children }, ref) => {
  return (
    <article
      ref={ref}
      id="paper"
      className={styles.paper}
      aria-label="Resume of Mohamed Hussein Tammaa"
    >
      {/* Decorative tape holding the paper down */}
      <WashiTape position="topLeft" />
      <WashiTape position="topRight" />
      <WashiTape position="midLeft" />

      {/* Margin doodles */}
      <Doodles />

      {children}
    </article>
  );
});

Paper.displayName = 'Paper';
export default Paper;
