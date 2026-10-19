import Nav from './components/Nav/Nav';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import Paper from './components/Paper/Paper';
import Hero from './components/sections/Hero';
import Summary from './components/sections/Summary';
import Education from './components/sections/Education';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Courses from './components/sections/Courses';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.appContainer}>
      {/* Light / Dark Mode toggle lamp switch */}
      <ThemeToggle />

      {/* Sticky paper tabs navigation */}
      <Nav />

      {/* Main desk workspace */}
      <main className={styles.desk}>
        {/* The pinned paper sheet */}
        <Paper>
          <Hero />
          <Summary />
          <Education />
          <Experience />
          <Skills />
          <Projects />
          <Courses />
          <Contact />
          <Footer />
        </Paper>
      </main>
    </div>
  );
}
