import styles from './WashiTape.module.css';

type TapePosition = 'topLeft' | 'topRight' | 'midLeft';

const positionClass: Record<TapePosition, string> = {
  topLeft:  styles.topLeft || '',
  topRight: styles.topRight || '',
  midLeft:  styles.midLeft || '',
};

interface WashiTapeProps {
  position: TapePosition;
}

/** A translucent washi-tape strip pinning the paper. */
export default function WashiTape({ position }: WashiTapeProps) {
  return <div className={`${styles.tape} ${positionClass[position]}`} aria-hidden="true" />;
}
